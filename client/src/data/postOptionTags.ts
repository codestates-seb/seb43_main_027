// 모집, 버그, 공략, 수다, 정보, 팬아트, 질문, 문의(건의), 자랑하기, 후기, 기타

type Option = {
  value: string;
  label: string;
};

const postOptionTags: Option[] = [
  { value: '전체', label: '전체' },
  { value: '모집', label: '모집' },
  { value: '버그', label: '버그' },
  { value: '공략', label: '공략' },
  { value: '수다', label: '수다' },
  { value: '정보', label: '정보' },
  { value: '팬아트', label: '팬아트' },
  { value: '질문', label: '질문' },
  { value: '문의', label: '문의' },
  { value: '자랑', label: '자랑' },
  { value: '후기', label: '후기' },
  { value: '기타', label: '기타' },
];

export default postOptionTags;