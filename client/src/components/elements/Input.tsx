import styled from 'styled-components';
import { InputType } from '../../types/componentsTypes';

export const StyledInput = styled.input<InputType>`
  font-size: 1.3rem;
  margin: 0.5rem 0.7rem;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;

  &:focus {
    background-color: var(--cyan-light-200);
    box-shadow: 0 10px 24px var(--cyan-dark-300),
      0 20px 48px var(--cyan-dark-300), 0 1px 4px var(--cyan-dark-300);
  }
`;
