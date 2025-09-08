const adminContainer = document.getElementById("requests_stats_body");
import { initAdminControls } from "./admin.js";
import { adminLayout } from "./admin.js";

export function renderSingleAdmin(videoInfo) {
  const videoReqContainer = document.createElement("tr");
  const { _id: id, votes, status, video_ref: videoRef } = videoInfo;
  videoReqContainer.innerHTML = ` ${adminLayout(videoInfo)}`;
  adminContainer.append(videoReqContainer);
  initAdminControls(id, status, videoRef);
  return adminContainer;
}