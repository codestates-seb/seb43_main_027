import styled from 'styled-components';

import InputContainer from '../../components/common/InputContainer';

import { useInputType } from '../../types/costomHooksTypes';

const SignUpFieldsContainer = ({
  inputUserName,
  inputEmail,
  inputPassWord
}: useInputType) => {
  return (
    <StyledSignUpFieldsContainer>
      <InputContainer
        placeholder='ex)인디벗'
        title='닉네임'
        useInput={inputUserName}
      ></InputContainer>
      <InputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        useInput={inputEmail}
      ></InputContainer>
      <InputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        useInput={inputPassWord}
      ></InputContainer>
    </StyledSignUpFieldsContainer>
  );
};

export default SignUpFieldsContainer;

const StyledSignUpFieldsContainer = styled.div`
  margin-bottom: 24px;
`;
