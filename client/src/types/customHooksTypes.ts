export interface useInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validity: boolean;
};

export type ValidationFunction =
  | ((value: string) => boolean)
  | ((value: File) => boolean);

