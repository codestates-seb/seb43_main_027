import { useInputReturn } from './costomHooksTypes';

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

export interface LabelType {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  padding?: string;
}