import styled from 'styled-components';
import { InputType } from '../../types/componentsTypes';

export const StyledInput = styled.input<InputType>`
  font-size: 1.3rem;
  margin: 0.5rem 0.7rem;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;

  &:focus {
    background-color: var(--cyan-light-200);
    box-shadow: 0 5px 12px var(--cyan-dark-200),
      0 10px 24px var(--cyan-dark-200), 0 1px 2px var(--cyan-dark-200);
  }
`;
