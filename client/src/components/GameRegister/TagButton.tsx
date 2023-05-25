import React from 'react';
import styled, { css } from 'styled-components';
import { type StyledTagPropsType } from '../../types/propsTypes';

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
  const mainColor = Math.round(tagIndex % 5);
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
      className={isActive ? '' : 'inactive'}
      styleId={mainColor}
    >
      {children}
    </StyledButton>
  );
};

export default TagButton;

export const StyledButton = styled.button<StyledTagPropsType>`
  font-size: 14px;
  font-weight: bold;
  margin: 0.4rem 1rem;
  padding: 4px 10px;
  color: #3e3948;
  border-radius: 5px;
  border-style: none;
  height: 3rem;
  @media screen and (max-width: 650px) {
    height: 2.5rem;
  }
  color: ${({ styleId }) =>
    css`var(--category-tag-color-${styleId}, var(--category-tag-color-default));
      `};
  background-color: ${({ styleId }) =>
    css`var(--category-tag-bg-${styleId}, var(--category-tag-bg-default))`};
  word-break: keep-all;
  overflow-wrap: break-word;
`;
