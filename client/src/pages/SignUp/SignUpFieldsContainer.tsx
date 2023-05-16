import styled from 'styled-components';

import SignUpFieldsInputContainer from './SignUpFieldsInputContainer';

import { useInputType } from '../../types/customHooksTypes';

/** Input 엘리먼트 각각에 유효성 검사를 넣지말고 여기서 검사해서 validmessage 조정 */

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
        validmessage='한글/영문 2-10자로 작성해주세요.'
      ></SignUpFieldsInputContainer>
      <SignUpFieldsInputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        useInput={inputEmail}
        validmessage='유효한 이메일 형식이 아닙니다.'
      ></SignUpFieldsInputContainer>
      <SignUpFieldsInputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        useInput={inputPassWord}
        validmessage='비밀번호는 8-16자 영문,숫자,특수문자의 조합이어야 합니다.'
      ></SignUpFieldsInputContainer>
    </StyledSignUpFieldsContainer>
  );
};

export default SignUpFieldsContainer;

const StyledSignUpFieldsContainer = styled.div`
  margin-bottom: 24px;
`;
