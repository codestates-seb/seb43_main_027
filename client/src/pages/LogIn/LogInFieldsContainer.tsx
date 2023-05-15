import styled from 'styled-components';

import LogInFieldsInputContainer from './LogInFieldsInputContainer';

import { useInputType } from '../../types/costomHooksTypes';

/** Input 엘리먼트 각각에 유효성 검사를 넣지말고 여기서 검사해서 validmessage 조정 */

const LogInFieldsContainer = ({ inputEmail, inputPassWord }: useInputType) => {
  return (
    <StyledLogInFieldsContainer>
      <LogInFieldsInputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        useInput={inputEmail}
        validmessage='유효한 이메일 형식이 아닙니다.'
      ></LogInFieldsInputContainer>
      <LogInFieldsInputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        useInput={inputPassWord}
        validmessage='비밀번호는 영문 대/소문자,숫자,특수문자의 조합으로 8-16자이어야 합니다.'
      ></LogInFieldsInputContainer>
    </StyledLogInFieldsContainer>
  );
};

export default LogInFieldsContainer;

const StyledLogInFieldsContainer = styled.div`
  margin-bottom: 24px;
`;
