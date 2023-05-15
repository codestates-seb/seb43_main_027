export interface useInputType {
  inputUserName?: useInputReturn;
  inputEmail: useInputReturn;
  inputPassWord: useInputReturn;
}

export interface useInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validity: boolean;
};

export type useValidityType = 'username' | 'email' | 'password';