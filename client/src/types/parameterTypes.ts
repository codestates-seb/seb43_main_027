export type InputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export type SubmitType = React.FormEvent<HTMLFormElement> | React.MouseEvent;
