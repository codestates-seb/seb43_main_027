import styled from 'styled-components';

import { StyledInput } from '../elements/Input';
import { Label } from '../elements/Label';

import { InputContainerType } from '../../types/componentsTypes';

import useInput from '../../hooks/useInput';

const InputContainer = ({
  placeholder = 'ex)',
  title = '입력창',
  extraAction,
  validationMessage,
  validationFunction,
  type
}: InputContainerType) => {
  const useInputResult = useInput('', extraAction, validationFunction);

  return (
    <InputContainerWrapper>
      <StyledLabelContainer>
        <StyledLabel>{title}</StyledLabel>
      </StyledLabelContainer>
      <Field>
        <InputEl
          placeholder={placeholder}
          value={useInputResult ? useInputResult.value : ''}
          type={type ? type : ''}
          onChange={
            useInputResult
              ? useInputResult.onChange
              : () => {
                  console.log('error');
                }
          }
        />

        {!useInputResult.validity ? (
          useInputResult?.value === '' ? (
            <ValidMessageInvisible className='invisible'>
              Invisible
            </ValidMessageInvisible>
          ) : (
            <ValidMessage className='msg'>{validationMessage}</ValidMessage>
          )
        ) : (
          <ValidMessageInvisible>Invisible</ValidMessageInvisible>
        )}
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
  display: flex;
  align-items: center;
  align-self: stretch;
`;
const StyledLabel = styled(Label)`
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.85);
  flex: 1;
  text-align: center;
`;
export const Field = styled.div`
  background-color: rgba(255, 255, 255, 1);
  margin: 0.5rem;
  overflow: hidden;
  border-radius: 2px;
  display: flex;

  flex: 1;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  .msg {
    font-size: 1.2rem;
    margin-top: 0.7rem;
  }
`;
export const InputEl = styled(StyledInput)`
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid rgba(217, 217, 217, 1);
`;

// 나중에 p 태그 따로 element로 빼고 싶어서 Styled 안붙임.
const ValidMessage = styled.p`
  color: red;
  .msg {
    font-size: 1.2rem;
  }
`;
const ValidMessageInvisible = styled.p`
  color: transparent;
`;
