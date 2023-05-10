import styled from 'styled-components';

const FilterBar = () => {
  return (
    <StyledContainer>
      <StyledItem>인기</StyledItem>
      <StyledItem>신규</StyledItem>
      <StyledItem>팔로우</StyledItem>
    </StyledContainer>
  );
};

export default FilterBar;

const StyledContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
  border-bottom: 2px solid #8f8f8f;
  gap: 1rem;
  padding-left: 2rem;
`;

const StyledItem = styled.button`
  border: 2px solid #8f8f8f;
  border-bottom: none;
  padding: 0.5rem 1rem;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #999;
  &:hover {
    color: var(--cyan-dark-500);
  }
`;
