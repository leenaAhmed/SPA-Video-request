export function userLayout({
  _id: id,
  votes,
  status,
  topic_details: details,
  author_name: author,
  topic_title: title,
  expected_result: expected,
  video_ref: videoRef,
  submit_date: date,
  target_level: level,
}) {
  const voteScore = (votes?.ups ?? []).length - (votes?.downs ?? []).length;
  const isVideoDone = status === "done";
  return `
      <div class="request-item">
            <div class="request-header">
                <div class="vote-arrows">
                    <button class="vote-arrow" id="vote-ups-${id}">▲</button>
                    <div class="vote-count" id="vote-count-${id}">${voteScore}</div>
                    <button class="vote-arrow" id="vote-downs-${id}">▼</button>
                </div>
                <div class="request-info">
                    <div class="request-title">${title}</div>
                    <div class="request-description">
                        <p>${details}</p>
                    </div>
                    <div class="request-footer">
                        by ${author} on ${
                          date && !isNaN(new Date(date).getTime())
                            ? new Date(date).toLocaleDateString()
                            : "Unknown date"
                        }
                        <span class="status-badge status-${status ?? 'unknown'}">${(status ?? 'unknown').toUpperCase()}</span>
                    </div>
                </div>
                ${
                  isVideoDone
                    ? `<div class="video-thumbnail">
                  <iframe 
                      src="https://www.youtube.com/embed/${videoRef?.link || ''}"
                      style="border:none;" allowfullscreen></iframe>
                  </div>`
                    : ""
                }
            </div>
          </div>
  `;
}
