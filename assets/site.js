/* Manual appearance control, independent of system settings. */
(() => {
  "use strict";
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  function updateButton() {
    const dark = document.documentElement.dataset.theme === "dark";
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  updateButton();
  button.hidden = false;
  button.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("site-theme", theme); } catch {}
    updateButton();
  });
})();

/* News rendering for the static GitHub Pages version. No external dependencies. */
(() => {
  "use strict";

  const list = document.querySelector(".news-list");
  const region = document.querySelector(".news-scroll");
  const hint = document.getElementById("news-scroll-hint");
  if (!list || !region || !Array.isArray(window.SITE_NEWS)) return;

  const advisorLinks = new Map([
    ["Tam V. Nguyen", "https://udayton.edu/directory/artssciences/computerscience/nguyen-tam.php"],
    ["Minh-Triet Tran", "https://scholar.google.com/citations?user=lt2ATkkAAAAJ"],
    ["Khoa Luu", "https://scholar.google.com/citations?user=JPAl8-gAAAAJ"],
    ["John Gauch", "https://engineering.uark.edu/electrical-engineering-computer-science/electrical-engineering-faculty/uid/jgauch/name/John+Michael+Gauch/"],
    ["Jackson Cothren", "https://cast.uark.edu/directory/index/uid/jcothre/name/Jackson+David+Cothren/"],
    ["Khang Nguyen", "https://scholar.google.com.vn/citations?user=MH6YRMYpWWMC"],
  ]);

  function externalLink(label, url) {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function appendBody(element, text) {
    const parts = text.split(/((?:Dr\. )?(?:Tam V\. Nguyen|Minh-Triet Tran|Khoa Luu|Khang Nguyen|John Gauch|Jackson Cothren))/g);
    for (const part of parts) {
      const url = advisorLinks.get(part.replace(/^Dr\. /, ""));
      element.append(url ? externalLink(part, url) : document.createTextNode(part));
    }
  }

  const posts = window.SITE_NEWS.filter(post =>
    post && typeof post.date === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(post.date) &&
    typeof post.title === "string" && post.title.trim()
  ).slice().sort((a, b) => b.date.localeCompare(a.date));

  // Keep the readable HTML snapshot if the data file was accidentally malformed.
  if (window.SITE_NEWS.length && !posts.length) {
    console.warn("News data needs a valid date (YYYY-MM) and a nonempty title.");
    return;
  }

  const fragment = document.createDocumentFragment();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short", year: "numeric", timeZone: "UTC",
  });

  const newsTypes = new Set(["paper", "achievement", "education", "conference", "career"]);

  for (const post of posts) {
    const article = document.createElement("article");
    article.className = "news-item";
    if (newsTypes.has(post.type)) article.dataset.type = post.type;

    const time = document.createElement("time");
    time.dateTime = post.date;
    time.textContent = dateFormatter.format(new Date(`${post.date}-01T00:00:00Z`));

    const content = document.createElement("div");
    const heading = document.createElement("h3");
    const url = safeUrl(post.url);
    if (url) heading.append(externalLink(post.title, url));
    else heading.textContent = post.title;
    content.append(heading);

    if (typeof post.body === "string" && post.body.trim()) {
      const paragraph = document.createElement("p");
      appendBody(paragraph, post.body);
      content.append(paragraph);
    }
    article.append(time, content);
    fragment.append(article);
  }

  if (!posts.length) {
    const empty = document.createElement("p");
    empty.textContent = "More updates to come.";
    fragment.append(empty);
  }
  list.replaceChildren(fragment);
  if (posts.length) region.setAttribute("tabindex", "0");
  else region.removeAttribute("tabindex");

  if (hint) {
    hint.hidden = posts.length <= 4;
    if (posts.length > 4) region.setAttribute("aria-describedby", hint.id);
    else region.removeAttribute("aria-describedby");
  }
})();
