import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ButtonType } from '../../types/componentsTypes';

const StyledBtn = styled.button<ButtonType>`
  font-size: ${(props) => props.fontSize || '1.3rem'};
  font-weight: ${(props) => props.fontWeight || '700'};
  text-align: center;
  background-color: ${(props) => props.bg || 'var(--cyan-dark-500)'};
  color: ${(props) => props.fontColor || 'white'};
  margin: ${(props) => props.margin || '0.5rem 0.7rem'};
  padding: ${(props) => props.padding || '0.5rem 0.7rem'};
  border-radius: ${(props) => props.radius || '5px'};
  border: ${(props) => props.border};
  &:hover {
    background-color: ${(props) => props.hoverBg};
  }
`;

type ButtonElType = ButtonType & {
  onClick: React.MouseEventHandler;
};

function ButtonEl(props: ButtonType) {
  // eslint-disable-next-line react/display-name
  return ({ children, onClick }: PropsWithChildren<ButtonElType>) => {
    return (
      <StyledBtn {...props} onClick={onClick}>
        {children}
      </StyledBtn>
    );
  };
}

export default ButtonEl;
