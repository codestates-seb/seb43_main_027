import { ReactElement } from 'react';
import { type CategoryType } from './dataTypes';

export type NavStateType = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};
export type MemberType = {
  src: string;
  name: string;
  type: 'Front-End' | 'Back-End';
  icon?: ReactElement;
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
};

export type StyledTagPropsType = {
  styleId: number;
};

export type PostListProps = {
  isSelectTab: string;
  isSelectTag: string;
  isMappingTag: string;
};

export type StyledUserImgType = {
  getUserImg: string;
};

export type UserInfoProps = {
  setIsEditClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserActionProps = {
  setIsEditClick: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFollowClick: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  imageUrl: string;
  userName: string;
};

export type SubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement>;

export type UserProfileType = {
  isUserName: string;
  isUserEmail: string;
  isFollowerCount: number;
  isFollowingCount: number;
};

export type UserItemPropsType = {
  imageUrl: string,
  userName: string,
  followerCount: number,
  followingCount: number,
  memberId: string,
  isFollowingIdIncluded: boolean | undefined,
};

export type UserStyledButtonPropsType = { 
  delectUser?: boolean;
};

