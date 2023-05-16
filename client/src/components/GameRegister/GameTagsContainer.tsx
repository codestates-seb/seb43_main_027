import { useState } from 'react';
import styled from 'styled-components';

import { gameTags } from '../../data/gameTags';

import TagButton, { StyledButton } from './TagButton';

const GameTagsContainer = () => {
  const [tagStates, setTagStates] = useState<boolean[]>([]);

  // 태그 초기화
  const initializeTags = () => {
    const tagsInitialStates: boolean[] = new Array(gameTags.length).fill(false);
    setTagStates(tagsInitialStates);
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
`;

const StyledResetButton = styled(StyledButton)``;
