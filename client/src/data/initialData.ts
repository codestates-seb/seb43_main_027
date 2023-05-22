import { PostDataType } from '../types/dataTypes';

export const postInitValue: PostDataType = {
  content: '',
  commentCount: 0,
  createdAt: '',
  title: '',
  fileUrlList: [],
  reaction: null,
  member: {
    memberId: -1,
    email: '',
    followerCount: 0,
    followingCount: 0,
    imageUrl: '',
    userName: ''
  },
  comments: [],
  gameId: -1,
  likeCount: 0,
  unlikeCount: 0,
  postId: -1,
  updatedAt: '',
  views: 0,
  postTag: ''
};

export const postInputInitValue = {
  postTag: '',
  title: '',
  content: ''
};
