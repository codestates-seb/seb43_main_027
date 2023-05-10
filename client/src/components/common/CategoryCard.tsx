import { IoGameControllerOutline } from 'react-icons/io5';
import styled from 'styled-components';

const CategoryCard = () => {
  return (
    <StyledContainer>
      <IoGameControllerOutline size={'3rem'} />
      <StyledText>gameasdfasdfsfdasdfsd</StyledText>
    </StyledContainer>
  );
};

export default CategoryCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem;
  min-width: 15rem;
  aspect-ratio: 1/1;
  color: var(--cyan-dark-500);
  border: 1px solid var(--cyan-dark-500);
  font-size: 2rem;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    background-color: var(--cyan-dark-300);
    color: white;
  }
`;

const StyledText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
