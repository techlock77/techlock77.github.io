const projects = [
  {
    title: "Hyatt: Real-Time Compliance and Guest Data Lineage",
    client: "Hyatt",
    projectName: "Real-Time Compliance and Guest Data Lineage",
    category: "data-platform",
    focus: ["data-platform", "modernization"],
    summary: "Built near real-time lineage and compliance pipelines across Kafka, S3, Snowflake, Tableau, and Kubernetes.",
    outcome: "Reduced SLA breaches by 45%, cut ETL latency by 80%, enabled suspicious transaction tracing across 7 global regions, and maintained 99.99% uptime.",
    impacts: [
      "Cut ETL latency by 80%, helping compliance teams move from delayed checks to near real-time operational visibility.",
      "Reduced SLA breaches by 45% across compliance workflows, turning a fragile reporting path into a dependable executive-facing system.",
      "Maintained 99.99% uptime while enabling suspicious transaction tracing across 7 global regions."
    ],
    tags: ["Snowflake", "Kafka", "Tableau", "Kubernetes"]
  },
  {
    title: "TD Bank: AML Risk Monitoring and MLOps",
    client: "TD Bank",
    projectName: "AML Risk Monitoring and MLOps",
    category: "mlops",
    focus: ["mlops", "ai", "data-platform"],
    summary: "Architected AML data pipelines and feature engineering workflows for 15M+ daily banking transactions.",
    outcome: "Reduced suspicious activity detection latency by 78%, improved model accuracy by 32%, lowered manual review cycles by 45%, and saved $150K annually through Redshift migration.",
    impacts: [
      "Reduced suspicious activity detection latency by 78% across 15M+ daily transactions, giving risk teams faster signal when timing mattered most.",
      "Improved AML model accuracy by 32% and achieved an F1 score of 0.85, strengthening the bridge between data engineering and production ML.",
      "Lowered manual review cycles by 45% and contributed to $150K in annual savings through cloud data platform optimization."
    ],
    tags: ["Snowflake", "Kafka", "Airflow", "XGBoost"]
  },
  {
    title: "Accenture / Bridgestone: AWS Lakehouse Modernization",
    client: "Accenture / Bridgestone",
    projectName: "AWS Lakehouse Modernization",
    category: "mlops",
    focus: ["mlops", "ai", "modernization", "data-platform"],
    summary: "Modernized legacy ETL to AWS, Snowflake, Apache Iceberg, Glue, PySpark, SageMaker, MLflow, and Kubernetes.",
    outcome: "Reduced data processing time by 6 hours, improved query performance by 5x, supported 300+ concurrent workloads, and improved inference response time by 35%.",
    impacts: [
      "Reduced data processing time by 6 hours, creating faster feedback loops for analytics and operational decision-making.",
      "Improved large-table query performance by 5x while supporting 300+ concurrent workloads on AWS lakehouse architecture.",
      "Improved inference response time by 35% by connecting data modernization with MLflow, SageMaker, Docker, Kubernetes, and EKS delivery patterns."
    ],
    tags: ["AWS", "Iceberg", "Snowflake", "MLflow"]
  },
  {
    title: "FL-DFS: Insurance Risk Warehouse Modernization",
    client: "FL-DFS",
    projectName: "Insurance Risk Warehouse Modernization",
    category: "modernization",
    focus: ["modernization", "data-platform"],
    summary: "Led Snowflake migration for a 100TB risk management warehouse with encryption, lineage, and audit documentation.",
    outcome: "Reduced audit exceptions by 45% while supporting bankruptcy takeover data from insurance companies across multiple states.",
    impacts: [
      "Modernized a 100TB risk management warehouse into Snowflake with encryption, lineage, and audit-ready controls.",
      "Reduced audit exceptions by 45%, converting governance from a reactive cleanup activity into a trusted operating layer.",
      "Supported bankruptcy takeover datasets across multiple states, where accuracy, traceability, and regulatory confidence were non-negotiable."
    ],
    tags: ["Snowflake", "Collibra", "Encryption", "Governance"]
  },
  {
    title: "Ryder: Governance Automation and Self-Service Analytics",
    client: "Ryder",
    projectName: "Governance Automation and Self-Service Analytics",
    category: "modernization",
    focus: ["modernization", "data-platform"],
    summary: "Consolidated 30 systems into Snowflake and built real-time ingestion using Kafka Connect, Iceberg, S3, and Airflow.",
    outcome: "Reduced report generation time by 50%, processed 5TB daily, reduced manual refresh work by 90%, and cut audit findings by 90%.",
    impacts: [
      "Consolidated 30 systems into Snowflake and AWS patterns, reducing report generation time by 50%.",
      "Processed 5TB daily through Kafka, Iceberg, S3, and Airflow while reducing manual refresh effort by 90%.",
      "Cut audit findings by 90%, giving stakeholders more confidence in access controls, lineage, and repeatable data operations."
    ],
    tags: ["Snowflake", "AWS Glue", "Kafka", "Airflow"]
  },
  {
    title: "Windhaven and 3M: Migration, Quality, and ETL Optimization",
    client: "Windhaven and 3M",
    projectName: "Migration, Quality, and ETL Optimization",
    category: "modernization",
    focus: ["modernization", "data-platform"],
    summary: "Delivered insurance data migration, regulatory reporting, Snowflake adoption, PL/SQL testing, and Informatica tuning.",
    outcome: "Reduced claim processing from 14 hours to 3 hours, delivered 115% first-year ROI, cut query execution by 40%, reduced problem tickets by 35%, and improved ETL ingestion by 60%.",
    impacts: [
      "Reduced claim processing from 14 hours to 3 hours, creating a visible operational win for insurance workflows.",
      "Delivered 115% first-year ROI and cut query execution time by 40% through Snowflake migration and reporting modernization.",
      "Reduced problem tickets by 35% and improved ETL ingestion by 60%, showing strength in both data quality and platform reliability."
    ],
    tags: ["ADF", "Snowflake", "SSIS", "Informatica"]
  }
];

const projectGrid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const themeToggle = document.querySelector("#themeToggle");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");
const clientNote = document.querySelector("#clientNote");
const toast = document.querySelector("#toast");
const scrollProgress = document.querySelector("#scrollProgress");
const clientPopup = document.querySelector("#clientPopup");
const clientPopupTitle = document.querySelector("#clientPopupTitle");
const clientPopupSummary = document.querySelector("#clientPopupSummary");
const clientPopupList = document.querySelector("#clientPopupList");
const clientPopupClose = document.querySelector(".client-popup-close");
const projectModal = document.querySelector("#projectModal");
const projectModalTitle = document.querySelector("#projectModalTitle");
const projectModalSummary = document.querySelector("#projectModalSummary");
const projectModalList = document.querySelector("#projectModalList");
const projectModalClose = document.querySelector(".project-modal-close");
let activeFilter = "all";
let activeProjectTitle = "";
let toastTimer;
let revealObserver;

const clientImpacts = {
  "Hyatt": {
    title: "Hyatt: Real-time lineage, compliance, and analytics reliability",
    summary: "Built compliance-critical data flows where uptime, latency, and traceability directly affected global operations.",
    impacts: [
      "Cut ETL latency by 80% across Kafka, S3, Snowflake, Tableau, and Kubernetes workflows.",
      "Reduced SLA breaches by 45%, helping teams trust the platform during high-pressure compliance windows.",
      "Maintained 99.99% uptime while enabling suspicious transaction tracing across 7 global regions."
    ]
  },
  "TD Bank": {
    title: "TD Bank: AML monitoring, AI-ready features, and MLOps impact",
    summary: "Built high-scale AML data and model workflows that helped risk teams act faster on millions of daily signals.",
    impacts: [
      "Processed 15M+ daily transactions while reducing suspicious activity detection latency by 78%.",
      "Improved AML model accuracy by 32% with feature engineering and production ML workflows.",
      "Reduced manual review cycles by 45% and supported $150K in annual savings through platform optimization."
    ]
  },
  "Accenture / Bridgestone": {
    title: "Accenture / Bridgestone: Lakehouse modernization with MLOps delivery",
    summary: "Connected AWS data modernization with MLflow, SageMaker, Docker, Kubernetes, and EKS delivery practices.",
    impacts: [
      "Improved large-table query performance by 5x while supporting 300+ concurrent workloads.",
      "Reduced data processing time by 6 hours through AWS, Snowflake, Iceberg, Glue, and PySpark modernization.",
      "Improved inference response time by 35%, making the platform stronger for AI and ML workloads."
    ]
  },
  "FL-DFS": {
    title: "FL-DFS: 100TB risk warehouse with governance built in",
    summary: "Modernized sensitive insurance risk data with Snowflake, lineage, encryption, and audit-ready controls.",
    impacts: [
      "Migrated a 100TB risk management warehouse into a governed Snowflake architecture.",
      "Reduced audit exceptions by 45% by strengthening lineage, encryption, and documentation.",
      "Supported multi-state bankruptcy takeover datasets where trust and traceability were critical."
    ]
  },
  "Ryder": {
    title: "Ryder: Logistics data consolidation and self-service analytics",
    summary: "Turned scattered logistics systems into a governed Snowflake and AWS analytics foundation.",
    impacts: [
      "Consolidated 30 systems into Snowflake and reduced report generation time by 50%.",
      "Processed 5TB daily through Kafka, Iceberg, S3, and Airflow while cutting manual refresh effort by 90%.",
      "Reduced audit findings by 90%, giving teams more confidence in controls and repeatability."
    ]
  },
  "Windhaven Insurance Company": {
    title: "Windhaven: Insurance migration and claims acceleration",
    summary: "Modernized insurance data movement and reporting so claims workflows became faster and more measurable.",
    impacts: [
      "Reduced claim processing time from 14 hours to 3 hours with ADF, Kafka, Python, and Snowflake.",
      "Delivered 115% first-year ROI through Snowflake adoption and migration execution.",
      "Cut query execution by 40% across reporting and regulatory workloads."
    ]
  },
  "3M": {
    title: "3M: Data quality, regression coverage, and ETL reliability",
    summary: "Strengthened testing and ingestion reliability for enterprise data operations.",
    impacts: [
      "Reduced problem tickets by 35% through PL/SQL testing and regression validation.",
      "Improved ETL ingestion time by 60% through Informatica optimization.",
      "Helped protect downstream analytics by improving quality gates before data reached business users."
    ]
  }
};

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

function renderProjects() {
  const visibleProjects = projects.filter((project) => {
    return activeFilter === "all" || project.focus.includes(activeFilter);
  });

  projectGrid.innerHTML = "";

  visibleProjects.forEach((project) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    card.setAttribute("aria-label", `View details for ${project.title}`);
    if (project.title === activeProjectTitle) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <span class="project-client">${project.client}</span>
      <h3>${project.projectName}</h3>
      <p>${project.summary}</p>
      <span class="tag-row">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </span>
    `;

    card.addEventListener("click", () => selectProject(project));
    projectGrid.appendChild(card);
  });

  setupReveal();
}

function selectProject(project) {
  activeProjectTitle = project.title;
  projectModalTitle.textContent = `${project.client}: ${project.projectName}`;
  projectModalSummary.textContent = project.outcome;
  projectModalList.innerHTML = project.impacts.map((impact) => `<li>${impact}</li>`).join("");
  openProjectModal();
  renderProjects();
  showToast(`${project.title} selected`);
}

function openProjectModal() {
  projectModal.hidden = false;
  requestAnimationFrame(() => projectModal.classList.add("visible"));
}

function closeProjectModal() {
  if (projectModal.hidden) {
    return;
  }

  projectModal.classList.remove("visible");
  window.setTimeout(() => {
    if (!projectModal.classList.contains("visible")) {
      projectModal.hidden = true;
    }
  }, 190);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderProjects();
  });
});

function closeClientPopup() {
  clientPopup.hidden = true;
  document.querySelectorAll(".client-tile").forEach((item) => item.classList.remove("active"));
}

function showClientPopup(clientName) {
  const content = clientImpacts[clientName];
  if (!content) {
    return;
  }

  clientPopupTitle.textContent = content.title;
  clientPopupSummary.textContent = content.summary;
  clientPopupList.innerHTML = content.impacts.map((impact) => `<li>${impact}</li>`).join("");
  clientPopup.hidden = false;
}

document.querySelector("#clients").addEventListener("click", (event) => {
  const tile = event.target.closest(".client-tile");
  if (!tile) {
    return;
  }

  event.stopPropagation();
  document.querySelectorAll(".client-tile").forEach((item) => item.classList.remove("active"));
  tile.classList.add("active");
  clientNote.textContent = `${tile.dataset.client} highlighted in the client matrix.`;
  showClientPopup(tile.dataset.client);
  showToast(`${tile.dataset.client} highlighted`);
});

clientPopup.addEventListener("click", (event) => {
  event.stopPropagation();
});

clientPopupClose.addEventListener("click", closeClientPopup);
projectModalClose.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".client-popup") && !event.target.closest(".client-tile")) {
    closeClientPopup();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeClientPopup();
    closeProjectModal();
  }
});

themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "Light" : "Dark";
  localStorage.setItem("portfolio-theme", nextTheme);
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-count]").forEach((counter) => {
  const target = Number(counter.dataset.count);
  const start = performance.now();
  const duration = 850;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    counter.textContent = Math.round(target * progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
});

function animateSpeedGauge(gauge) {
  const target = Number(gauge.dataset.speedTarget || 80);
  const counter = gauge.querySelector("[data-speed-count]");
  const start = performance.now();
  const duration = 1100;

  gauge.style.setProperty("--gauge-progress", "0%");
  gauge.style.setProperty("--gauge-value", "0");
  if (counter) {
    counter.textContent = "0";
  }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    gauge.style.setProperty("--gauge-progress", `${value}%`);
    gauge.style.setProperty("--gauge-value", String(value));
    if (counter) {
      counter.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

document.querySelectorAll("[data-speed-gauge]").forEach((gauge) => {
  gauge.style.setProperty("--gauge-progress", "0%");
  gauge.style.setProperty("--gauge-value", "0");
  setTimeout(() => animateSpeedGauge(gauge), 900);
  setInterval(() => animateSpeedGauge(gauge), 3400);
});

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(percent, 100)}%`;
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".section, .hero-contact, .career-card, .impact-dashboard, .project-card, .client-tile");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      item.classList.add("reveal");
      revealObserver.observe(item);
    }
  });
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "Light" : "Dark";
}

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
renderProjects();
setupReveal();
