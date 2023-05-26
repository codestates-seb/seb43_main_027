import styled from 'styled-components';
import { GameType } from '../../types/dataTypes';
import GameItem from '../CategoryGames/GameItem';
const HomeGameCard = (props: GameType) => {
  return (
    <StyledContainer>
      <GameItem {...props} />
    </StyledContainer>
  );
};

export default HomeGameCard;

const StyledContainer = styled.div`
  /* width: 200px; */
  /* @media screen and (min-width: 650px) {
    width: 33%;
    & *:not(span) {
      width: 100%;
    }
  } */
  /* @media screen and (min-width: 780px) {
    width: 24.5%;
  } */
  /* @media screen and (min-width: 950px) {
    width: 20%;
  } */
  /* @media screen and (min-width: 1200px) {
    width: 14.2%;
  } */
  /* @media screen and (min-width: 1450px) {
    width: 200px;
  } */
`;
