import styled from 'styled-components';

import SignUpFieldsInputContainer from './SignUpFieldsInputContainer';

import { useInputType } from '../../types/costomHooksTypes';

const SignUpFieldsContainer = ({
  inputUserName,
  inputEmail,
  inputPassWord
}: useInputType) => {
  return (
    <StyledSignUpFieldsContainer>
      <SignUpFieldsInputContainer
        placeholder='ex)인디벗'
        title='닉네임'
        useInput={inputUserName}
        validmessage={validmessage}
      ></SignUpFieldsInputContainer>
      <SignUpFieldsInputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        useInput={inputEmail}
        validmessage={validmessage}
      ></SignUpFieldsInputContainer>
      <SignUpFieldsInputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        useInput={inputPassWord}
        validmessage={validmessage}
      ></SignUpFieldsInputContainer>
    </StyledSignUpFieldsContainer>
  );
};

export default SignUpFieldsContainer;

const StyledSignUpFieldsContainer = styled.div`
  margin-bottom: 24px;
`;
