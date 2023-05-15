import React from 'react';
import styled from 'styled-components';

import { gameTags } from '../../data/gameTags';

interface TagButtonPropType {
  tagIndex: number;
  tagStates: boolean[];
  setTagStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  children: React.ReactNode;
}

const TagButton = ({
  tagIndex,
  tagStates,
  setTagStates,
  children
}: TagButtonPropType) => {
  const isActive = tagStates[tagIndex];

  const handleClick = () => {
    const newTagStates = [...tagStates];
    newTagStates[tagIndex] = !isActive;
    setTagStates(newTagStates);
  };

  return (
    <StyledButton onClick={handleClick} className={isActive ? 'active' : ''}>
      {children}
      {gameTags[tagIndex]}
    </StyledButton>
  );
};

export default TagButton;

const StyledButton = styled.button`
  display: flex;
  flex: 1;
`;
