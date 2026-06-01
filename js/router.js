const routes = {
  "/": {
    page: "html/home.html",
    script: "js/home.js",
    style: "css/home.css",
  },
  "/country": {
    page: "html/country.html",
    script: "js/country.js",
    style: "css/country.css",
  },
};

async function loadPage(path) {
  const route = routes[path];

  if (!route) {
    document.getElementById("app").innerHTML = "<h1>404 Page Not Found</h1>";
    return;
  }

  try {
    const response = await fetch(route.page);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;
    // Remove previous page stylesheet
    document.getElementById("page-style")?.remove();

    // Add new stylesheet
    const link = document.createElement("link");
    link.id = "page-style";
    link.rel = "stylesheet";
    link.href = route.style;

    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = route.script;
    script.type = "module";

    document.body.appendChild(script);
  } catch (error) {
    console.error(error);
  }
}

function navigateTo(path) {
  history.pushState({}, "", path);

  loadPage(path);
}

window.addEventListener("popstate", () => {
  loadPage(location.pathname);
});

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();

    navigateTo(e.target.href.replace(location.origin, ""));
  }
});
console.log(location.pathname, "path");
loadPage(location.pathname);
