import { renderSingleVidReq } from "./renderSingleVid.js";
import { changeUserLayout } from "./changeUserLayout.js";
import { applyVoteStyle } from "./applyVoteStyle.js"
import { renderSingleAdmin } from "./renderAdminView.js"
import API from "./api.js"

export default {
  updateVideoStatus: (id, status, resVideo) => {
    API.videoReq.update(id, status, resVideo)
      .then(() => window.location.reload())
      .catch((err) => {
        console.error(err);
        alert("Failed to update video status. Please try again.");
      });
  },
  loadAllVidReqs: (state) => {
    const videoListElm = document.getElementById("video_requests_list");
    const adminVideoRequestsList = document.getElementById("requests_stats_body");

    API.videoReq.get(state.sortBy, state.searchTerm, state.filterBy)
      .then((videoReq) => {
        if (videoListElm) videoListElm.innerHTML = "";
        if (adminVideoRequestsList) adminVideoRequestsList.innerHTML = "";
        videoReq.forEach((videoItem) => {
          if (state.isSuperUser) {
            renderSingleAdmin(videoItem);
          } else {
            renderSingleVidReq(videoItem, state);
          }
        });
      })
      .catch((err) => {
        console.error(err);
        if (videoListElm) videoListElm.innerHTML = "<p class=\"text-muted\">Failed to load requests.</p>";
      });
  },
  login: (formData, state) => {
    API.users.login(formData)
      .then((data) => {
        state.userId = data._id;
        localStorage.setItem("current-user", data._id);
        changeUserLayout(state);
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your details and try again.");
      });
  },
  addNewVideo: (formData , state) => {
    API.videoReq.post(formData)
      .then((data) => {
        renderSingleVidReq(data, state, true);
        const formElm = document.getElementById("video-request-form");
        if (formElm) formElm.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit request. Please try again.");
      });
  },
  deleteVideoReq: (VidId) => {
     API.videoReq.delete(VidId)
       .then(() => window.location.reload())
       .catch((err) => {
         console.error(err);
         alert("Failed to delete request. Please try again.");
       });
  },
  updateVotes: (vote_type, id, status, state) => {
    const voteScoreElm = document.getElementById(`vote-count-${id}`);
     API.votes.update(id, vote_type, state.userId)
       .then((res) => {
         if (voteScoreElm) {
           voteScoreElm.innerText = res.ups.length - res.downs.length;
         }
         applyVoteStyle(id, res, status === "done", state ,vote_type);
       }).catch((error) => {
         console.error("Error updating votes:", error);
         alert("Could not update vote. Please try again.");
       });
  }
};
