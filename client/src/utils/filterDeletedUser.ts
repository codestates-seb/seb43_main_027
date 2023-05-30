import { User } from '../types/dataTypes';

export const filterDeletedUser = (user: User) => {
  if (user.memberStatus === 'ACTIVE') return true;
  if (user.userName.length < 21) return true;
  return false;
};
