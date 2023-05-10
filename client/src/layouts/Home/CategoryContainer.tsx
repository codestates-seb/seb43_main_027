import styled from 'styled-components';

import CategoryCard from '../../components/common/CategoryCard';
import Title from './Title';
import CreateChannelButton from '../../components/ui/CreateChannelButton';

const CategoryContainer = () => {
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
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
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
