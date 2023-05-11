import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CategoryCard from '../../components/common/CategoryCard';
import Title from './Title';
import CreateChannelButton from '../../components/ui/CreateChannelButton';

import iconData from '../../data/categoryIcons';
import { CategoryType } from '../../types/dataTypes';

const CategoryContainer = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: CategoryType[] } = await axios(
          `${process.env.REACT_APP_API_URL}/api/categories`
        );
        setCategories(
          data.map((category) => ({
            ...category,
            categoryIcon: iconData[category.categoryName]
          }))
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <StyledWrapper>
      <StyledTitleContainer>
        <Title text='카테고리' />
        <CreateChannelButton
          text='게임채널 추가'
          onClick={() => console.log('test')}
        />
      </StyledTitleContainer>
      <StyledCategoryCardContainer>
        {categories.map((category) => (
          <CategoryCard key={category.categoryId} {...category} />
        ))}
      </StyledCategoryCardContainer>
    </StyledWrapper>
  );
};

export default CategoryContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledCategoryCardContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  overflow: scroll;
  padding: 0 1rem;
  @media screen and (min-width: 650px) {
    width: calc(100vw - 50px);
  }
`;
const StyledTitleContainer = styled.div`
  display: flex;
  padding: 3rem 3.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
