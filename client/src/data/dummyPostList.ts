/*
{
post:[
    postId,
    title, 
    tag, 
    createdAt, 
    updatedAt, 
    view, 
    userName, 
    memberStatus, 
    likeCount, 
    commentCount, 
    ...
  ]
}
 */

import { GamePagePostType } from '../types/dataTypes';

export type Post = {
  postId: number;
  title: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  view: number;
  userName: string;
  memberStatus: string;
  likeCount: number;
  commentCount: number;
};

type PostListResponse = {
  post: Post[];
};

export const dummyPostList: PostListResponse = {
  'post': [
    {
      'postId': 1,
      'title': '첫 번째 게시글',
      'tag': '모집',
      'createdAt': '2022-05-09T09:25:00Z',
      'updatedAt': '2022-05-09T09:25:00Z',
      'view': 100,
      'userName': 'user1',
      'memberStatus': '', 
      'likeCount': 20,
      'commentCount': 10
    },
    {
      'postId': 2,
      'title': '두 번째 게시글',
      'tag': '공략',
      'createdAt': '2022-05-10T12:30:00Z',
      'updatedAt': '2022-05-10T12:30:00Z',
      'view': 200,
      'userName': 'user2',
      'memberStatus': '', 
      'likeCount': 10,
      'commentCount': 5
    },
    {
      'postId': 3,
      'title': '세 번째 게시글',
      'tag': '질문',
      'createdAt': '2022-05-11T18:45:00Z',
      'updatedAt': '2022-05-11T18:45:00Z',
      'view': 50,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 5,
      'commentCount': 2
    },
    {
      'postId': 4,
      'title': '네 번째 게시글',
      'tag': '모집',
      'createdAt': '2022-05-11T19:45:00Z',
      'updatedAt': '2022-05-11T19:45:00Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 23,
      'commentCount': 3
    },
    {
      'postId': 5,
      'title': '다섯 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-11T03:10:00Z',
      'updatedAt': '2023-05-11T03:10:00Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 24,
      'commentCount': 4
    },
    {
      'postId': 6,
      'title': '여섯 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-13T10:14:16.244Z',
      'updatedAt': '2023-05-13T10:14:16.244Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 24,
      'commentCount': 4
    },
    {
      'postId': 7,
      'title': '일곱 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-13T10:14:19.700Z',
      'updatedAt': '2023-05-13T10:14:19.700Z',
      'view': 49,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 25,
      'commentCount': 5
    },
    {
      'postId': 8,
      'title': '8 번째 게시글',
      'tag': '모집',
      'createdAt': '2022-05-09T09:25:00Z',
      'updatedAt': '2022-05-09T09:25:00Z',
      'view': 100,
      'userName': 'user1',
      'memberStatus': '', 
      'likeCount': 20,
      'commentCount': 10
    },
    {
      'postId': 9,
      'title': '9 번째 게시글',
      'tag': '공략',
      'createdAt': '2022-05-10T12:30:00Z',
      'updatedAt': '2022-05-10T12:30:00Z',
      'view': 200,
      'userName': 'user2',
      'memberStatus': '', 
      'likeCount': 10,
      'commentCount': 5
    },
    {
      'postId': 10,
      'title': '10 번째 게시글',
      'tag': '질문',
      'createdAt': '2022-05-11T18:45:00Z',
      'updatedAt': '2022-05-11T18:45:00Z',
      'view': 50,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 5,
      'commentCount': 2
    },
    {
      'postId': 11,
      'title': '11 번째 게시글',
      'tag': '모집',
      'createdAt': '2022-05-11T19:45:00Z',
      'updatedAt': '2022-05-11T19:45:00Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 23,
      'commentCount': 3
    },
    {
      'postId': 12,
      'title': '12 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-11T03:10:00Z',
      'updatedAt': '2023-05-11T03:10:00Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 24,
      'commentCount': 4
    },
    {
      'postId': 13,
      'title': '13 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-13T10:14:16.244Z',
      'updatedAt': '2023-05-13T10:14:16.244Z',
      'view': 51,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 24,
      'commentCount': 4
    },
    {
      'postId': 14,
      'title': '14 번째 게시글',
      'tag': '모집',
      'createdAt': '2023-05-13T10:14:19.700Z',
      'updatedAt': '2023-05-13T10:14:19.700Z',
      'view': 49,
      'userName': 'user3',
      'memberStatus': '', 
      'likeCount': 25,
      'commentCount': 5
    },
  ]
};

export const dummyBookmarkList: GamePagePostType[] = [
    {
      'postId': 1,
      'title': '첫 번째 게시글',
      'postTag': 'RECRUITMENT',
      'createdAt': '2023-05-09T09:25:00Z',
      'views': 100,
      'userName': 'user1',
      'likeCount': 20,
      'commentCount': 10,
    },
    {
      'postId': 2,
      'title': '두 번째 게시글',
      'postTag': 'BUG',
      'createdAt': '2023-05-10T12:30:00Z',
      'views': 200,
      'userName': 'user2',
      'likeCount': 10,
      'commentCount': 5
    },
    {
      'postId': 3,
      'title': '세 번째 게시글',
      'postTag': 'WALKTHROUGH',
      'createdAt': '2023-05-11T18:45:00Z',
      'views': 50,
      'userName': 'user3',
      'likeCount': 5,
      'commentCount': 2
    },
    {
      'postId': 4,
      'title': '네 번째 게시글',
      'postTag': 'WALKTHROUGH',
      'createdAt': '2023-05-19T00:34:27.616Z',
      'views': 53,
      'userName': 'user4',
      'likeCount': 15,
      'commentCount': 12
    },
];