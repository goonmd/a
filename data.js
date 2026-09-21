/* ============================================================
   data.js
   ------------------------------------------------------------
   여기가 이 사이트의 '내용물'을 채우는 파일입니다.
   - 이미지: images 폴더 안에 같은 파일명으로 사진을 넣기만 하면
     자동으로 적용됩니다. (경로를 바꿔도 됩니다)
   - 텍스트: username, name, bio, caption 등 원하는 문구로 바꾸세요.
   - 이미지가 아직 없으면 회색 박스에 "필요한 파일명"이 표시됩니다.
   ============================================================ */

const USERS = [
  {
    id: "user1",
    username: "username_1",
    name: "이름 1",
    avatar: "images/avatars/user1.jpg",
    bio: "여기에 소개글을 입력하세요.\n둘째 줄도 가능합니다.",
    website: "",
    followers: 128,
    following: 180,
    verified: false,
    hasStory: true,
    storySeenDefault: false,
    stories: [
      { image: "images/stories/user1-1.jpg", caption: "" },
      { image: "images/stories/user1-2.jpg", caption: "" }
    ]
  },
  {
    id: "user2",
    username: "username_2",
    name: "이름 2",
    avatar: "images/avatars/user2.jpg",
    bio: "여기에 소개글을 입력하세요.",
    website: "",
    followers: 954,
    following: 302,
    verified: true,
    hasStory: true,
    storySeenDefault: false,
    stories: [
      { image: "images/stories/user2-1.jpg", caption: "" }
    ]
  },
  {
    id: "user3",
    username: "username_3",
    name: "이름 3",
    avatar: "images/avatars/user3.jpg",
    bio: "여기에 소개글을 입력하세요.",
    website: "",
    followers: 2431,
    following: 87,
    verified: false,
    hasStory: true,
    storySeenDefault: false,
    stories: [
      { image: "images/stories/user3-1.jpg", caption: "" },
      { image: "images/stories/user3-2.jpg", caption: "" },
      { image: "images/stories/user3-3.jpg", caption: "" }
    ]
  },
  {
    id: "user4",
    username: "username_4",
    name: "이름 4",
    avatar: "images/avatars/user4.jpg",
    bio: "여기에 소개글을 입력하세요.",
    website: "",
    followers: 76,
    following: 210,
    verified: false,
    hasStory: false,
    storySeenDefault: false,
    stories: []
  },
  {
    id: "user5",
    username: "username_5",
    name: "이름 5",
    avatar: "images/avatars/user5.jpg",
    bio: "여기에 소개글을 입력하세요.",
    website: "",
    followers: 5310,
    following: 12,
    verified: true,
    hasStory: true,
    storySeenDefault: false,
    stories: [
      { image: "images/stories/user5-1.jpg", caption: "" }
    ]
  }
];

/* 현재 로그인한 사람처럼 다룰 계정 (헤더/하단 탭의 '프로필' 아이콘이 연결되는 곳) */
const ME_ID = "user1";

/* ------------------------------------------------------------
   게시물 목록
   - userId 는 위 USERS 의 id 와 일치해야 합니다.
   - image: 게시물 사진 경로
   - caption: 게시물 본문
   - likes: 초기 좋아요 수 (사용자가 누르면 +1 되며 localStorage 에 저장됩니다)
   - comments: 미리 채워둘 댓글 (없으면 빈 배열 [])
   ------------------------------------------------------------ */
const POSTS = [
  {
    id: "post1",
    userId: "user1",
    image: "images/posts/user1-1.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 214,
    timeAgo: "1일",
    comments: [
      { username: "username_2", text: "댓글 내용을 입력하세요." },
      { username: "username_3", text: "댓글 내용을 입력하세요." }
    ]
  },
  {
    id: "post2",
    userId: "user2",
    image: "images/posts/user2-1.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 1042,
    timeAgo: "3시간",
    comments: [
      { username: "username_4", text: "댓글 내용을 입력하세요." }
    ]
  },
  {
    id: "post3",
    userId: "user3",
    image: "images/posts/user3-1.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 88,
    timeAgo: "5시간",
    comments: []
  },
  {
    id: "post4",
    userId: "user4",
    image: "images/posts/user4-1.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 12,
    timeAgo: "1일",
    comments: []
  },
  {
    id: "post5",
    userId: "user5",
    image: "images/posts/user5-1.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 3021,
    timeAgo: "2일",
    comments: [
      { username: "username_1", text: "댓글 내용을 입력하세요." },
      { username: "username_2", text: "댓글 내용을 입력하세요." },
      { username: "username_3", text: "댓글 내용을 입력하세요." }
    ]
  },
  {
    id: "post6",
    userId: "user1",
    image: "images/posts/user1-2.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 76,
    timeAgo: "2일",
    comments: []
  },
  {
    id: "post7",
    userId: "user2",
    image: "images/posts/user2-2.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 512,
    timeAgo: "3일",
    comments: []
  },
  {
    id: "post8",
    userId: "user3",
    image: "images/posts/user3-2.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 233,
    timeAgo: "4일",
    comments: []
  },
  {
    id: "post9",
    userId: "user5",
    image: "images/posts/user5-2.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 954,
    timeAgo: "5일",
    comments: []
  },
  {
    id: "post10",
    userId: "user4",
    image: "images/posts/user4-2.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 41,
    timeAgo: "6일",
    comments: []
  },
  {
    id: "post11",
    userId: "user1",
    image: "images/posts/user1-3.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 190,
    timeAgo: "1주",
    comments: []
  },
  {
    id: "post12",
    userId: "user2",
    image: "images/posts/user2-3.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 703,
    timeAgo: "1주",
    comments: []
  },
  {
    id: "post13",
    userId: "user3",
    image: "images/posts/user3-3.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 65,
    timeAgo: "1주",
    comments: []
  },
  {
    id: "post14",
    userId: "user5",
    image: "images/posts/user5-3.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 4210,
    timeAgo: "2주",
    comments: []
  },
  {
    id: "post15",
    userId: "user4",
    image: "images/posts/user4-3.jpg",
    location: "",
    caption: "여기에 게시물 내용을 입력하세요.",
    likes: 8,
    timeAgo: "2주",
    comments: []
  }
];

function getUserById(id) {
  return USERS.find(function (u) { return u.id === id; });
}

function getPostsByUser(id) {
  return POSTS.filter(function (p) { return p.userId === id; });
}
