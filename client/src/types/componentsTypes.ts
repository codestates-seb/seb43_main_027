import { useInputReturn } from './customHooksTypes';

export interface ButtonType {
  flex?: string,
  fontSize?: string,
  fontWeight?: string,
  bg?: string,
  fontColor?: string,
  margin?: string,
  padding?: string,  
  radius?: string,
  border?: string,
  hoverBg?: string,
}

export interface InputType {
  fontSize?: string,
  fontWeight?: string,
  bg?: string,
  fontColor?: string,
  margin?: string,
  padding?: string,  
  radius?: string,
  border?: string,
  hoverBg?: string,
  boxShadow?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined,
  useInput?: useInputReturn
}

export interface InputContainerType {
  placeholder?: string;
  title?: string;
  onChange?: React.ChangeEvent;
  validationMessage?: string;
  extraAction?: (value:string) => void;
  validationFunction?:
    | ((value: string) => boolean)
    | ((value: File) => boolean);
  type?: string; 
}

export interface LabelType {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  padding?: string;
}