import styled from 'styled-components';

import { gameTagInfo } from '../../data/gameTags';
const { gameTags } = gameTagInfo;

import TagButton, { StyledButton } from './TagButton';

interface TagsContainer {
  tagStates: boolean[];
  setTagStates: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const GameTagsContainer = ({ tagStates, setTagStates }: TagsContainer) => {
  // 태그 초기화
  const initializeTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagsInitialStates: boolean[] = new Array(gameTags.length).fill(false);
    setTagStates(tagsInitialStates);
    console.log(tagStates);
  };

  // 컴포넌트 렌더링
  return (
    <StyledButtonContainer>
      <StyledResetButton onClick={initializeTags}>
        태그 초기화
      </StyledResetButton>
      {gameTags.map((tag, index) => (
        <TagButton
          key={index}
          tagIndex={index}
          tagStates={tagStates}
          setTagStates={setTagStates}
        >
          {tag}
        </TagButton>
      ))}
    </StyledButtonContainer>
  );
};

export default GameTagsContainer;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .active {
    background-color: red;
  }
`;

const StyledResetButton = styled(StyledButton)``;
