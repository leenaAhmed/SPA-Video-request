function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
export function validateForm(formData) {
  const topicTitle = formData.get("topic_title").trim();
  const topicDetails = formData.get("topic_details").trim();
  const topicLevel = formData.get("topic_level").trim();
  if (!topicTitle || topicTitle.length > 100) {
    const titleElm = document.querySelector("[name=topic_title]");
    if (titleElm) titleElm.classList.add("is-invalid");
  }
  if (!topicDetails) {
    const detailsElm = document.querySelector("[name=topic_details]");
    if (detailsElm) detailsElm.classList.add("is-invalid");
  }
  if (!topicLevel) {
    const levelElm = document.querySelector("[name=topic_level]");
    if (levelElm) levelElm.classList.add("is-invalid");
  }

  const formElm = document.getElementById("video-request-form");
  const formValidity = formElm ? formElm.querySelectorAll(".is-invalid") : [];
  if (formValidity.length) {
    formValidity.forEach((elm) => {
      elm.addEventListener("input", function () {
        this.classList.remove("is-invalid");
      });
    });
    return false;
  }
  return true;
}

export function loginFormValidation(formData) {
  const authorName = formData.get("author_name").trim();
  const authorEmail = formData.get("author_email").trim();

  if (!authorName) {
    const nameElm = document.querySelector("[name=author_name]");
    if (nameElm) nameElm.classList.add("is-invalid");
  }
  if (!authorEmail || !validateEmail(authorEmail)) {
    const emailElm = document.querySelector("[name=author_email]");
    if (emailElm) emailElm.classList.add("is-invalid");
  }

  const loginFormElm = document.getElementById("loginUser");
  const loginFormValidity = loginFormElm ? loginFormElm.querySelectorAll(".is-invalid") : [];
  if (loginFormValidity.length) {
    loginFormValidity.forEach((elm) => {
      elm.addEventListener("input", function () {
        this.classList.remove("is-invalid");
      });
    });
    return false;
  }
  return true;
}