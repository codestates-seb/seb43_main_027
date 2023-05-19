import styled from 'styled-components';

import InputContainer from '../common/InputContainer';

import { useDispatch } from 'react-redux';
import { setSignupInfo } from '../../slice/signupSlice';

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegExp = /^[a-zA-Z0-9!@#$%^&*()_+-={}]{8,16}$/;

const emailValidityTest = (value: string) => {
  return emailRegExp.test(value);
};
const passwordValidityTest = (value: string) => {
  return passwordRegExp.test(value);
};

const LoginFieldsContainer = () => {
  const dispatch = useDispatch();

  //  Login 관련 store 업데이트
  const dispatchEmail = (value: string) =>
    dispatch(setSignupInfo({ key: 'email', value }));
  const dispatchPassword = (value: string) =>
    dispatch(setSignupInfo({ key: 'password', value }));

  return (
    <StyledLoginFieldsContainer>
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
        type='password'
        validationFunction={passwordValidityTest}
      ></StyledInputContainer>
    </StyledLoginFieldsContainer>
  );
};

export default LoginFieldsContainer;

const StyledLoginFieldsContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledInputContainer = styled(InputContainer)`
  margin-bottom: 24px;
`;
