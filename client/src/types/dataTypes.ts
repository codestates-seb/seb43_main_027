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
};
export type PageInfoType = {
  page: number;
  size: number;
  totalSize: number;
  totalPage: number;
};

export type CategoryGameType = {
  gameId: number;
  gameName: string;
  downloadUrl: string;
  mainImgUrl: string;
  categories: {
    categoryId: number;
    categoryName: string;
  }[];
  followerCount: number;
  createdAt: string;
};
export type PostType = {
  postTag?: string;
  title?: string;
  content?: string;
};
