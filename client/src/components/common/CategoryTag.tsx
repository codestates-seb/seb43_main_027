import styled, { css } from 'styled-components';
import { type CategoryType } from '../../types/dataTypes';
import { type StyledTagPropsType } from '../../types/propsTypes';

const CategoryTag = ({ categoryId, categoryName }: CategoryType) => {
  const mainColor = Math.round((categoryId - 1) % 4);

  return <StyledTag styleId={mainColor}>{categoryName}</StyledTag>;
};

export default CategoryTag;

const StyledTag = styled.span<StyledTagPropsType>`
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  color: #3e3948;
  max-height: 25px;
  border-radius: 5px;
  color: ${({ styleId }) =>
    css`var(--category-tag-color-${styleId}, var(--category-tag-color-default));
      `};
  background-color: ${({ styleId }) =>
    css`var(--category-tag-bg-${styleId}, var(--category-tag-bg-default))`};
  word-break: keep-all;
  overflow-wrap: break-word;
`;
