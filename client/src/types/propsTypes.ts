import SwiperInstance from 'swiper';

export type NavStateType = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};
export type MemberType = {
  src: string;
  name: string;
  type: 'Front-End' | 'Back-End';
};

export type SwiperBgType = {
  backgroundImage: string;
};

export type SwiperInfoType = {
  introduceMode: boolean;
  isLastCurrent: boolean;
  currentSlideIndex: number;
};