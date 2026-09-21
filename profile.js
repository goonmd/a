/* ============================================================
   profile.js — profile.html 전용
   URL: profile.html?u=user1  (u 파라미터로 어떤 사람의 프로필인지 결정)
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

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("u") || ME_ID;
}

function gridItemHTML(post) {
  return (
    '<button class="profile-grid-item" data-open-post="' + post.id + '">' +
      mediaSlot(post.image, post.image.split("/").pop(), false) +
      '<div class="grid-hover">' +
        '<span>' + ICONS.heartBig.replace('fill="#fff"', 'fill="#fff"') + ' ' + getLikeCount(post) + '</span>' +
        '<span>' + ICONS.comment.replace('stroke="#262626"', 'stroke="#fff"') + ' ' + getAllComments(post).length + '</span>' +
      '</div>' +
    '</button>'
  );
}

function renderProfile() {
  const uid = getUserIdFromUrl();
  const user = getUserById(uid);
  const wrap = document.getElementById("profile-wrap");

  if (!user) {
    wrap.innerHTML = '<div class="empty-state"><h2>사용자를 찾을 수 없습니다</h2></div>';
    return;
  }

  const posts = getPostsByUser(uid);
  const isMe = uid === ME_ID;
  const following = isFollowing(uid);

  document.title = user.username + " • Instagram";

  wrap.innerHTML =
    '<div class="profile-header">' +
      '<div class="profile-avatar-wrap">' + avatarSlot(user) + '</div>' +
      '<div class="profile-info">' +
        '<div class="profile-top-row">' +
          '<span class="profile-username">' + user.username +
            (user.verified ? ' <span class="verified-badge">' + ICONS.verified + '</span>' : '') +
          '</span>' +
          (isMe
            ? '<button class="follow-btn following">프로필 편집</button>'
            : '<button class="follow-btn' + (following ? ' following' : '') + '" data-follow-btn="' + user.id + '">' + (following ? '팔로잉' : '팔로우') + '</button>'
          ) +
        '</div>' +
        '<div class="profile-stats">' +
          '<span><b>' + posts.length + '</b> 게시물</span>' +
          '<span><b>' + (user.followers + (following ? 1 : 0)).toLocaleString() + '</b> 팔로워</span>' +
          '<span><b>' + user.following.toLocaleString() + '</b> 팔로우 중</span>' +
        '</div>' +
        '<div class="profile-name">' + user.name + '</div>' +
        '<div class="profile-bio">' + escapeHtml(user.bio) + '</div>' +
      '</div>' +
    '</div>' +

    '<div class="profile-tabs">' +
      '<button class="profile-tab active">' + ICONS.gridTab + ' 게시물</button>' +
      '<button class="profile-tab">' + ICONS.reel + ' 릴스</button>' +
      '<button class="profile-tab">' + ICONS.tagTab + ' 태그됨</button>' +
    '</div>' +

    (posts.length
      ? '<div class="profile-grid">' + posts.map(gridItemHTML).join("") + '</div>'
      : '<div class="empty-state"><h2>아직 게시물이 없습니다</h2></div>'
    );
}

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderProfile();
});
