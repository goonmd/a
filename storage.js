/* ============================================================
   storage.js
   브라우저 localStorage 를 이용해 "좋아요 / 댓글 / 팔로우 / 스토리 열람"
   상태를 저장합니다. 새로고침해도 유지됩니다.
   ============================================================ */

const LS_KEYS = {
  likes: "ig_clone_likes",       // { postId: true/false }
  comments: "ig_clone_comments", // { postId: [ {username,text,time} ] }
  follows: "ig_clone_follows",   // { userId: true/false }
  storySeen: "ig_clone_story_seen" // { userId: true }
};

function _read(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (e) {
    return {};
  }
}
function _write(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/* ---------------- 좋아요 ---------------- */
function isLiked(postId) {
  const likes = _read(LS_KEYS.likes);
  return !!likes[postId];
}
function toggleLike(postId) {
  const likes = _read(LS_KEYS.likes);
  likes[postId] = !likes[postId];
  _write(LS_KEYS.likes, likes);
  return likes[postId];
}
function setLiked(postId, value) {
  const likes = _read(LS_KEYS.likes);
  likes[postId] = value;
  _write(LS_KEYS.likes, likes);
}
function getLikeCount(post) {
  const base = post.likes;
  return isLiked(post.id) ? base + 1 : base;
}

/* ---------------- 댓글 ---------------- */
function getExtraComments(postId) {
  const all = _read(LS_KEYS.comments);
  return all[postId] || [];
}
function addComment(postId, username, text) {
  const all = _read(LS_KEYS.comments);
  if (!all[postId]) all[postId] = [];
  all[postId].push({ username: username, text: text, time: "방금" });
  _write(LS_KEYS.comments, all);
}
function getAllComments(post) {
  return post.comments.concat(getExtraComments(post.id));
}

/* ---------------- 팔로우 ---------------- */
function isFollowing(userId) {
  const f = _read(LS_KEYS.follows);
  return !!f[userId];
}
function toggleFollow(userId) {
  const f = _read(LS_KEYS.follows);
  f[userId] = !f[userId];
  _write(LS_KEYS.follows, f);
  return f[userId];
}

/* ---------------- 저장(북마크) ---------------- */
function isSaved(postId) {
  const s = _read(LS_KEYS.saves || "ig_clone_saves");
  return !!s[postId];
}
function toggleSaved(postId) {
  const key = "ig_clone_saves";
  const s = _read(key);
  s[postId] = !s[postId];
  _write(key, s);
  return s[postId];
}

/* ---------------- 스토리 열람 ---------------- */
function isStorySeen(userId) {
  const s = _read(LS_KEYS.storySeen);
  return !!s[userId];
}
function markStorySeen(userId) {
  const s = _read(LS_KEYS.storySeen);
  s[userId] = true;
  _write(LS_KEYS.storySeen, s);
}
