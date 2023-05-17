import { PostType } from '../types/dataTypes';

export const validatePost = (post: PostType) =>
  post.title.length >= 5 &&
  post.content.length !== 0 &&
  post.postTag.length !== 0;
