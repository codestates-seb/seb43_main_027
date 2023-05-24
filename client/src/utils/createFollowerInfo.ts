import axios from 'axios';
import { User } from '../types/dataTypes';
import { filterDeletedUser } from './filterDeletedUser';

const getGameFollower = (gameId: number) => {
  return axios(`${process.env.REACT_APP_API_URL}/api/games/${gameId}/follower`);
};
const getUserFollowing = (userId: number) => {
  return axios(
    `${process.env.REACT_APP_API_URL}/api/members/${userId}/following`
  );
};

export const createFollowerInfo = (gameId: number, userId: number) => {
  return Promise.all([getGameFollower(gameId), getUserFollowing(userId)]).then(
    ([res1, res2]) => {
      const gameFollower = res1.data.data;
      const userFollowingId = res2.data.data.map((a: User) => a.memberId);
      const newUserData = gameFollower.map((follower: User) => {
        return {
          ...follower,
          isFollowed: userFollowingId.includes(follower.memberId)
        };
      });
      return newUserData;
    }
  );
};
