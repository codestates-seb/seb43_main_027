import styled from 'styled-components';
import GameCard from '../../components/common/GameCard';

const NavGameCardContainer = () => {
  return (
    <StyledContainer>
      <GameCard />
    </StyledContainer>
  );
};

export default NavGameCardContainer;

const StyledContainer = styled.div`
  width: 45%;
`;
