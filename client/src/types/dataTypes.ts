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
