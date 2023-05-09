import styled from 'styled-components';

import { NavStateType } from '../../types/propsTypes';

const MenuBtn = ({ setShow, show }: NavStateType) => {
  const onClickHandler = () => {
    setShow((prev) => !prev);
  };
  return (
    <StyledMenuButton onClick={onClickHandler} show={show}>
      <div />
      <div />
      <div />
    </StyledMenuButton>
  );
};

const StyledMenuButton = styled.div<{ show: boolean }>`
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
  > div:nth-child(1) {
    position: ${(props) => (props.show ? 'absolute' : 'static')};
    transform: ${(props) => (props.show ? 'rotate(-45deg)' : 'none')};
    transition: transform 0.2s;
  }
  > div:nth-child(2) {
    background-color: ${(props) =>
      props.show ? 'transparent' : 'var(--cyan-dark-500)'};
  }
  > div:nth-child(3) {
    position: ${(props) => (props.show ? 'absolute' : 'static')};
    transform: ${(props) => (props.show ? 'rotate(45deg)' : 'none')};
    transition: transform 0.2s;
  }
  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

export default MenuBtn;
