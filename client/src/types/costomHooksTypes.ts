export interface useInputType {
  inputUserName: useInputReturn;
  inputEmail: useInputReturn;
  inputPassWord: useInputReturn;
}

export type useInputReturn = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};