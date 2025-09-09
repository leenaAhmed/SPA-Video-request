const videoListElm = document.getElementById("video_requests_list");
import { applyVoteStyle } from "./applyVoteStyle.js";
import dataService from "./dataService.js";
import { userLayout } from "./userUi.js";

function initVoteControls(id, status, state) {
  const votesElms = document.querySelectorAll(`[id^="vote-"][id$="-${id}"]`);
  votesElms.forEach((item) => {
    if (state.isSuperUser || status === "done") {
      return;
    }
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const [, vote_type, voteId] = e.target.getAttribute("id").split("-");
      dataService.updateVotes(vote_type, voteId, status, state);
    });
  });
}


export function renderSingleVidReq(videoInfo, state, isPrepend = false) {
  const videoReqContainer = document.createElement("div");
  const { _id: id, votes, status, video_ref: videoRef } = videoInfo;
  const isVideoDone = status === "done";
  videoReqContainer.innerHTML = `${userLayout(videoInfo)}`;

  if (isPrepend) {
    videoListElm.prepend(videoReqContainer);
  } else {
    videoListElm.append(videoReqContainer);
  }

  applyVoteStyle(id, votes, isVideoDone, state);
  initVoteControls(id, status, state);

  return videoListElm;
}
