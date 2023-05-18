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
};

export type PostOptionType = {
  value: string;
  label: string;
};

export type OptionMapping = {
  [key: string]: string;
};

/*
특정게임의 게시글 전체 조회할때 받는 응답데이터의 타입
member에 username은 작성자 이름이라 필요하고,

유저 북마크게시글,
내가쓴글 get데이터에 gameId가 있으면 특정게임내 페이지에서 필터링 가능할듯

export type PostType = {
  postId: number;
  member: {
    username: string;
  };
  title: string;
  views: number;
  postTag: string;
  commentCount: number;
  likeCount: number;
  createdAt?: string;
  gameId?: number;
  username?: string;
};
*/

export type GamePagePostType = {
  postId: number;
  member?: {
    memberId?: number;
    email?: string;
    username: string;
    imageUrl?: string;
    followerCount?: number;
    followingCount?: number;
  };
  title: string;
  content?: string;
  views: number;
  postTag: string;
  commentCount: number;
  likeCount: number;
  gameId?: number;
  createdAt?: string;
  username?: string;
};