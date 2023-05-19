import styled from 'styled-components';

import InputContainer from '../../components/common/InputContainer';

import { useDispatch } from 'react-redux';
import { setSignupInfo } from '../../slice/signupSlice';

const usernameRegExp = /^[가-힣A-Za-z0-9]{2,10}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegExp = /^[a-zA-Z0-9!@#$%^&*()_+-={}]{8,16}$/;

const usernameValidityTest = (value: string) => {
  return usernameRegExp.test(value);
};
const emailValidityTest = (value: string) => {
  return emailRegExp.test(value);
};
const passwordValidityTest = (value: string) => {
  return passwordRegExp.test(value);
};

const SignupFieldsContainer = () => {
  const dispatch = useDispatch();

  //  Signup 관련 store 업데이트
  const dispatchUsername = (value: string) =>
    dispatch(setSignupInfo({ key: 'username', value }));
  const dispatchEmail = (value: string) =>
    dispatch(setSignupInfo({ key: 'email', value }));
  const dispatchPassword = (value: string) =>
    dispatch(setSignupInfo({ key: 'password', value }));

  return (
    <StyledSignupFieldsContainer>
      <StyledInputContainer
        placeholder='ex)인디벗'
        title='닉네임'
        extraAction={dispatchUsername}
        validationMessage='한글/영문 2-10자로 작성해주세요.'
        validationFunction={usernameValidityTest}
      ></StyledInputContainer>
      <StyledInputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        extraAction={dispatchEmail}
        validationMessage='유효한 이메일 형식이 아닙니다.'
        validationFunction={emailValidityTest}
      ></StyledInputContainer>
      <StyledInputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        extraAction={dispatchPassword}
        validationMessage='비밀번호는 8-16자 영문,숫자,특수문자의 조합이어야 합니다.'
        validationFunction={passwordValidityTest}
        type='password'
      ></StyledInputContainer>
    </StyledSignupFieldsContainer>
  );
};

export default SignupFieldsContainer;

const StyledSignupFieldsContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledInputContainer = styled(InputContainer)`
  margin-bottom: 24px;
`;
