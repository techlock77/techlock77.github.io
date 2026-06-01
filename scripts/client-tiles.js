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
const sectionNav = document.querySelector(".section-nav");
const sectionNavToggle = document.querySelector(".section-nav-toggle");
const sectionNavLinks = document.querySelectorAll("[data-section-link]");
const siteHeader = document.querySelector(".site-header");
const clientNote = document.querySelector("#clientNote");
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
let revealObserver;
let animationObserver;
let dashboardAnimationFrame;
const carouselStates = new Map();

function scheduleAnimationFrame(callback) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }

  return window.setTimeout(() => callback(window.performance?.now?.() || Date.now()), 16);
}

function getScrollOffset() {
  const headerHeight = Math.ceil(siteHeader?.getBoundingClientRect().height || 0);
  return headerHeight + 18;
}

function syncScrollOffset() {
  document.documentElement.style.setProperty("--scroll-offset", `${getScrollOffset()}px`);
}

function scrollToSectionId(id, pushHistory = true) {
  const target = id === "top" ? document.querySelector("#top") : document.getElementById(id);

  if (!target) {
    return;
  }

  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  closeSectionNavigation();
  syncScrollOffset();

  scheduleAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });

    if (pushHistory) {
      const nextHash = id === "top" ? "#top" : `#${id}`;
      window.history.pushState(null, "", nextHash);
    }

    window.setTimeout(updateSectionNavigation, 760);
  });
}

function getCarouselState(name) {
  if (!carouselStates.has(name)) {
    carouselStates.set(name, {
      index: 0,
      startX: 0,
      startY: 0,
      isPointerDown: false,
      suppressClick: false
    });
  }

  return carouselStates.get(name);
}

function getCarouselElements(name) {
  const root = document.querySelector(`[data-carousel="${name}"]`);
  const viewport = document.querySelector(`[data-carousel-viewport="${name}"]`);
  const track = document.querySelector(`[data-carousel-track="${name}"]`);
  const progress = document.querySelector(`[data-carousel-progress="${name}"]`);

  return {
    root,
    viewport,
    track,
    progress,
    cards: track ? [...track.querySelectorAll(".carousel-card")] : []
  };
}

function wrapCarouselIndex(index, total) {
  if (!total) {
    return 0;
  }

  return (index + total) % total;
}

function updateCarousel(name) {
  const state = getCarouselState(name);
  const { viewport, track, progress, cards } = getCarouselElements(name);
  const total = cards.length;

  if (!viewport || !track || !total) {
    if (progress) {
      progress.textContent = "0 of 0";
    }
    return;
  }

  state.index = wrapCarouselIndex(state.index, total);
  const activeCard = cards[state.index];
  const cardWidth = activeCard.getBoundingClientRect().width;
  const step = Math.min(cardWidth * 0.78, Math.max(190, viewport.clientWidth * 0.34));
  const maxHeight = Math.max(...cards.map((card) => card.scrollHeight));

  track.style.height = `${maxHeight}px`;

  cards.forEach((card, index) => {
    const previousIndex = wrapCarouselIndex(state.index - 1, total);
    const nextIndex = wrapCarouselIndex(state.index + 1, total);
    const isActive = index === state.index;
    const isPreview = index === previousIndex || index === nextIndex;
    let relativePosition = (index - state.index + total) % total;

    if (relativePosition > total / 2) {
      relativePosition -= total;
    }

    const distance = Math.abs(relativePosition);
    const clampedPosition = Math.max(-2, Math.min(2, relativePosition));
    const scale = isActive ? 1 : distance === 1 ? 0.94 : 0.86;
    const opacity = isActive ? 1 : distance === 1 ? 0.68 : distance === 2 ? 0.2 : 0;

    card.classList.toggle("is-active", isActive);
    card.classList.toggle("is-preview", isPreview && !isActive);
    card.classList.toggle("is-outer-preview", distance === 2);
    card.classList.toggle("active", isActive && card.classList.contains("client-tile"));
    card.setAttribute("aria-current", isActive ? "true" : "false");
    card.setAttribute("aria-hidden", distance > 2 ? "true" : "false");
    card.style.pointerEvents = distance <= 1 ? "auto" : "none";
    card.style.transform = `translate3d(calc(-50% + ${clampedPosition * step}px), 0, 0) scale(${scale})`;
    card.style.opacity = String(opacity);
  });

  if (progress) {
    progress.textContent = `${state.index + 1} of ${total}`;
  }
}

function moveCarousel(name, direction) {
  const state = getCarouselState(name);
  const { cards } = getCarouselElements(name);

  state.index = wrapCarouselIndex(state.index + direction, cards.length);
  updateCarousel(name);
}

function setupCarousel(name) {
  const state = getCarouselState(name);
  const { root, viewport } = getCarouselElements(name);

  if (!root || !viewport || root.dataset.carouselReady === "true") {
    updateCarousel(name);
    return;
  }

  root.dataset.carouselReady = "true";
  viewport.tabIndex = 0;

  document.querySelector(`[data-carousel-prev="${name}"]`)?.addEventListener("click", () => moveCarousel(name, -1));
  document.querySelector(`[data-carousel-next="${name}"]`)?.addEventListener("click", () => moveCarousel(name, 1));

  viewport.addEventListener("pointerdown", (event) => {
    state.isPointerDown = true;
    state.startX = event.clientX;
    state.startY = event.clientY;
  });

  viewport.addEventListener("pointerup", (event) => {
    if (!state.isPointerDown) {
      return;
    }

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    state.isPointerDown = false;

    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      state.suppressClick = true;
      moveCarousel(name, deltaX < 0 ? 1 : -1);
      window.setTimeout(() => {
        state.suppressClick = false;
      }, 120);
    }
  });

  viewport.addEventListener("pointercancel", () => {
    state.isPointerDown = false;
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(name, -1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(name, 1);
    }
  });

  updateCarousel(name);
}

function updateCarousels() {
  updateCarousel("clients");
  updateCarousel("projects");
}

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

function renderProjects() {
  const visibleProjects = projects.filter((project) => {
    return activeFilter === "all" || project.focus.includes(activeFilter);
  });
  const projectCarousel = getCarouselState("projects");

  projectGrid.innerHTML = "";

  visibleProjects.forEach((project) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card carousel-card";
    card.setAttribute("aria-label", `Explore impact for ${project.title}`);
    if (project.title === activeProjectTitle) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <h3>${project.projectName}</h3>
      <p>${project.summary}</p>
      <span class="tag-row">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </span>
      <span class="project-client">${project.client}</span>
      <span class="card-action"><span class="action-radio" aria-hidden="true"></span><span>Explore impact</span></span>
    `;

    card.addEventListener("click", () => {
      if (!getCarouselState("projects").suppressClick) {
        selectProject(project);
      }
    });
    projectGrid.appendChild(card);
  });

  if (activeProjectTitle) {
    const activeIndex = visibleProjects.findIndex((project) => project.title === activeProjectTitle);
    if (activeIndex >= 0) {
      projectCarousel.index = activeIndex;
    }
  }

  projectCarousel.index = wrapCarouselIndex(projectCarousel.index, visibleProjects.length);
  updateCarousel("projects");
  setupReveal();
}

function selectProject(project) {
  activeProjectTitle = project.title;
  projectModalTitle.textContent = `${project.client}: ${project.projectName}`;
  projectModalSummary.textContent = project.outcome;
  projectModalList.innerHTML = project.impacts.map((impact) => `<li>${impact}</li>`).join("");
  openProjectModal();
  renderProjects();
}

function openProjectModal() {
  closeClientPopup();
  projectModal.hidden = false;
  projectModal.getBoundingClientRect();
  projectModal.classList.add("visible");
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
    getCarouselState("projects").index = 0;
    activeProjectTitle = "";
    renderProjects();
  });
});

function closeClientPopup() {
  if (clientPopup.hidden) {
    return;
  }

  clientPopup.classList.remove("visible");
  window.setTimeout(() => {
    if (!clientPopup.classList.contains("visible")) {
      clientPopup.hidden = true;
    }
  }, 190);
  document.querySelectorAll(".client-tile").forEach((item) => item.classList.remove("active"));
}

function showClientPopup(clientName) {
  closeProjectModal();
  const content = clientImpacts[clientName];
  if (!content) {
    return;
  }

  clientPopupTitle.textContent = content.title;
  clientPopupSummary.textContent = content.summary;
  clientPopupList.innerHTML = content.impacts.map((impact) => `<li>${impact}</li>`).join("");
  clientPopup.hidden = false;
  clientPopup.getBoundingClientRect();
  clientPopup.classList.add("visible");
}

document.querySelector("#clients").addEventListener("click", (event) => {
  const tile = event.target.closest(".client-tile");
  if (!tile) {
    return;
  }

  event.stopPropagation();
  if (getCarouselState("clients").suppressClick) {
    return;
  }

  document.querySelectorAll(".client-tile").forEach((item) => item.classList.remove("active"));
  tile.classList.add("active");
  getCarouselState("clients").index = [...document.querySelectorAll(".client-tile")].indexOf(tile);
  updateCarousel("clients");
  clientNote.textContent = `${tile.dataset.client} impact opened.`;
  showClientPopup(tile.dataset.client);
});

clientPopup.addEventListener("click", (event) => {
  if (event.target === clientPopup) {
    closeClientPopup();
  }
});

clientPopupClose.addEventListener("click", closeClientPopup);
projectModalClose.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
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
  sectionNav.classList.remove("open");
  sectionNavToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1) || "top";
    const target = id === "top" ? document.querySelector("#top") : document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    scrollToSectionId(id);
  });
});

function closeSectionNavigation() {
  sectionNav.classList.remove("open");
  sectionNavToggle.setAttribute("aria-expanded", "false");
}

sectionNavToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = sectionNav.classList.toggle("open");
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  sectionNavToggle.setAttribute("aria-expanded", String(isOpen));
});

sectionNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.addEventListener("click", (event) => {
  if (sectionNav.classList.contains("open") && !sectionNav.contains(event.target)) {
    closeSectionNavigation();
  }
});

document.querySelectorAll("[data-count]").forEach((counter) => {
  const target = Number(counter.dataset.count);
  const start = performance.now();
  const duration = 850;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    counter.textContent = Math.round(target * progress);
    if (progress < 1) {
      scheduleAnimationFrame(tick);
    }
  }

  scheduleAnimationFrame(tick);
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
      scheduleAnimationFrame(tick);
    }
  }

  scheduleAnimationFrame(tick);
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
  updateSectionNavigation();
  closeSectionNavigation();
  closeClientPopup();
  closeProjectModal();
}

function updateSectionNavigation() {
  const anchorOffset = getScrollOffset() + 28;
  let activeId = "top";
  const isAtPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;

  sectionNavLinks.forEach((link) => {
    const id = link.dataset.sectionLink;
    const target = id === "top" ? document.querySelector("#top") : document.getElementById(id);

    if (target && target.getBoundingClientRect().top <= anchorOffset) {
      activeId = id;
    }
  });

  if (isAtPageEnd) {
    activeId = sectionNavLinks[sectionNavLinks.length - 1]?.dataset.sectionLink || activeId;
  }

  sectionNavLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === activeId;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
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

function setupDashboardAnimations() {
  const dashboards = document.querySelectorAll(".impact-dashboard");

  if (!("IntersectionObserver" in window)) {
    dashboards.forEach(startDashboardAnimation);
    return;
  }

  if (!animationObserver) {
    animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startDashboardAnimation(entry.target);
        }
      });
    }, { threshold: 0.28 });
  }

  dashboards.forEach((dashboard) => animationObserver.observe(dashboard));
}

function startDashboardAnimation(dashboard) {
  if (dashboard.classList.contains("is-animating")) {
    return;
  }

  dashboard.classList.add("is-animating");
  const packets = [...dashboard.querySelectorAll(".data-packet")];
  const streams = [...dashboard.querySelectorAll(".throughput-stream")];
  const motion = dashboard.querySelector(".workload-motion");
  const costCurve = dashboard.querySelector(".cost-curve-progress");
  const costCurveGuide = dashboard.querySelector(".cost-curve-guide");
  const costDrop = dashboard.querySelector(".cost-drop");
  const costBars = [...dashboard.querySelectorAll(".cost-segment")];
  const phases = [0, 0.28, 0.56];
  const duration = 3200;
  function pointOnCubic(p0, p1, p2, p3, t) {
    const oneMinusT = 1 - t;
    return {
      x: oneMinusT ** 3 * p0.x + 3 * oneMinusT ** 2 * t * p1.x + 3 * oneMinusT * t ** 2 * p2.x + t ** 3 * p3.x,
      y: oneMinusT ** 3 * p0.y + 3 * oneMinusT ** 2 * t * p1.y + 3 * oneMinusT * t ** 2 * p2.y + t ** 3 * p3.y
    };
  }

  function getFallbackPathMetrics(segments) {
    const samples = [];
    let length = 0;

    segments.forEach((segment) => {
      const [p0, p1, p2, p3] = segment;
      let previous = p0;

      for (let step = 1; step <= 24; step += 1) {
        const point = pointOnCubic(p0, p1, p2, p3, step / 24);
        length += Math.hypot(point.x - previous.x, point.y - previous.y);
        samples.push({ point, length });
        previous = point;
      }
    });

    return { length, samples };
  }

  function getFallbackPointAtLength(samples, distance) {
    if (!samples.length) {
      return { x: 0, y: 0 };
    }

    return samples.find((sample) => sample.length >= distance)?.point || samples[samples.length - 1].point;
  }

  function frame(now) {
    const distance = Math.max(118, (motion?.clientWidth || 360) - 148);

    packets.forEach((packet, index) => {
      const progress = ((now / duration) + phases[index]) % 1;
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const opacity = progress < 0.12 ? progress / 0.12 : progress > 0.84 ? (1 - progress) / 0.16 : 1;
      packet.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      packet.style.transform = `translate3d(${Math.round(eased * distance)}px, 0, 0) scale(${0.86 + eased * 0.18})`;
    });

    streams.forEach((stream, index) => {
      const progress = ((now / 2800) + phases[index]) % 1;
      const pulse = 0.5 - Math.cos(progress * Math.PI * 2) / 2;
      stream.style.opacity = String(0.2 + pulse * 0.48);
      stream.style.transform = `scaleX(${0.42 + pulse * 0.58})`;
    });

    if (costCurve && costDrop) {
      const progress = (now / 2800) % 1;
      const opacity = progress < 0.16 ? progress / 0.16 : progress > 0.84 ? (1 - progress) / 0.16 : 1;
      const costTarget = costCurve.parentElement || costCurve;
      const svg = costCurve.ownerSVGElement;
      const svgRect = svg.getBoundingClientRect();
      const costSegments = costBars.map((bar) => {
        const barRect = bar.getBoundingClientRect();
        return {
          x: ((barRect.left + barRect.width / 2 - svgRect.left) / svgRect.width) * 220,
          y: ((barRect.top - svgRect.top) / svgRect.height) * 126
        };
      }).slice(0, 5).reduce((segments, point, index, points) => {
        if (index === points.length - 1) {
          return segments;
        }

        const current = point;
        const next = points[index + 1];
        const previous = points[index - 1] || current;
        const following = points[index + 2] || next;
        const controlScale = 0.24;
        segments.push([
          current,
          {
            x: current.x + (next.x - previous.x) * controlScale,
            y: current.y + (next.y - previous.y) * controlScale
          },
          {
            x: next.x - (following.x - current.x) * controlScale,
            y: next.y - (following.y - current.y) * controlScale
          },
          next
        ]);
        return segments;
      }, []);

      if (costSegments.length) {
        const firstPoint = costSegments[0][0];
        const curvePath = costSegments.reduce((path, [, c1, c2, end]) => {
          return `${path} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
        }, `M ${firstPoint.x.toFixed(1)} ${firstPoint.y.toFixed(1)}`);
        costCurve.setAttribute("d", curvePath);
        costCurveGuide?.setAttribute("d", curvePath);
      }

      const hasNativePathMetrics = typeof costCurve.getTotalLength === "function" && typeof costCurve.getPointAtLength === "function";
      const fallbackMetrics = hasNativePathMetrics ? null : getFallbackPathMetrics(costSegments);
      const pathLength = hasNativePathMetrics ? costCurve.getTotalLength() : fallbackMetrics.length;
      const traveled = progress * pathLength;
      const pathPoint = hasNativePathMetrics
        ? costCurve.getPointAtLength(traveled)
        : getFallbackPointAtLength(fallbackMetrics.samples, traveled);
      costTarget.style.setProperty("--cost-arrow-opacity", String(Math.max(0, Math.min(1, opacity))));
      costTarget.style.setProperty("--cost-path-length", pathLength.toFixed(1));
      costTarget.style.setProperty("--cost-path-offset", (pathLength - traveled).toFixed(1));
      costDrop.setAttribute("transform", `translate(${pathPoint.x.toFixed(2)} ${pathPoint.y.toFixed(2)})`);
    }

    dashboardAnimationFrame = scheduleAnimationFrame(frame);
  }

  dashboardAnimationFrame = scheduleAnimationFrame(frame);
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
window.addEventListener("resize", () => {
  syncScrollOffset();
  updateCarousels();
  updateScrollProgress();
});
window.addEventListener("load", () => {
  syncScrollOffset();
  if (window.location.hash) {
    scrollToSectionId(window.location.hash.slice(1), false);
  }
});
window.addEventListener("hashchange", () => {
  if (window.location.hash) {
    scrollToSectionId(window.location.hash.slice(1), false);
  }
});
syncScrollOffset();
updateScrollProgress();
setupCarousel("clients");
renderProjects();
setupCarousel("projects");
setupReveal();
setupDashboardAnimations();
