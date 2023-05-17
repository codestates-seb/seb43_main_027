import React from 'react';
import styled from 'styled-components';

export interface TagButtonPropType {
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTagStates = [...tagStates];
    const seletedNum = newTagStates.filter((a) => a === true).length;
    //  선택된 태그가 5개인경우
    if (seletedNum === 5) {
      //  TRUE 취소는 가능
      if (newTagStates[tagIndex] === true) {
        newTagStates[tagIndex] = !isActive;
        //  FALSE 를 바꾸는 것은 불가능
      } else {
        console.log('태그는 최대 5개까지만 선택이 가능합니다.');
      }
    } else newTagStates[tagIndex] = !isActive;
    setTagStates(newTagStates);
  };

  return (
    <StyledButton
      type='button'
      onClick={handleClick}
      className={isActive ? 'active' : ''}
    >
      {children}
    </StyledButton>
  );
};

export default TagButton;

export const StyledButton = styled.button`
  display: flex;

  margin: 0.5rem 0.3rem;
`;
