import styled from 'styled-components';
import Title from './Title';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../types/dataTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FollowerItem from './FollowerItem';
import { createFollowerInfo } from '../../utils/createFollowerInfo';

const ContentBox = () => {
  const { gameId } = useParams();
  const user = useSelector((s: RootState) => s.user);
  const [followers, setFollowers] = useState<
    (User & {
      followerCount: number;
      followingCount: number;
      isFollowed: boolean;
    })[]
  >([]);

  useEffect(() => {
    createFollowerInfo(parseInt(gameId as string), user.memberId).then(
      (res) => {
        setFollowers(res);
      }
    );
  }, []);

  return (
    <StyledContainer>
      <Title />
      <StyledItemContainer>
        {followers.map((follower) => (
          <FollowerItem key={follower.memberId} {...follower} />
        ))}
      </StyledItemContainer>
    </StyledContainer>
  );
};

export default ContentBox;

const StyledContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
`;

const StyledItemContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-around;

  @media screen and (min-width: 650px) {
    gap: 3rem calc(100% - 400px);
    justify-content: center;
  }

  @media screen and (min-width: 780px) {
    gap: 3rem calc((100% - 200px));
  }
  @media screen and (min-width: 900px) {
    justify-content: flex-start;
    gap: 3rem calc((100% - 400px) / 2);
  }
  @media screen and (min-width: 1050px) {
    gap: 3rem calc((100% - 600px) / 3);
  }
  @media screen and (min-width: 1200px) {
    gap: 3rem calc((100% - 800px) / 4);
  }
  @media screen and (min-width: 1400px) {
    gap: 3rem calc((100% - 1000px) / 5);
  }
  @media screen and (min-width: 1600px) {
    gap: 3rem calc((100% - 1200px) / 6);
  }
  @media screen and (min-width: 1800px) {
    gap: 3rem calc((100% - 1400px) / 7);
  }
`;
