export function applyVoteStyle(videoId, videoList, isDisabled, state, voteType) {
  if (!voteType) {
    if (videoList.ups.includes(state.userId)) {
      voteType = "ups";
    } else if (videoList.downs.includes(state.userId)) {
      voteType = "downs";
    } else {
      return;
    }
  }

  const voteUpsElm = document.getElementById(`vote-ups-${videoId}`);
  const voteDownElm = document.getElementById(`vote-downs-${videoId}`);

  if (isDisabled) {
    voteUpsElm.style.opacity = 0.5;
    voteUpsElm.style.cursor = "not-allowed";
    voteDownElm.style.opacity = 0.5;
    voteDownElm.style.cursor = "not-allowed";
    return;
  }

  const voteUpsDirElm = voteType === "ups" ? voteUpsElm : voteDownElm;
  const voteDownsDirElm = voteType === "ups" ? voteDownElm : voteUpsElm;

  if (videoList[voteType].includes(state.userId)) {
    voteUpsDirElm.style.opacity = 1;
    voteDownsDirElm.style.opacity = 0.5;
    if (voteType === "ups") {
      voteUpsDirElm.classList.add("upvoted");
    voteDownsDirElm.style.opacity = 1;
    voteDownsDirElm.classList.add("downvoted");
      voteUpsDirElm.classList.remove("upvoted");
      voteDownsDirElm.classList.add("downvoted");
    }
  } else {
    voteDownsDirElm.style.opacity = 1;
    if (voteType === "downs") {
      voteDownsDirElm.classList.add("downvoted");
      voteUpsDirElm.classList.remove("upvoted");
    } else {
      voteDownsDirElm.classList.remove("downvoted");
      voteUpsDirElm.classList.add("upvoted");
    }
  }
}