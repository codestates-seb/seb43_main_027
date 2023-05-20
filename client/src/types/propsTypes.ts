import { type CategoryType } from './dataTypes';

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

export type TabSelectType = {
  isSelectTab: string;
};

export type GameItemPropsType = {
  gameId: number;
  gameName: string;
  followerCount: number;
  categories: CategoryType[];
  mainImgUrl: string;
}

export type StyledTagPropsType = {
  styleId: number;
};

export type PostListProps = {
  isSelectTab: string;
  isSelectTag: string;
  isMappingTag: string;
};

export type StyledUserImgType = {
  getUserImg : string;
};