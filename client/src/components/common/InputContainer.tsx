import styled from 'styled-components';

import { StyledInput } from '../elements/Input';
import { StyledLabel } from '../elements/Label';

import { InputContainerType } from '../../types/componentsTypes';

import useInput from '../../hooks/useInput';

const InputContainer = ({
  placeholder = 'ex)',
  title = '입력창',
  validationMessage,
  validationType = 'none',
  validationFunction,
  type
}: InputContainerType) => {
  const useInputResult = useInput('', validationType, validationFunction);
  // 현재 유효성검사 useInput에 포함되어서 처리 중인데,
  // 관심사 분리에 따라 useValidation으로 분리해서 하는 것도 좋아보임.
  return (
    <InputContainerWrapper>
      <StyledLabelContainer>
        <Label>{title}</Label>
      </StyledLabelContainer>
      <Field>
        <InputEl
          placeholder={placeholder}
          value={useInputResult ? useInputResult.value : ''}
          type={type ? type : ''}
          validationFunction={validationFunction}
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
