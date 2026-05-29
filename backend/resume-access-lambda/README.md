# Resume Access Backend

This backend makes the GitHub Pages resume gate real:

- Sends a 6-digit code to the requester email through Amazon SES.
- Logs code requests, failed verifications, and successful resume opens in DynamoDB.
- Returns a private S3 pre-signed resume URL after verification when `RESUME_BUCKET` and `RESUME_KEY` are configured.

## Why This Is Needed

GitHub Pages is static hosting. It cannot securely send email, generate private OTPs, store central logs, or protect a committed PDF. Those actions need a backend.

## AWS Resources

Create:

- Lambda function using Python 3.12
- HTTP API Gateway route: `POST /resume-access`
- DynamoDB table with:
  - Partition key: `pk` string
  - Sort key: `sk` string
  - TTL attribute: `ttl`
- SES verified sender email in `FROM_EMAIL`
- Optional private S3 bucket/object for the resume PDF

## Lambda Environment Variables

Required:

- `RESUME_ACCESS_TABLE`
- `FROM_EMAIL`
- `CODE_HASH_SECRET`

Recommended:

- `ALLOWED_ORIGIN=https://techlock77.github.io`
- `CODE_TTL_SECONDS=900`
- `RESUME_BUCKET=<private-bucket-name>`
- `RESUME_KEY=niteshm_resume.pdf`

Fallback:

- `PUBLIC_RESUME_URL=/your-resume.pdf`

For true resume protection, use `RESUME_BUCKET` and `RESUME_KEY`, then remove the public PDF from GitHub Pages.

## Lambda IAM Permissions

The Lambda execution role needs:

- `dynamodb:PutItem`
- `dynamodb:GetItem`
- `dynamodb:DeleteItem`
- `ses:SendEmail`
- `s3:GetObject` if using private S3 resume links

## Website Configuration

After deploying API Gateway, update:

`scripts/client-tiles.js`

Set:

```js
const RESUME_ACCESS_API_URL = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/resume-access";
```

Then commit and push the site.
