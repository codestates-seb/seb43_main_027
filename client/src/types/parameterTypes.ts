import { BookmarkType, CommentType, ReactionType } from './dataTypes';

export type InputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export type SubmitType = React.FormEvent<HTMLFormElement> | React.MouseEvent;

export type BookmarkDataType = {
  bookmark: BookmarkType | null;
};

export type ReactionDataType = {
  reaction: ReactionType | null;
  likeCount: number;
  unlikeCount: number;
};
export type CommentDataType = {
  comments: CommentType[];
};
