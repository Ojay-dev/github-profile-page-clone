import { starSVG, forkSVG } from "./svg.js";

export const isInViewport = (el) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
};

export const setUserImage = (imgUrl, alt) => {
  document.querySelector(".profile-section__image").setAttribute("src", imgUrl);
  document
    .querySelector(".profile-dropdown__avatar")
    .setAttribute("src", imgUrl);
  document
    .querySelector(".header-mobile__thumbnail--img")
    .setAttribute("src", imgUrl);
  document.querySelector(".thumbnail__image").setAttribute("src", imgUrl);
};

export const setProfileInfo = (data) => {
  // console.log(name, bio, company);
  document.querySelector(".profile-section__full-name").innerHTML = data.name;
  document.querySelector(".profile-section__user-name").innerHTML = data.login;
  document.querySelector(".profile-section__description").innerHTML = data.bio;
  document.querySelector("#company").innerHTML = data.company;
  document.querySelector("#location").innerHTML = data.location;
  document.querySelector("#twitter").innerHTML = data.twitterUsername;
  document.querySelector("#followers").innerHTML = data.followers.totalCount;
  document.querySelector("#following").innerHTML = data.following.totalCount;

  document
    .querySelectorAll(".organization__image-section > img")
    .forEach((organization, idx) => {
      // console.log(data.organizations.edges[idx].node.avatarUrl);
      organization.setAttribute(
        "src",
        data.organizations.edges[idx].node.avatarUrl
      );
    });
};

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(date);
  return d.getDate() + " " + months[d.getMonth()].substr(0, 3);
}

export const setRepo = (repositories) => {
  // console.log(repositories.totalCount);  
  document.querySelector(".repo-nav__totalCount").innerHTML =
    repositories.totalCount;

  repositories.totalCount;
  repositories.edges.forEach((repo) => {
    let publicRepo = ` 
    <div class="repo">
    <div class="repo__description">
      <div class="repo__link-area">
        <a href=${repo.node.url} class="repo__link">${repo.node.name}</a>
      </div>
  
      <div class="repo__detail">
        ${repo.node.languages.nodes
          .map(
            (language) => `
            <div>
              <span class="repo__language-color" style="background-color: ${language.color}"></span>
              <span class="repo__programmingLanguage">${language.name}</span>
            </div>`
          )
          .join("")}
        
          ${
            repo.node.forkCount
              ? `<a href="#" class="repo__meta">
              ${forkSVG}
              ${repo.node.forkCount}
            </a>`
              : ""
          }
  
        <span class="repo__last-updated">Updated on ${formatDate(
          repo.node.updatedAt
        )}</span>
      </div>
    </div>
  
    <button class="repo__btn">
      ${starSVG}
      Star
    </button>
  </div>`;
    document
      .querySelector(".repo-listing")
      .insertAdjacentHTML("beforeend", publicRepo);
  });
};
