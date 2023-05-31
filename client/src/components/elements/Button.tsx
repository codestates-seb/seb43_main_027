import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ButtonType } from '../../types/componentsTypes';

export interface ButtonElType extends ButtonType {
  //  누르면 바로 이동하는 버튼도 있어서 ? 이용하여 선택적으로 채용.
  onClick?: React.MouseEventHandler;
}

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

const StyledBtn = styled.button.attrs((props) => ({
  type: props.type || 'button'
}))<ButtonType>`
  flex: ${(props) => props.flex || ''};
  font-size: ${(props) => props.fontSize || '1.3rem'};
  font-weight: ${(props) => props.fontWeight || '600'};
  text-align: center;
  background-color: ${(props) => props.bg || 'var(--cyan-dark-400)'};
  color: ${(props) => props.fontColor || 'white'};
  margin: ${(props) => props.margin || '0.5rem 0.7rem'};
  padding: ${(props) => props.padding || '0.5rem 0.7rem'};
  border-radius: ${(props) => props.radius || '5px'};
  border: ${(props) => props.border || 'none'};
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => props.hoverBg || 'var(--cyan-dark-500)'};
  }
`;
