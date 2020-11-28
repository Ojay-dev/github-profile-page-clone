import {
  isInViewport,
  setUserImage,
  setProfileInfo,
  setRepo,
} from "./helpers.js";
import { fetchGitHubData } from "./api.js";

const profileImage = document.querySelector(".profile-section__image");
const thumbnail = document.querySelector(".thumbnail");
const menuBtn = document.querySelector(".header-mobile__menu-icon");
const mobileMenu = document.querySelector(".header-mobile__form-nav-section");
const typeAllSelect = document.getElementById("typeAll");

const AllDetails = document.querySelectorAll("details");

window.addEventListener("load", async (event) => {
  console.log("page is fully loaded");
  const data = await fetchGitHubData();
  // console.log(data);
  setUserImage(data.avatarUrl);
  setProfileInfo(data);
  setRepo(data.repositories);

  const {} = data;
});

window.addEventListener(
  "scroll",
  function (event) {
    if (isInViewport(profileImage)) {
      thumbnail.style.visibility = "hidden";
    } else {
      thumbnail.style.visibility = "visible";
    }
  },
  false
);

menuBtn.addEventListener("click", function (event) {
  console.log("Hmaburger Clicked!!!");

  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "block";
  }
});

typeAllSelect.addEventListener("click", function (event) {
  console.log(typeAllSelect.hasAttribute("open"));
  if (typeAllSelect.hasAttribute("open")) {
    typeAllSelect.removeAttribute("open");
  } else {
    typeAllSelect.setAttribute("open", true);
  }
});
