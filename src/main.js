import "/src/styles/tailwind.css";
import "/src/styles/fontello.css";
import "/src/styles/globals.css";

const sectionList = ["header.html", "promo.html", "footer.html"];

(async () => {
  const app = document.getElementById("app");

  for (const file of sectionList) {
    const res = await fetch(`/src/sections/${file}`);
    const html = await res.text();
    app.insertAdjacentHTML("beforeend", html);
  }
})();
