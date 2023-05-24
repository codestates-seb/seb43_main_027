import styled from 'styled-components';
import GameTitle from '../components/GameChannel/GameTitle';
import ContentBox from '../components/GameFollower/ContentBox';

const GameFollower = () => {
  return (
    <StyledGameChannelWrapper>
      <StyledGameChannelContain>
        <GameTitle />
        <ContentBox />
      </StyledGameChannelContain>
    </StyledGameChannelWrapper>
  );
};

export default GameFollower;

const StyledGameChannelWrapper = styled.div`
  background-color: var(--page-bg);
  width: 100%;
  min-height: calc(100vh - 224px);
  flex-grow: 1;
  overflow-x: hidden;
`;

const StyledGameChannelContain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px;
  display: flex;
  justify-content: left;
  flex-direction: row;
  gap: 20px;
  @media screen and (max-width: 650px) {
    padding: 30px 0px;
    flex-direction: column;
  }
`;
