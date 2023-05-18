import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CategoryCard from '../common/CategoryCard';
import Title from './Title';
import CreateChannelButton from '../ui/CreateChannelButton';

import iconData from '../../data/categoryIcons';
import { CategoryType } from '../../types/dataTypes';
import { useNavigate } from 'react-router-dom';
import categoryData from '../../data/categoryData';

const CategoryContainer = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const navigation = useNavigate();

  const onClickCreateButtonHandler = () => {
    navigation('/register');
  };

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: CategoryType[] } = await axios(
          `${process.env.REACT_APP_API_URL}/api/categories`
        );
        setCategories(
          data.map((category) => ({
            ...category,
            categoryName: categoryData[category.categoryName].text,
            categoryIcon: categoryData[category.categoryName].icon
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
          onClick={onClickCreateButtonHandler}
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
