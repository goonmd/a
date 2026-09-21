/* ============================================================
   main.js — index.html (피드) 전용
   ============================================================ */

function renderHeader() {
  const me = getUserById(ME_ID);
  document.getElementById("top-header").innerHTML =
    '<div class="top-header-inner">' +
      '<a href="index.html" class="logo">Instagram</a>' +
      '<div class="header-search"><input type="text" placeholder="검색"></div>' +
      '<div class="header-icons">' +
        '<a class="icon-btn" href="index.html" title="홈">' + ICONS.home + '</a>' +
        '<button class="icon-btn" title="메시지">' + ICONS.message + '</button>' +
        '<button class="icon-btn" title="만들기">' + ICONS.plusSquare + '</button>' +
        '<button class="icon-btn" title="탐색 탭">' + ICONS.compass + '</button>' +
        '<button class="icon-btn" title="릴스">' + ICONS.reel + '</button>' +
        '<a class="header-avatar" href="profile.html?u=' + me.id + '" title="프로필">' + avatarSlot(me) + '</a>' +
      '</div>' +
    '</div>';

  document.getElementById("bottom-tab").innerHTML =
    '<a href="index.html">' + ICONS.home + '</a>' +
    '<button>' + ICONS.search + '</button>' +
    '<button>' + ICONS.plusSquare + '</button>' +
    '<button>' + ICONS.reel + '</button>' +
    '<a href="profile.html?u=' + me.id + '" class="tab-avatar">' + avatarSlot(me) + '</a>';
}

function renderStoriesBar() {
  const storyUsers = getStoryUsers();
  const html = storyUsers.map(function (u) {
    const seen = isStorySeen(u.id);
    return (
      '<button class="story-item" onclick="openStoryViewer(\'' + u.id + '\')">' +
        '<div class="story-ring' + (seen ? " seen" : "") + '">' +
          '<div class="story-ring-inner"><div class="story-avatar">' + avatarSlot(u) + '</div></div>' +
        '</div>' +
        '<span class="story-username">' + u.username + '</span>' +
      '</button>'
    );
  }).join("");
  document.getElementById("stories-bar").innerHTML = html;
}

function postCardHTML(post) {
  const user = getUserById(post.userId);
  return (
    '<article class="post" id="post-' + post.id + '">' +
      '<div class="post-header">' +
        '<div class="post-header-left">' +
          '<a href="profile.html?u=' + user.id + '" class="post-avatar">' + avatarSlot(user) + '</a>' +
          '<div class="post-user-meta">' +
            '<a href="profile.html?u=' + user.id + '" class="post-username">' + user.username +
              (user.verified ? ' <span class="verified-badge">' + ICONS.verified + '</span>' : '') +
            '</a>' +
            (post.location ? '<span class="post-location">' + post.location + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<button class="more-btn">' + ICONS.more + '</button>' +
      '</div>' +

      '<div class="post-media" data-dbltap-like="' + post.id + '">' +
        mediaSlot(post.image, post.image.split("/").pop(), false) +
        '<div class="heart-burst" data-heart-burst="' + post.id + '">' + ICONS.heartBig + '</div>' +
      '</div>' +

      '<div class="post-actions">' +
        '<div class="post-actions-left">' +
          '<button class="action-btn" data-like-btn="' + post.id + '">' + ICONS.heartOutline + '</button>' +
          '<button class="action-btn" data-focus-comment="' + post.id + '">' + ICONS.comment + '</button>' +
          '<button class="action-btn">' + ICONS.share + '</button>' +
        '</div>' +
        '<button class="action-btn" data-save-btn="' + post.id + '">' + ICONS.bookmarkOutline + '</button>' +
      '</div>' +

      '<div class="post-likes" data-like-count="' + post.id + '"></div>' +

      '<div class="post-caption">' +
        '<a href="profile.html?u=' + user.id + '" class="post-username">' + user.username + '</a> ' +
        '<span>' + escapeHtml(post.caption) + '</span>' +
      '</div>' +

      '<button class="post-view-comments" data-view-all-comments="' + post.id + '"></button>' +
      '<div class="post-comments-inline" data-inline-comments="' + post.id + '"></div>' +

      '<div class="post-time">' + post.timeAgo + ' 전</div>' +

      '<form class="post-add-comment" data-comment-form="' + post.id + '">' +
        '<input type="text" data-comment-input="' + post.id + '" placeholder="댓글 달기..." autocomplete="off">' +
        '<button type="submit">게시</button>' +
      '</form>' +
    '</article>'
  );
}

function renderFeed() {
  const feedEl = document.getElementById("feed");
  feedEl.innerHTML = POSTS.map(postCardHTML).join("");
  POSTS.forEach(function (post) {
    refreshLikeUI(post.id);
    refreshSaveUI(post.id);
    refreshCommentsUI(post.id);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderStoriesBar();
  renderFeed();
});
