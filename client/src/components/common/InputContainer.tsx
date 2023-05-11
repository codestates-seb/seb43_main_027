import React from 'react';
import styled from 'styled-components';

import { StyledInput } from '../elements/Input';
import { StyledLabel } from '../elements/Label';

import { useInputReturn } from '../../types/costomHooksTypes';

interface InputContainerType {
  placeholder?: string;
  title?: string;
  onChange?: React.ChangeEvent;
  useInput?: useInputReturn;
}

const InputContainer = ({
  placeholder = 'ex)',
  title = '입력창',
  useInput
}: InputContainerType) => {
  return (
    <InputContainerWrapper>
      <StyledLabelContainer>
        <Label>{title}</Label>
      </StyledLabelContainer>
      <Field>
        <InputEl
          placeholder={placeholder}
          value={useInput ? useInput.value : ''}
          onChange={
            useInput
              ? useInput.onChange
              : () => {
                  console.log('error');
                }
          }
        ></InputEl>
      </Field>
    </InputContainerWrapper>
  );
};

export default InputContainer;

export const InputContainerWrapper = styled.div`
  padding: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
export const StyledLabelContainer = styled.div`
  padding: 0 0 8px;
  display: flex;
  align-items: center;
  align-self: stretch;
`;
const Label = styled(StyledLabel)`
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