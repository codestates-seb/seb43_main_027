import styled from 'styled-components';
import ButtonEl from '../elements/Button';

const SearchGameTop = () => {
  const movetoGameTap = (e: any) => {
    e.preventDefault();
    console.log('dd');
  };
  return (
    <StyledWrapper>
      <StyledTitle>게임</StyledTitle>
      <StyledBlock />
      <StyledTapButton onClick={movetoGameTap}>전체보기</StyledTapButton>
    </StyledWrapper>
  );
};

export default SearchGameTop;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    font-family: 'yg-jalnan';
  }
`;

const StyledTitle = styled.span`
  display: flex;
  color: black;
  font-size: 3rem;
  margin: 3rem 0 0 5rem;
`;

const StyledBlock = styled.div`
  display: flex;
  width: 70%;
`;

const StyledTapButton = ButtonEl({
  margin: '2rem',
  fontSize: '2rem',
  hoverBg: 'var(--cyan-dark-500)'
});
