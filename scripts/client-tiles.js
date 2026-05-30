const projects = [
  {
    title: "Hyatt: Real-Time Compliance and Guest Data Lineage",
    category: "analytics",
    summary: "Built near real-time lineage and compliance pipelines across Kafka, S3, Snowflake, Tableau, and Kubernetes.",
    outcome: "Reduced SLA breaches by 45%, cut ETL latency by 80%, enabled suspicious transaction tracing across 7 global regions, and maintained 99.99% uptime.",
    tags: ["Snowflake", "Kafka", "Tableau", "Kubernetes"]
  },
  {
    title: "TD Bank: AML Risk Monitoring and MLOps",
    category: "analytics",
    summary: "Architected AML data pipelines and feature engineering workflows for 15M+ daily banking transactions.",
    outcome: "Reduced suspicious activity detection latency by 78%, improved model accuracy by 32%, lowered manual review cycles by 45%, and saved $150K annually through Redshift migration.",
    tags: ["Snowflake", "Kafka", "Airflow", "XGBoost"]
  },
  {
    title: "Accenture / Bridgestone: AWS Lakehouse Modernization",
    category: "architecture",
    summary: "Modernized legacy ETL to AWS, Snowflake, Apache Iceberg, Glue, PySpark, SageMaker, MLflow, and Kubernetes.",
    outcome: "Reduced data processing time by 6 hours, improved query performance by 5x, supported 300+ concurrent workloads, and improved inference response time by 35%.",
    tags: ["AWS", "Iceberg", "Snowflake", "MLflow"]
  },
  {
    title: "FL-DFS: Insurance Risk Warehouse Modernization",
    category: "modernization",
    summary: "Led Snowflake migration for a 100TB risk management warehouse with encryption, lineage, and audit documentation.",
    outcome: "Reduced audit exceptions by 45% while supporting bankruptcy takeover data from insurance companies across multiple states.",
    tags: ["Snowflake", "Collibra", "Encryption", "Governance"]
  },
  {
    title: "Ryder: Governance Automation and Self-Service Analytics",
    category: "modernization",
    summary: "Consolidated 30 systems into Snowflake and built real-time ingestion using Kafka Connect, Iceberg, S3, and Airflow.",
    outcome: "Reduced report generation time by 50%, processed 5TB daily, reduced manual refresh work by 90%, and cut audit findings by 90%.",
    tags: ["Snowflake", "AWS Glue", "Kafka", "Airflow"]
  },
  {
    title: "Windhaven and 3M: Migration, Quality, and ETL Optimization",
    category: "architecture",
    summary: "Delivered insurance data migration, regulatory reporting, Snowflake adoption, PL/SQL testing, and Informatica tuning.",
    outcome: "Reduced claim processing from 14 hours to 3 hours, delivered 115% first-year ROI, cut query execution by 40%, reduced problem tickets by 35%, and improved ETL ingestion by 60%.",
    tags: ["ADF", "Snowflake", "SSIS", "Informatica"]
  }
];

const projectGrid = document.querySelector("#projectGrid");
const projectDetail = document.querySelector("#projectDetail");
const filterButtons = document.querySelectorAll(".filter-button");
const themeToggle = document.querySelector("#themeToggle");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");
const clientNote = document.querySelector("#clientNote");
const toast = document.querySelector("#toast");
const scrollProgress = document.querySelector("#scrollProgress");
let activeFilter = "all";
let activeProjectTitle = "";
let toastTimer;
let revealObserver;

const categoryIcons = {
  analytics: "AN",
  architecture: "AR",
  modernization: "MZ"
};

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

function renderProjects() {
  const visibleProjects = projects.filter((project) => {
    return activeFilter === "all" || project.category === activeFilter;
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
      <span class="project-icon">${categoryIcons[project.category] || "DE"}</span>
      <h3>${project.title}</h3>
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
  projectDetail.innerHTML = `
    <div>
      <h3>${project.title}</h3>
      <p>${project.outcome}</p>
    </div>
    <a class="button secondary" href="https://github.com/techlock77">See GitHub</a>
  `;
  renderProjects();
  showToast(`${project.title} selected`);
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

document.querySelectorAll(".client-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    document.querySelectorAll(".client-tile").forEach((item) => item.classList.remove("active"));
    tile.classList.add("active");
    clientNote.textContent = `${tile.dataset.client} highlighted in the client matrix.`;
    showToast(`${tile.dataset.client} highlighted`);
  });
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

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(percent, 100)}%`;
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".section, .career-card, .hero-visual, .visual-step, .project-card, .client-tile");

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
