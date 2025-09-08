import { debounce } from "./debounce.js"
import { changeUserLayout } from "./changeUserLayout.js";
import {validateForm} from "./validation.js"
import dataService from './dataService.js';
import { loginFormValidation } from "./validation.js";

const state = {
  sortBy: "newFirst",
  searchTerm: "",
  filterBy: "all",
  userId: "",
  isSuperUser: false
};



// once document loaded and before styling load
document.addEventListener("DOMContentLoaded", () => {
  const videoRequestElm = document.getElementById("video-request-form");
  const sortElms = document.querySelectorAll("[id*=sort_by_]");
  const searchBy = document.getElementById("search-video-requests");
  const filterByElms = document.getElementById("filter_by_status");

  changeUserLayout(state);

  sortElms.forEach((items) => {
    items.addEventListener("click", function (e) {
      e.preventDefault();
      state.sortBy = this.querySelector("input").value;
      dataService.loadAllVidReqs(state);
      this.classList.add("active");
      if (state.sortBy === "topVotedFirst") {
        document.getElementById("sort_by_new").classList.remove("active");
      } else {
        document.getElementById("sort_by_top").classList.remove("active");
      }
    });
  });


  filterByElms.addEventListener("change", function (e) {
    e.preventDefault();
    state.filterBy = this.value;
    dataService.loadAllVidReqs(state);
  });


  searchBy.addEventListener(
    "input",
    debounce((e) => {
      state.searchTerm = e.target.value;
      dataService.loadAllVidReqs(state);
    }, 1500)
  );

  videoRequestElm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(videoRequestElm);
    formData.append("author_id", state.userId);

    // check validation
    const isValid = validateForm(formData);
    if (!isValid) return;
    dataService.addNewVideo(formData , state)
  });

  const loginUserElm = document.getElementById("loginUser");

  loginUserElm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginUserElm);
     const isValid = loginFormValidation(formData);
    if (!isValid) return;
    dataService.login(formData, state);
  });

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("current-user");
    location.reload();
  });
});
