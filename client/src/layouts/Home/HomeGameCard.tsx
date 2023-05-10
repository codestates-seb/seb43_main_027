import styled from 'styled-components';

import GameCard from '../../components/common/GameCard';

const HomeGameCard = () => {
  return (
    <StyledContainer>
      <GameCard />
    </StyledContainer>
  );
};

export default HomeGameCard;

const StyledContainer = styled.div`
  width: 100%;
  @media screen and (min-width: 650px) {
    width: 30%;
  }
  @media screen and (min-width: 1200px) {
    width: 22%;
  }
`;
