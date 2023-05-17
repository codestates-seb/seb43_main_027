import { type PathUrlType } from '../types/dataTypes';

const PATH_URL: PathUrlType = {
  HOME: '/',
  CATEGORY: '/category/',
  GAME: '/game/',
  POSTING: '/game/:gameId/post',
  SIGNUP: '/signup',
  LOGIN: '/login',
  REGISTER: '/register',
};

export default PATH_URL;
