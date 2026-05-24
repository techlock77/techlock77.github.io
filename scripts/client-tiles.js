const projects = [
  {
    title: "Smart Room Allocation Optimization",
    category: "analytics",
    summary: "Optimization model for aligning room demand, availability, and operational constraints.",
    outcome: "Improved allocation planning by turning manual scheduling decisions into a repeatable analytics workflow.",
    tags: ["Optimization", "Analytics", "Planning"]
  },
  {
    title: "Audience Sentiment Enrichment",
    category: "analytics",
    summary: "Pipeline for enriching audience feedback with sentiment and downstream reporting signals.",
    outcome: "Created a cleaner path from raw feedback to insight-ready features for engagement analysis.",
    tags: ["NLP", "Enrichment", "Reporting"]
  },
  {
    title: "Data Architecture & Modernization",
    category: "architecture",
    summary: "Target-state architecture for modern ingestion, transformation, storage, and consumption layers.",
    outcome: "Defined scalable foundations for trusted analytics and easier platform evolution.",
    tags: ["Architecture", "Cloud", "Governance"]
  },
  {
    title: "ETL Process Modernization",
    category: "modernization",
    summary: "Legacy process review and redesign focused on reliability, orchestration, and maintainability.",
    outcome: "Reduced fragile handoffs and improved pipeline visibility with clearer operational controls.",
    tags: ["ETL", "Automation", "Quality"]
  },
  {
    title: "Data Modernization + RingCentral Implementation",
    category: "modernization",
    summary: "Integration and data modernization work supporting communications and operational reporting.",
    outcome: "Connected source-system activity to cleaner reporting flows and stakeholder-facing metrics.",
    tags: ["Integration", "Modernization", "Operations"]
  },
  {
    title: "Transactional Process Data Mart",
    category: "architecture",
    summary: "Curated mart design for transactional process analytics and decision support.",
    outcome: "Created a more usable analytics layer from operational data with clearer business definitions.",
    tags: ["Data Mart", "Modeling", "SQL"]
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
let activeFilter = "all";
let activeProjectTitle = "";
let toastTimer;

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
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <span class="tag-row">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </span>
    `;

    card.addEventListener("click", () => selectProject(project));
    projectGrid.appendChild(card);
  });
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
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
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

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "Light" : "Dark";
}

renderProjects();
