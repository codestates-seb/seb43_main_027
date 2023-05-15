import styled, { css } from 'styled-components';

type CategoryTagType = {
  index: number;
  // 카테고리 아이디 링크추가하기 (이동기능)
  categoryName: string;
}

type StyledTagProps = {
  styleId: number;
}

const CategoryTag = ({ index, categoryName }: CategoryTagType)  => {
  return (
    <StyledTag styleId={index}>
      {categoryName}
    </StyledTag>
  );
};

export default CategoryTag;

const StyledTag = styled.span<StyledTagProps>`
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  color: #3e3948;
  border-radius: 5px;
  color:  ${({ styleId }) => 
      css`var(--category-tag-color-${styleId}, var(--category-tag-color-default));
      `
    };
  background-color: ${({ styleId }) =>
    css`var(--category-tag-bg-${styleId}, var(--category-tag-bg-default))`};
  word-break: keep-all;
  overflow-wrap: break-word;
`;