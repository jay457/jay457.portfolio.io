window.onload = function() {
    /* Tab functionality referenced from https://botoxparty.github.io/XP.css/ */
    let tabs = document.querySelectorAll("menu[role=tablist]");

    for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];

    let tabButtons = tab.querySelectorAll("menu[role=tablist] > button");

    tabButtons.forEach((btn) =>
        btn.addEventListener("click", (e) => {
        e.preventDefault();

        tabButtons.forEach((button) => {
            if (
            button.getAttribute("aria-controls") ===
            e.target.getAttribute("aria-controls")
            ) {
            button.setAttribute("aria-selected", true);
            openTab(e, tab);
            } else {
            button.setAttribute("aria-selected", false);
            }
        });
        })
    );
    }

    function openTab(event, tab) {
    const articles = tab.parentNode.querySelectorAll('[role="tabpanel"]');
    articles.forEach((p) => {
        p.setAttribute("hidden", true);
    });
    const article = tab.parentNode.querySelector(
        `[role="tabpanel"]#${event.target.getAttribute("aria-controls")}`
    );
    article.removeAttribute("hidden");
    }
}