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
  useInput?: useInputReturn,
  validationFunction?: ()=>boolean
}

export interface InputContainerType {
  placeholder?: string;
  title?: string;
  onChange?: React.ChangeEvent;
  validationMessage?: string;
  validationType?: 'username' | 'email' | 'password' | 'custom' | 'none';
  validationFunction?: () => boolean;
  type?: string; 
}

export interface LabelType {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  padding?: string;
}