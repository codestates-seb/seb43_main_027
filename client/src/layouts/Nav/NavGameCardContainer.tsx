import styled from 'styled-components';
import GameCard from '../../components/common/GameCard';

import { GameType } from '../../types/dataTypes';
import { useDispatch } from 'react-redux';
import { closeNav } from '../../slice/navSlice';

const NavGameCardContainer = ({ data: gameData }: { data: GameType }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(closeNav());
  };
  return (
    <StyledContainer onClick={onClickHandler}>
      <GameCard {...gameData} />
    </StyledContainer>
  );
};

export default NavGameCardContainer;

const StyledContainer = styled.div`
  width: 45%;
`;
