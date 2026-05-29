import base64
import hashlib
import json
import os
import random
import time
from datetime import datetime, timezone

import boto3


dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses")
s3 = boto3.client("s3")

TABLE_NAME = os.environ["RESUME_ACCESS_TABLE"]
FROM_EMAIL = os.environ["FROM_EMAIL"]
RESUME_BUCKET = os.environ.get("RESUME_BUCKET")
RESUME_KEY = os.environ.get("RESUME_KEY")
PUBLIC_RESUME_URL = os.environ.get("PUBLIC_RESUME_URL", "/your-resume.pdf")
CODE_TTL_SECONDS = int(os.environ.get("CODE_TTL_SECONDS", "900"))
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://techlock77.github.io")


table = dynamodb.Table(TABLE_NAME)


def response(status_code, payload):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Content-Type": "application/json",
        },
        "body": json.dumps(payload),
    }


def hash_code(email, code):
    secret = os.environ["CODE_HASH_SECRET"]
    value = f"{email.lower()}:{code}:{secret}".encode("utf-8")
    return hashlib.sha256(value).hexdigest()


def parse_body(event):
    body = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
      body = base64.b64decode(body).decode("utf-8")
    return json.loads(body)


def log_event(email, event_type, payload):
    now = datetime.now(timezone.utc).isoformat()
    table.put_item(
        Item={
            "pk": f"EMAIL#{email.lower()}",
            "sk": f"EVENT#{now}",
            "email": email.lower(),
            "eventType": event_type,
            "timestamp": now,
            "page": payload.get("page", ""),
            "userAgent": payload.get("userAgent", ""),
            "ttl": int(time.time()) + 60 * 60 * 24 * 180,
        }
    )


def request_code(payload):
    email = (payload.get("email") or "").strip().lower()
    if "@" not in email or "." not in email:
        return response(400, {"ok": False, "error": "Enter a valid email address."})

    code = str(random.randint(100000, 999999))
    expires_at = int(time.time()) + CODE_TTL_SECONDS
    table.put_item(
        Item={
            "pk": f"CODE#{email}",
            "sk": "ACTIVE",
            "email": email,
            "codeHash": hash_code(email, code),
            "expiresAt": expires_at,
            "ttl": expires_at + 3600,
        }
    )
    log_event(email, "code_requested", payload)

    ses.send_email(
        Source=FROM_EMAIL,
        Destination={"ToAddresses": [email]},
        Message={
            "Subject": {"Data": "Your Nitesh M resume access code"},
            "Body": {
                "Text": {
                    "Data": (
                        f"Your verification code is {code}.\n\n"
                        f"This code expires in {CODE_TTL_SECONDS // 60} minutes.\n\n"
                        "If you did not request this, you can ignore this email."
                    )
                }
            },
        },
    )
    return response(200, {"ok": True})


def build_resume_url():
    if RESUME_BUCKET and RESUME_KEY:
        return s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": RESUME_BUCKET, "Key": RESUME_KEY},
            ExpiresIn=600,
        )
    return PUBLIC_RESUME_URL


def verify_code(payload):
    email = (payload.get("email") or "").strip().lower()
    code = (payload.get("code") or "").strip()
    if not email or not code:
        return response(400, {"ok": False, "error": "Email and code are required."})

    result = table.get_item(Key={"pk": f"CODE#{email}", "sk": "ACTIVE"})
    item = result.get("Item")
    if not item or int(item.get("expiresAt", 0)) < int(time.time()):
        log_event(email, "code_expired_or_missing", payload)
        return response(400, {"ok": False, "error": "Code expired. Request a new code."})

    if item.get("codeHash") != hash_code(email, code):
        log_event(email, "code_failed", payload)
        return response(403, {"ok": False, "error": "Invalid verification code."})

    log_event(email, "resume_opened", payload)
    table.delete_item(Key={"pk": f"CODE#{email}", "sk": "ACTIVE"})
    return response(200, {"ok": True, "resumeUrl": build_resume_url()})


def lambda_handler(event, context):
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return response(200, {"ok": True})

    try:
        payload = parse_body(event)
        action = payload.get("action")
        if action == "requestCode":
            return request_code(payload)
        if action == "verifyCode":
            return verify_code(payload)
        return response(400, {"ok": False, "error": "Unknown action."})
    except Exception:
        return response(500, {"ok": False, "error": "Resume access service error."})
