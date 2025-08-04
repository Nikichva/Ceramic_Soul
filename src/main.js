// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  // init Swiper:
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clikable: true,
    },
    navigation: {
      nextEl: ".icon-right-open",
      prevEl: ".icon-left-open",
    },
    breakpoints: {
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1920: {
        spaceBetween: 35,
        slidesPerView: 3,
      },
    },
    modules: [Navigation, Pagination],
  });
})();
