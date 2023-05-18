import { type PostOptionType, type OptionMapping } from '../types/dataTypes';

/*
RECRUITMENT("모집"),
BUG("버그"),
WALKTHROUGH("공략"),
CHIT_CHAT("수다"),
INFORMATION("정보"),
FAN_ART("팬아트"),
QUESTION("질문"),
SHOWING_OFF("자랑하기"),
REVIEW("리뷰"),
ETC("기타");
*/

export const postOptionTags: PostOptionType[] = [
  { value: '전체', label: '전체' },
  { value: '모집', label: '모집' },
  { value: '버그', label: '버그' },
  { value: '공략', label: '공략' },
  { value: '수다', label: '수다' },
  { value: '정보', label: '정보' },
  { value: '팬아트', label: '팬아트' },
  { value: '질문', label: '질문' },
  { value: '자랑하기', label: '자랑하기' },
  { value: '리뷰', label: '리뷰' },
  { value: '기타', label: '기타' },
];

export const optionMapping: OptionMapping = {
  전체: 'ALL',
  모집: 'RECRUITMENT',
  버그: 'BUG',
  공략: 'WALKTHROUGH',
  수다: 'CHIT_CHAT',
  정보: 'INFORMATION',
  팬아트: 'FAN_ART',
  질문: 'QUESTION',
  자랑하기: 'SHOWING_OFF',
  리뷰: 'REVIEW',
  기타: 'ETC',
};

export default postOptionTags;