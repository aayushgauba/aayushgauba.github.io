const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function createAnchor(url, label) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noreferrer";
  a.textContent = label;
  return a;
}

function appendText(parent, text) {
  parent.appendChild(document.createTextNode(text));
}

function renderLoadError(message) {
  ["experience-list", "opensource-list", "talks-list", "papers-list"].forEach((id) => {
    const list = document.getElementById(id);
    if (!list) return;
    list.textContent = "";
    const li = document.createElement("li");
    li.textContent = message;
    list.appendChild(li);
  });
}

function renderExperience(items) {
  const list = document.getElementById("experience-list");
  if (!list) return;
  list.textContent = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${item.role} @ ${item.organization}`;
    li.appendChild(strong);

    if (item.period) {
      appendText(li, ` (${item.period})`);
    }

    if (item.summary) {
      appendText(li, ` - ${item.summary}`);
    }

    if (item.url) {
      appendText(li, " - ");
      li.appendChild(createAnchor(item.url, item.urlLabel || "Details"));
    }

    list.appendChild(li);
  });
}

function renderOpenSource(items) {
  const list = document.getElementById("opensource-list");
  if (!list) return;
  list.textContent = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    if (item.url) {
      li.appendChild(createAnchor(item.url, item.name));
    } else {
      const strong = document.createElement("strong");
      strong.textContent = item.name;
      li.appendChild(strong);
    }

    if (item.description) {
      appendText(li, ` - ${item.description}`);
    }

    list.appendChild(li);
  });
}

function renderTalks(items) {
  const list = document.getElementById("talks-list");
  if (!list) return;
  list.textContent = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    appendText(li, `${item.title} - ${item.event} (${item.year})`);

    if (Array.isArray(item.links) && item.links.length > 0) {
      item.links.forEach((link, index) => {
        appendText(li, index === 0 ? " - " : " | ");
        li.appendChild(createAnchor(link.url, link.label));
      });
    }

    list.appendChild(li);
  });
}

function renderPapers(items) {
  const list = document.getElementById("papers-list");
  if (!list) return;
  list.textContent = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    appendText(li, `${item.title} (${item.year})`);

    if (item.venue) {
      appendText(li, ` - ${item.venue}`);
    }

    if (item.url) {
      appendText(li, " - ");
      li.appendChild(createAnchor(item.url, item.urlLabel || "Read paper"));
    }

    list.appendChild(li);
  });
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
}

async function loadContent() {
  try {
    const [experience, opensource, talks, papers] = await Promise.all([
      loadJson("experience.json"),
      loadJson("opensource.json"),
      loadJson("talks.json"),
      loadJson("papers.json")
    ]);

    renderExperience(experience);
    renderOpenSource(opensource);
    renderTalks(talks);
    renderPapers(papers);
  } catch (error) {
    if (window.location.protocol === "file:") {
      renderLoadError("Unable to load data via file://. Run with a local server (e.g., python -m http.server).");
    } else {
      renderLoadError("Unable to load JSON data. Check file names, paths, and JSON syntax.");
    }
    console.error("JSON load failed:", error);
  }
}

loadContent();

const revealEls = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
