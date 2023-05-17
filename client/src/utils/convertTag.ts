type TagMap = {
  [key: string]: string;
};

const tagMap: TagMap = {
  RECRUITMENT: '모집',
  BUG: '버그',
  WALKTHROUGH: '공략',
  CHIT_CHAT: '수다',
  INFORMATION: '정보',
  FAN_ART: '팬아트',
  QUESTION: '질문',
  SHOWING_OFF: '자랑하기',
  REVIEW: '리뷰',
  ETC: '기타'
};

const convertTag = {
  asKR(tag: string) {
    return tagMap[tag];
  },
  asEN(tag: string) {
    for (const [k, v] of Object.entries(tagMap)) {
      if (v === tag) return k;
    }
    return '';
  }
};

export default convertTag;
