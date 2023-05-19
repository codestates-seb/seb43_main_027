import { ReactElement } from 'react';

export type NavItemType = {
  type: 'user' | 'bookmark' | 'games';
  element: ReactElement;
  contentElement: (props: any) => JSX.Element;
};

export type User = {
  memberId: number;
  email: string;
  username: string;
  memberStatus: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Signup = {
  username: string;
  email: string;
  password: string;
}

export type CategoryType = {
  categoryId: number;
  categoryName: string;
  categoryIcon?: ReactElement;
};

export type GameType = {
  gameId: number;
  gameName: string;
  downloadUrl: string;
  mainImgUrl: string;
  followerCount: number;
  categories: CategoryType[];
  createdAt?: string;
};

export type PageInfoType = {
  page: number;
  size: number;
  totalSize: number;
  totalPage: number;
};

export type PostType = {
  postTag: string;
  title: string;
  content: string;
};

export type PathUrlType = {
  HOME: string;
  CATEGORY: string;
  GAME: string;
  POSTING: string;
  LOGIN: string;
  SIGNUP: string;
  REGISTER: string;
  EDIT: string;
};

export type PostOptionType = {
  value: string;
  label: string;
};

export type OptionMapping = {
  [key: string]: string;
};

export type GamePagePostType = {
  postId: number;
  gameId?: number;
  userName: string;
  title: string;
  content?: string;
  postTag: string;
  views: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
};
