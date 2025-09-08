import dataService from "./dataService.js"
export function changeUserLayout(state) {
  const superUserId = "68b73ca6a556fe24a4a1dfa3"; // admin
  
  const videoRequestContentElm = document.querySelector(".main-user-content");
  const userFormLoginElm = document.querySelector(".user-login-container");
  const mainUserContentElm = document.querySelector(".user-content");
  const adminContainer = document.getElementById("admin_container");
  const logoutBtn = document.getElementById("logoutBtn");
  const userBadge = document.getElementById("userBadge");
  state.userId = localStorage.getItem("current-user");
    
  if (state.userId) {
    dataService.loadAllVidReqs(state);
    if (videoRequestContentElm) videoRequestContentElm.classList.remove("d-none");
    if (userFormLoginElm) userFormLoginElm.classList.add("d-none");
    if (logoutBtn) logoutBtn.classList.remove("d-none");
    if (state.userId === superUserId) {
      state.isSuperUser = true;
      if (mainUserContentElm) mainUserContentElm.classList.add("d-none");
      if (adminContainer) adminContainer.classList.remove("d-none");
      if (videoRequestContentElm) videoRequestContentElm.classList.add("d-none");
      if (userBadge) userBadge.classList.remove("d-none");
    }
  }
}