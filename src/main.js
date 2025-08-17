// src/main.js
import "/src/styles/tailwind.css";
import "/src/styles/fontello.css";
import "/src/styles/globals.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import JustValidate from "just-validate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const pageMap = {
  "/": "promo.html",
  "/index.html": "promo.html",
  "/catalog.html": "catalog.body.html",
  "/blog.html": "blog.body.html",
  "/about.html": "about.body.html",
};

// pick fragment or default to promo.html
const bodySection = pageMap[window.location.pathname] || "promo.html";
const sectionList = ["header.html", bodySection, "footer.html"];

(async () => {
  const app = document.getElementById("app");
  for (const file of sectionList) {
    const res = await fetch(`/sections/${file}`);
    const html = await res.text();
    app.insertAdjacentHTML("beforeend", html);
  }

  const burger = document.querySelector(".burger");
  const close = document.querySelector(".header__menu-close");
  const menu = document.querySelector(".header__menu");
  // media query for MD breakpoint
  const md = window.matchMedia("(min-width: 768px)");

  function openMenu() {
    menu.classList.add("transform-[translateX(0%)]", "opacity-100");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("transform-[translateX(0%)]", "opacity-100");
    document.body.style.overflow = "";
  }
  burger.addEventListener("click", openMenu);
  close.addEventListener("click", closeMenu);
  // When media query are changed
  md.addEventListener("change", (e) => {
    if (e.matches) {
      // Now ≥768px — will reset menu and overflow
      closeMenu();
    }
  });

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

  try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Удаляем активный класс у всех табов и контента
        tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
        contents.forEach((c) => (c.style.display = "none"));

        // Добавляем активный класс к нажатому табу и показываем соответствующий контент
        tab.classList.add("catalog__tab_active");
        contents[index].style.display = "flex";
      });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
  } catch (e) {}

  // const validate = new JustValidate("#form");

  try {
    const validator = new JustValidate("#promo_form");

    validator
      .addField("#name", [
        {
          rule: "required",
          errorMessage: "Fill the name",
        },
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Min 2 char!",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Fill the email",
        },
        {
          rule: "email",
        },
      ])
      .addField(
        "#question",
        [
          {
            rule: "required",
            errorMessage: "Question is required",
          },
          {
            rule: "minLength",
            value: 5,
          },
        ],
        {
          errorsContainer: document
            .querySelector("#question")
            .parentElement.querySelector(".error-message"),
        }
      )
      .addField(
        "#checkbox",
        [
          {
            rule: "required",
            errorMessage: "Agree with the terms",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#checkbox")
            .parentElement.parentElement.querySelector(
              ".checkbox-error-message"
            ),
        }
      )
      .onSuccess((event) => {
        const form = event.currentTarget;
        const formData = new FormData(form);

        fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Success", data);
            form.reset();
          });
      });
  } catch (e) {}
  try {
    const newsletterValidator = new JustValidate("#form_newsletter");

    newsletterValidator
      .addField(
        "#email-footer",
        [
          {
            rule: "required",
            errorMessage: "Fill the email",
          },
          {
            rule: "email",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#email-footer")
            .parentElement.parentElement.querySelector(".error-message"),
        }
      )
      .addField(
        "#footer-checkbox",
        [
          {
            rule: "required",
            errorMessage: "Agree with the terms",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#footer-checkbox")
            .parentElement.parentElement.querySelector(
              ".checkbox-error-message"
            ),
        }
      )
      .onSuccess((event) => {
        const form = event.currentTarget;
        const formData = new FormData(form);

        fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Success", data);
            form.reset();
          });
      });
  } catch (e) {}
})();
