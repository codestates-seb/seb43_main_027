import styled from 'styled-components';

import InputContainer from '../../components/common/InputContainer';

import { InputContainerType } from '../../types/componentsTypes';

const SignUpFieldsInputContainer = ({
  placeholder,
  title,
  useInput,
  validmessage
}: InputContainerType) => {
  return (
    <>
      <StyledInputContainer
        placeholder={placeholder}
        title={title}
        useInput={useInput}
      ></StyledInputContainer>
      <ValidMessage className='hidden'>{validmessage}</ValidMessage>
    </>
  );
};

export default SignUpFieldsInputContainer;

const StyledInputContainer = styled(InputContainer)`
  margin-bottom: 24px;
`;

// 나중에 p 태그 따로 element로 빼고 싶어서 Styled 안붙임.
const ValidMessage = styled.p`
  color: var(--invalid-message);
  .hidden {
    display: none;
  }
`;
