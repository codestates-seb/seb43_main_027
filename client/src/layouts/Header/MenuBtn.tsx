import styled from 'styled-components';

const MenuBtn = () => {
  return (
    <StyledMenuButton>
      <div />
      <div />
      <div />
    </StyledMenuButton>
  );
};

const StyledMenuButton = styled.div`
  cursor: pointer;
  position: relative;
  display: none;
  flex-direction: column;
  gap: 4px;
  & div {
    width: 25px;
    height: 3px;
    background-color: var(--cyan-dark-500);
  }
  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

export default MenuBtn;
