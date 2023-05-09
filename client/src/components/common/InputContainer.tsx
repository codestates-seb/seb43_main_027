import React from 'react';
import styled from 'styled-components';

import { StyledInput } from '../elements/Input';

export const InputContainerWrapper = styled.div`
  padding: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Label = styled.div`
  padding: 0 0 8px;
  display: flex;
  align-items: center;
  align-self: stretch;
`;
export const Title = styled.label`
  font-family: 'Roboto';
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: rgba(0, 0, 0, 0.85);
  flex: 1;
  text-align: center;
`;
export const Field = styled.div`
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-radius: 2px;
  display: flex;
  align-items: center;
  align-self: stretch;
`;
export const InputEl = styled(StyledInput)`
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid rgba(217, 217, 217, 1);
`;

// eslint-disable-next-line react/prop-types
const InputContainer = ({ placeholder = 'example', title = 'Field A' }) => {
  return (
    <InputContainerWrapper>
      <Label>
        <Title>{title}</Title>
      </Label>
      <Field>
        <InputEl placeholder={placeholder}></InputEl>
      </Field>
    </InputContainerWrapper>
  );
};

export default InputContainer;
