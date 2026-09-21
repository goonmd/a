/* ============================================================
   shared.js
   피드 페이지(index.html)와 프로필 페이지(profile.html)가
   공통으로 사용하는 함수 모음입니다.
   ============================================================ */

/* ---------- 이미지 / 이미지 없을 때 placeholder ---------- */
function mediaSlot(src, label, round) {
  const cls = round ? "ph-box round" : "ph-box";
  const safeLabel = label || src;
  return (
    '<div class="media-slot" style="position:relative;width:100%;height:100%;">' +
      '<img src="' + src + '" alt="" ' +
      'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" ' +
      'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' + (round ? "border-radius:50%;" : "") + '">' +
      '<div class="' + cls + '" style="display:none;position:absolute;inset:0;">' +
        ICONS.image +
        '<span>' + safeLabel + '</span>' +
      '</div>' +
    '</div>'
  );
}
function avatarSlot(user, sizeLabel) {
  return mediaSlot(user.avatar, (sizeLabel || user.username) + " 사진", true);
}

/* ---------- 좋아요 / 저장 표시 갱신 ---------- */
function refreshLikeUI(postId) {
  const post = POSTS.find(function (p) { return p.id === postId; });
  const liked = isLiked(postId);
  const count = getLikeCount(post);
  document.querySelectorAll('[data-like-btn="' + postId + '"]').forEach(function (btn) {
    btn.innerHTML = liked ? ICONS.heartFilled : ICONS.heartOutline;
    btn.classList.toggle("liked", liked);
  });
  document.querySelectorAll('[data-like-count="' + postId + '"]').forEach(function (el) {
    el.textContent = "좋아요 " + count.toLocaleString() + "개";
  });
}
function refreshSaveUI(postId) {
  const saved = isSaved(postId);
  document.querySelectorAll('[data-save-btn="' + postId + '"]').forEach(function (btn) {
    btn.innerHTML = saved ? ICONS.bookmarkFilled : ICONS.bookmarkOutline;
    btn.classList.toggle("saved", saved);
  });
}

function doToggleLike(postId, burstEl) {
  toggleLike(postId);
  refreshLikeUI(postId);
  if (isLiked(postId) && burstEl) {
    burstEl.classList.remove("animate");
    void burstEl.offsetWidth;
    burstEl.classList.add("animate");
  }
}

/* ---------- 댓글 렌더링 ---------- */
function findUserByUsername(username) {
  return USERS.find(function (u) { return u.username === username; });
}
function commentLineHTML(c) {
  const u = findUserByUsername(c.username);
  const avatar = u ? avatarSlot(u, u.username) : mediaSlot("", "avatar.jpg", true);
  const profileHref = u ? "profile.html?u=" + u.id : "#";
  return (
    '<div class="comment-line">' +
      '<a href="' + profileHref + '" class="c-avatar">' + avatar + '</a>' +
      '<div class="c-body">' +
        '<div><a href="' + profileHref + '"><b>' + c.username + '</b></a>' + escapeHtml(c.text) + '</div>' +
        '<div class="c-time">' + (c.time || "") + '</div>' +
      '</div>' +
    '</div>'
  );
}
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function refreshCommentsUI(postId) {
  const post = POSTS.find(function (p) { return p.id === postId; });
  const all = getAllComments(post);

  // 피드 카드 내 미리보기 (최근 댓글 최대 2개)
  document.querySelectorAll('[data-inline-comments="' + postId + '"]').forEach(function (el) {
    const preview = all.slice(-2);
    el.innerHTML = preview.map(commentLineHTML).join("");
  });
  document.querySelectorAll('[data-view-all-comments="' + postId + '"]').forEach(function (el) {
    if (all.length > 2) {
      el.style.display = "block";
      el.textContent = "댓글 " + all.length + "개 모두 보기";
    } else {
      el.style.display = "none";
    }
  });

  // 모달 내 전체 댓글
  document.querySelectorAll('[data-modal-comments="' + postId + '"]').forEach(function (el) {
    el.innerHTML = all.length
      ? all.map(commentLineHTML).join("")
      : '<p style="color:#8e8e8e;font-size:14px;">아직 댓글이 없습니다.</p>';
  });
}

function submitComment(postId, text) {
  if (!text.trim()) return;
  const me = getUserById(ME_ID);
  addComment(postId, me.username, text.trim());
  refreshCommentsUI(postId);
}

/* ---------- 좋아요 버튼 / 더블탭 / 댓글폼 / 저장버튼 이벤트 위임 ---------- */
function initInteractionDelegation() {
  document.addEventListener("click", function (e) {
    const likeBtn = e.target.closest("[data-like-btn]");
    if (likeBtn) {
      const postId = likeBtn.getAttribute("data-like-btn");
      const card = likeBtn.closest(".post, .post-modal");
      const burst = card ? card.querySelector('[data-heart-burst="' + postId + '"]') : null;
      doToggleLike(postId, burst);
      return;
    }
    const saveBtn = e.target.closest("[data-save-btn]");
    if (saveBtn) {
      toggleSaved(saveBtn.getAttribute("data-save-btn"));
      refreshSaveUI(saveBtn.getAttribute("data-save-btn"));
      return;
    }
    const viewAll = e.target.closest("[data-view-all-comments]");
    if (viewAll) {
      openPostModal(viewAll.getAttribute("data-view-all-comments"));
      return;
    }
    const dblTap = e.target.closest("[data-dbltap-like]");
    if (dblTap) return; // handled by dblclick listener below
    const focusComment = e.target.closest("[data-focus-comment]");
    if (focusComment) {
      const pid = focusComment.getAttribute("data-focus-comment");
      const input = document.querySelector('[data-comment-input="' + pid + '"]');
      if (input) input.focus();
      return;
    }
    const followBtn = e.target.closest("[data-follow-btn]");
    if (followBtn) {
      const uid = followBtn.getAttribute("data-follow-btn");
      const following = toggleFollow(uid);
      document.querySelectorAll('[data-follow-btn="' + uid + '"]').forEach(function (b) {
        b.textContent = following ? "팔로잉" : "팔로우";
        b.classList.toggle("following", following);
      });
      return;
    }
    const modalCloseBg = e.target.closest("[data-close-modal-bg]");
    if (modalCloseBg && e.target === modalCloseBg) {
      closePostModal();
      return;
    }
    const closeModalBtn = e.target.closest("[data-close-modal]");
    if (closeModalBtn) {
      closePostModal();
      return;
    }
    const gridItem = e.target.closest("[data-open-post]");
    if (gridItem) {
      openPostModal(gridItem.getAttribute("data-open-post"));
      return;
    }
  });

  document.addEventListener("dblclick", function (e) {
    const zone = e.target.closest("[data-dbltap-like]");
    if (!zone) return;
    const postId = zone.getAttribute("data-dbltap-like");
    setLiked(postId, true);
    refreshLikeUI(postId);
    const burst = zone.querySelector('[data-heart-burst="' + postId + '"]');
    if (burst) {
      burst.classList.remove("animate");
      void burst.offsetWidth;
      burst.classList.add("animate");
    }
  });

  document.addEventListener("submit", function (e) {
    const form = e.target.closest("[data-comment-form]");
    if (!form) return;
    e.preventDefault();
    const postId = form.getAttribute("data-comment-form");
    const input = form.querySelector("input");
    submitComment(postId, input.value);
    input.value = "";
    form.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
  });

  document.addEventListener("input", function (e) {
    const form = e.target.closest("[data-comment-form]");
    if (!form) return;
    const btn = form.querySelector("button");
    btn.classList.toggle("active", e.target.value.trim().length > 0);
  });
}

/* ============================================================
   게시물 상세 모달
   ============================================================ */
function postModalHTML(post) {
  const user = getUserById(post.userId);
  return (
    '<button class="modal-close-btn" data-close-modal aria-label="닫기">' + ICONS.close + '</button>' +
    '<div class="modal-overlay open" data-close-modal-bg id="post-modal-overlay">' +
      '<div class="post-modal">' +
        '<div class="post-modal-media" data-dbltap-like="' + post.id + '" style="position:relative;">' +
          mediaSlot(post.image, post.image.split("/").pop(), false) +
          '<div class="heart-burst" data-heart-burst="' + post.id + '">' + ICONS.heartBig + '</div>' +
        '</div>' +
        '<div class="post-modal-side">' +
          '<div class="post-header">' +
            '<div class="post-header-left">' +
              '<a href="profile.html?u=' + user.id + '" class="post-avatar">' + avatarSlot(user) + '</a>' +
              '<div class="post-user-meta">' +
                '<a href="profile.html?u=' + user.id + '" class="post-username">' + user.username +
                  (user.verified ? ' <span class="verified-badge">' + ICONS.verified + '</span>' : '') +
                '</a>' +
              '</div>' +
            '</div>' +
            '<button class="more-btn">' + ICONS.more + '</button>' +
          '</div>' +
          '<div class="post-modal-comments">' +
            '<div class="comment-line">' +
              '<a href="profile.html?u=' + user.id + '" class="c-avatar">' + avatarSlot(user) + '</a>' +
              '<div class="c-body"><div><a href="profile.html?u=' + user.id + '"><b>' + user.username + '</b></a>' + escapeHtml(post.caption) + '</div>' +
              '<div class="c-time">' + post.timeAgo + ' 전</div></div>' +
            '</div>' +
            '<div data-modal-comments="' + post.id + '"></div>' +
          '</div>' +
          '<div class="post-actions">' +
            '<div class="post-actions-left">' +
              '<button class="action-btn" data-like-btn="' + post.id + '">' + ICONS.heartOutline + '</button>' +
              '<button class="action-btn" onclick="document.getElementById(\'modal-comment-input\').focus()">' + ICONS.comment + '</button>' +
              '<button class="action-btn">' + ICONS.share + '</button>' +
            '</div>' +
            '<button class="action-btn" data-save-btn="' + post.id + '">' + ICONS.bookmarkOutline + '</button>' +
          '</div>' +
          '<div class="post-likes" data-like-count="' + post.id + '"></div>' +
          '<div class="post-time">' + post.timeAgo + ' 전</div>' +
          '<form class="post-add-comment" data-comment-form="' + post.id + '">' +
            '<input id="modal-comment-input" type="text" placeholder="댓글 달기..." autocomplete="off">' +
            '<button type="submit">게시</button>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

let _modalRoot = null;
function openPostModal(postId) {
  const post = POSTS.find(function (p) { return p.id === postId; });
  if (!post) return;
  if (!_modalRoot) {
    _modalRoot = document.createElement("div");
    _modalRoot.id = "post-modal-root";
    document.body.appendChild(_modalRoot);
  }
  _modalRoot.innerHTML = postModalHTML(post);
  refreshLikeUI(postId);
  refreshSaveUI(postId);
  refreshCommentsUI(postId);
  document.body.style.overflow = "hidden";
}
function closePostModal() {
  if (_modalRoot) _modalRoot.innerHTML = "";
  document.body.style.overflow = "";
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closePostModal();
});

/* ============================================================
   스토리 뷰어
   ============================================================ */
const STORY_DURATION = 4000;
let storyState = {
  users: [],      // 스토리를 가진 유저 목록
  userIndex: 0,
  itemIndex: 0,
  timer: null,
  startedAt: 0,
  remaining: STORY_DURATION
};

function getStoryUsers() {
  return USERS.filter(function (u) { return u.hasStory && u.stories && u.stories.length; });
}

function openStoryViewer(userId) {
  storyState.users = getStoryUsers();
  const idx = storyState.users.findIndex(function (u) { return u.id === userId; });
  storyState.userIndex = idx >= 0 ? idx : 0;
  storyState.itemIndex = 0;
  renderStoryViewerShell();
  playCurrentStory();
  document.body.style.overflow = "hidden";
}

function closeStoryViewer() {
  clearTimeout(storyState.timer);
  const overlay = document.getElementById("story-viewer-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function renderStoryViewerShell() {
  let overlay = document.getElementById("story-viewer-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "story-viewer-overlay";
    overlay.className = "story-viewer-overlay";
    document.body.appendChild(overlay);
  }
  overlay.innerHTML =
    '<div class="story-viewer">' +
      '<div class="story-progress-row" id="story-progress-row"></div>' +
      '<div class="story-header" id="story-header"></div>' +
      '<button class="story-close-btn" onclick="closeStoryViewer()" style="position:absolute;top:20px;right:12px;z-index:12;">' + ICONS.close + '</button>' +
      '<div class="story-media-wrap" id="story-media-wrap"></div>' +
      '<button class="story-tap-zone left" onclick="prevStory()" aria-label="이전"></button>' +
      '<button class="story-tap-zone right" onclick="nextStory()" aria-label="다음" style="width:auto;right:0;left:33%;"></button>' +
    '</div>';
  overlay.classList.add("open");
}

function playCurrentStory() {
  clearTimeout(storyState.timer);
  const user = storyState.users[storyState.userIndex];
  if (!user) { closeStoryViewer(); return; }
  markStorySeen(user.id);
  const item = user.stories[storyState.itemIndex];

  // progress bars
  const row = document.getElementById("story-progress-row");
  row.innerHTML = user.stories.map(function (_, i) {
    return '<div class="story-progress-bar"><div class="story-progress-fill" id="story-fill-' + i + '"></div></div>';
  }).join("");
  for (let i = 0; i < storyState.itemIndex; i++) {
    document.getElementById("story-fill-" + i).classList.add("filled");
  }

  // header
  document.getElementById("story-header").innerHTML =
    '<div class="story-header-left">' +
      '<div class="story-header-avatar">' + avatarSlot(user) + '</div>' +
      '<span class="story-header-name">' + user.username + '</span>' +
      '<span class="story-header-time">' + (storyState.itemIndex + 1) + '/' + user.stories.length + '</span>' +
    '</div>';

  // media
  document.getElementById("story-media-wrap").innerHTML = mediaSlot(item.image, item.image.split("/").pop(), false);

  // animate current fill
  const fill = document.getElementById("story-fill-" + storyState.itemIndex);
  fill.style.transition = "none";
  fill.style.width = "0%";
  void fill.offsetWidth;
  fill.style.transition = "width " + STORY_DURATION + "ms linear";
  requestAnimationFrame(function () { fill.style.width = "100%"; });

  storyState.timer = setTimeout(nextStory, STORY_DURATION);
}

function nextStory() {
  const user = storyState.users[storyState.userIndex];
  if (storyState.itemIndex < user.stories.length - 1) {
    storyState.itemIndex++;
    playCurrentStory();
  } else if (storyState.userIndex < storyState.users.length - 1) {
    storyState.userIndex++;
    storyState.itemIndex = 0;
    playCurrentStory();
  } else {
    closeStoryViewer();
  }
}
function prevStory() {
  if (storyState.itemIndex > 0) {
    storyState.itemIndex--;
    playCurrentStory();
  } else if (storyState.userIndex > 0) {
    storyState.userIndex--;
    storyState.itemIndex = storyState.users[storyState.userIndex].stories.length - 1;
    playCurrentStory();
  } else {
    playCurrentStory();
  }
}

document.addEventListener("keydown", function (e) {
  const overlay = document.getElementById("story-viewer-overlay");
  if (!overlay || !overlay.classList.contains("open")) return;
  if (e.key === "Escape") closeStoryViewer();
  if (e.key === "ArrowRight") nextStory();
  if (e.key === "ArrowLeft") prevStory();
});

document.addEventListener("DOMContentLoaded", initInteractionDelegation);
