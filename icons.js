/* ============================================================
   icons.js — 인라인 SVG 아이콘 모음
   ============================================================ */
const ICONS = {
  heartOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M16.5 3.5c-1.74 0-3.41 0.81-4.5 2.09C10.91 4.31 9.24 3.5 7.5 3.5 4.42 3.5 2 5.92 2 9c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.81C18.6 15.86 22 12.78 22 9c0-3.08-2.42-5.5-5.5-5.5z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" stroke-width="1.7"><path d="M16.5 3.5c-1.74 0-3.41 0.81-4.5 2.09C10.91 4.31 9.24 3.5 7.5 3.5 4.42 3.5 2 5.92 2 9c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.81C18.6 15.86 22 12.78 22 9c0-3.08-2.42-5.5-5.5-5.5z"/></svg>',
  heartBig: '<svg viewBox="0 0 24 24" fill="#fff" stroke="#fff"><path d="M16.5 3.5c-1.74 0-3.41 0.81-4.5 2.09C10.91 4.31 9.24 3.5 7.5 3.5 4.42 3.5 2 5.92 2 9c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.81C18.6 15.86 22 12.78 22 9c0-3.08-2.42-5.5-5.5-5.5z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M20.5 12.2c0 4.6-4.03 8.3-9 8.3-1.06 0-2.08-.17-3.02-.48L3.5 21.2l1.3-4.02A8.14 8.14 0 013 12.2C3 7.6 7.03 3.9 12 3.9s8.5 3.7 8.5 8.3z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><line x1="22" y1="3" x2="9.5" y2="14"/><polygon points="22 3 15 21 9.5 14 3 8 22 3"/></svg>',
  bookmarkOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"/></svg>',
  bookmarkFilled: '<svg viewBox="0 0 24 24" fill="#262626" stroke="#262626" stroke-width="1.7"><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M3 11.5L12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 001 1H9a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2.5a1 1 0 001-1v-9"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.3" y2="16.3"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><circle cx="12" cy="12" r="9.5"/><polygon points="15 9 13 13 9 15 11 11 15 9"/></svg>',
  reel: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><rect x="3" y="3.5" width="18" height="17" rx="4"/><path d="M3 8.5h18"/><path d="M8 3.5L11 8.5"/><path d="M15 3.5L18 8.5"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M12 3.5c-5 0-9 3.5-9 8 0 2.4 1.15 4.5 3 6l-.7 3.5 3.8-1.7c.9.25 1.9.4 2.9.4 5 0 9-3.5 9-8s-4-8.2-9-8.2z"/></svg>',
  plusSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="#262626"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="15 5 8 12 15 19"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="9 5 16 12 9 19"/></svg>',
  verified: '<svg viewBox="0 0 24 24"><path fill="#0095f6" d="M12 2l2.4 1.4 2.7-.4 1.4 2.4 2.4 1.4-.4 2.7.4 2.7-2.4 1.4-1.4 2.4-2.7-.4L12 22l-2.4-1.4-2.7.4-1.4-2.4-2.4-1.4.4-2.7-.4-2.7 2.4-1.4 1.4-2.4 2.7.4z"/><path fill="#fff" d="M9.8 12.3l1.6 1.6 3.2-3.6" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  gridTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  tagTab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>'
};
