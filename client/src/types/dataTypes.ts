import { ReactElement } from 'react';

type UserNavType = ({ data }: { data: User }) => JSX.Element;
type PostItemType = ({ data }: { data: GamePagePostType }) => JSX.Element;
type GameItemType = ({ data }: { data: GameType }) => JSX.Element;
export type ContentElementType = UserNavType | PostItemType | GameItemType;

export type NavItemType = {
  type: 'user' | 'bookmark' | 'games' | 'messages' | 'myGames';
  element: ReactElement;
  contentElement: ContentElementType;
};

export type User = {
  memberId: number;
  email: string;
  userName: string;
  memberStatus: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Signup = {
  username: string;
  email: string;
  password: string;
};

export type SignupValidity = {
  usernamevalid: boolean;
  emailvalid: boolean;
  passwordvalid: boolean;
  emailconfirmed: boolean;
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
  description?: string;
  memberId?: number;
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
  fileUrlList?: string[];
};

export type PathUrlType = {
  [key: string]: string;
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
  createdAt?: string;
  username?: string;
  isPostIdIncluded?: boolean | undefined;
};

export type PostMemberType = {
  email: string;
  followerCount: number;
  followingCount: number;
  imageUrl: string;
  memberId: number;
  userName: string;
};
export type ReactionType = {
  reactionId: number;
  postId: number;
  memberId: number;
  reactionStatus: string;
};
export type BookmarkType = {
  bookmarkId: number;
  postId: number;
  memberId: number;
  bookmarkStatus: string;
};
export type PostDataType = {
  commentCount: number;
  comments: CommentType[];
  content: string;
  createdAt: string;
  fileUrlList: [];
  gameId: number;
  gameName: string;
  likeCount: number;
  unlikeCount: number;
  member: PostMemberType;
  postId: number;
  postTag: string;
  reaction: ReactionType | null;
  title: string;
  updatedAt: string;
  views: number;
  bookmark: BookmarkType | null;
};

export type CommentType = {
  commentId: number;
  commentStatus: string;
  parentCommentId: number;
  member: PostMemberType;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies: CommentType[];
};
