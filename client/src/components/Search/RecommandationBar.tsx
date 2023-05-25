import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CategoryCard from '../common/CategoryCard';

import { CategoryType } from '../../types/dataTypes';
import categoryData from '../../data/categoryData';

interface RecommandationBar {
  recommandTag: CategoryType[];
  setRecommandTag: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const RecommandationBar = ({
  recommandTag,
  setRecommandTag
}: RecommandationBar) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    setCategories(
      recommandTag.map((category) => ({
        ...category,
        categoryName: categoryData[category.categoryName].text,
        categoryIcon: categoryData[category.categoryName].icon
      }))
    );
  }, [recommandTag]);

  return (
    <StyledWrapper>
      <StyledTitleContainer>
        <StyledTitle>추천 카테고리</StyledTitle>
      </StyledTitleContainer>
      <StyledCategoryCardContainer>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.categoryId} {...category} />
          ))
        ) : (
          <StyledErrorMsg>카테고리가 존재하지 않습니다.</StyledErrorMsg>
        )}
      </StyledCategoryCardContainer>
    </StyledWrapper>
  );
};

export default RecommandationBar;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 0rem;
  margin-right: 3rem;
  height: 100rem;
`;

const StyledTitle = styled.span`
  font-size: 1.8rem;
`;
const StyledCategoryCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 1rem;
  /* @media screen and (min-width: 650px) {
    width: calc(100vw - 50px);
  } */
`;
const StyledTitleContainer = styled.div`
  display: flex;
  padding: 2rem 2.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1.8rem;
`;

const StyledErrorMsg = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  text-align: center;
  color: var(--default-text-color);
`;
