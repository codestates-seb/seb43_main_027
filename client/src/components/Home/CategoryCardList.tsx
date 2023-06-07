import styled from 'styled-components';
import { CategoryType } from '../../types/dataTypes';
import CategoryCard from '../common/CategoryCard';

const CategoryCardList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <StyledCategoryCardContainer>
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard key={category.categoryId} {...category} />
        ))
      ) : (
        <StyledErrorMsg>카테고리가 존재하지 않습니다.</StyledErrorMsg>
      )}
    </StyledCategoryCardContainer>
  );
};

export default CategoryCardList;

const StyledCategoryCardContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  overflow: scroll;
  padding: 0 1rem 1rem;
  @media screen and (min-width: 650px) {
    width: calc(100vw - 50px);
  }
`;

const StyledErrorMsg = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  text-align: center;
  color: var(--default-text-color);
`;
