import { ReactElement } from 'react';

export type NavItemType = {
  type: 'user' | 'bookmark' | 'games';
  element: ReactElement;
  contentElement: () => JSX.Element;
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
};

export type GameType = {
  gameId: number;
  gameName: string;
  downloadUrl: string;
  mainImgUrl: string;
  categories: CategoryType[];
};
export type PageInfoType = {
  page: number;
  size: number;
  totalSize: number;
  totalPage: number;
};
