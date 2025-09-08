import dataService from "./dataService.js";

export function adminLayout({
  _id: id,
  votes,
  status,
  topic_details: details,
  author_name: author,
  topic_title: title,
  video_ref: videoRef,
  submit_date: date,
  target_level: level,
}) {
 const voteScore = votes?.ups.length - votes?.downs.length;
  return `
     <td id="requests_title">
              <p class="whitespace-nowrap"> ${title}</p>
              <p class="subtitle"> ${details}</p>
              <small class="text-muted">Level: ${level} | Vote Score: ${voteScore}</small>
               <div class="request-video-link-form ${ status === "done"? "": "d-none"
              }" id="admin_video_res_container_${id}">
                <label class="form-label" for="youtube_link">YouTube Video Link</label>
                ${videoRef.link ? `
                <a href="https://www.youtube.com/watch?v=${videoRef.link}" target="_blank">
                    https://www.youtube.com/watch?v=${videoRef.link.slice(0, 10)}...
                </a>
                `: ""}
                <div class="form-group ${ videoRef.link? "d-none": ""}">
                  <input
                    class="form-input"
                    placeholder="https://www.youtube.com/embed/..."
                    required
                    id="admin_video_res_${id}" 
                  />
                  <button class="submit-btn" type="button" id="admin_save_video_res_${id}">Save</button>
                </div>
                </div>
            </td>
            <td id="submitted_by">${author}</td>
            <td id="submission_date">${new Date(date).toLocaleDateString()}</td>
            <td id="status">
              <select class="form-select status-badge status-${status}" id="admin_change_status_${id}">
                <option ${status === "new" ? "selected" : ""} value="new">NEW</option>
                <option ${
                  status === "planned" ? "selected" : ""
                } value="planned">PLANNED</option>
                <option ${status === "done" ? "selected" : ""} value="done">DONE</option>
              </select>
            </td>
            <td id="actions">
              <button class="action-btn delete-btn" title="Delete Request" id="admin_delete_video_req_${id}">
                Delete
              </button>
            </td>
         `;
}

export function initAdminControls(id, status, videoRef) {
  const adminChangeStatusElm = document.getElementById(
    `admin_change_status_${id}`
  );
  const adminVideoResElm = document.getElementById(`admin_video_res_${id}`);
  const adminVideoResContainer = document.getElementById(
    `admin_video_res_container_${id}`
  );
  const adminSaveVideoResElm = document.getElementById(
    `admin_save_video_res_${id}`
  );
  const adminDeleteVideoReqElm = document.getElementById(
    `admin_delete_video_req_${id}`
  );

  adminChangeStatusElm.value = status;
  // adminVideoResElm.value = videoRef.link;

  adminChangeStatusElm.addEventListener("change", (e) => {
    console.log(e.target.value);
    if (e.target.value === "done") {
      adminVideoResContainer.classList.remove("d-none");
    } else {
      dataService.updateVideoStatus(id, e.target.value);
    }
  });

  adminSaveVideoResElm.addEventListener("click", (e) => {
    e.preventDefault();
    if (adminVideoResElm.value) {
      dataService.updateVideoStatus(id, "done", adminVideoResElm.value);
    } else {
      adminVideoResElm.classList.add("is-invalid");
      adminVideoResElm.addEventListener("input", () =>
        adminVideoResElm.classList.remove("is-invalid")
      );
      return;
    }
  });

  adminDeleteVideoReqElm.addEventListener("click", (e) => {
    if (confirm("Are you sure you want to delete this request?")) {
      dataService.deleteVideoReq(id);
    }
  });
}
