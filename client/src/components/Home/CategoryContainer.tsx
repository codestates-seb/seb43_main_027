import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Title from './Title';
import CreateChannelButton from '../ui/CreateChannelButton';
import CategoryCardList from './CategoryCardList';

import { CategoryType } from '../../types/dataTypes';
import { getData } from '../../api/apiCollection';
import makeCategoryArray from '../../utils/makeCategoryArray';

const CategoryContainer = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const navigation = useNavigate();

  const onClickCreateButtonHandler = () => {
    navigation('/register');
  };

  useEffect(() => {
    getData(
      `${process.env.REACT_APP_API_URL}/api/categories`,
      (res) => {
        setCategories(makeCategoryArray(res.data));
      },
      console.error
    );
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
      <CategoryCardList categories={categories} />
    </StyledWrapper>
  );
};

export default CategoryContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  padding: 3rem 3.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
