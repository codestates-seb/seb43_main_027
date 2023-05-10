import styled from 'styled-components';
import FilterBar from './FilterBar';
import HomeGameCard from './HomeGameCard';

const GameContainer = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <FilterBar />
        <StyledCardContainer>
          <HomeGameCard />
          <HomeGameCard />
          <HomeGameCard />
          <HomeGameCard />
          <HomeGameCard />
        </StyledCardContainer>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default GameContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`;
const StyledContainer = styled.div`
  width: 100%;

  @media screen and (min-width: 650px) {
    width: 90%;
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 5%;
  @media screen and (min-width: 1200px) {
    gap: 3rem 4%;
  }
`;
