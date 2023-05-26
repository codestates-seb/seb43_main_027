import styled from 'styled-components';
import { InputType } from '../../types/componentsTypes';

export const StyledInput = styled.input<InputType>`
  font-size: 1.3rem;
  margin: 0.5rem 0.7rem;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;
  width: 100%;

  &:focus {
    background-color: var(--cyan-light-200);
    box-shadow: 0 4px 6px var(--cyan-dark-200), 0 2px 4px var(--cyan-dark-200);
  }
`;
