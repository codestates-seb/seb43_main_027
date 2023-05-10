export type NavStateType = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};
export type MemberType = {
  src: string;
  name: string;
  type: 'Front-End' | 'Back-End';
};
