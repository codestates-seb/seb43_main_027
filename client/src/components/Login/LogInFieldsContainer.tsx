import styled from 'styled-components';

import InputContainer from '../../components/common/InputContainer';

const LogInFieldsContainer = () => {
  return (
    <StyledLogInFieldsContainer>
      <StyledInputContainer
        placeholder='ex)inddy@gmail.com'
        title='아이디'
        validationMessage='유효한 이메일 형식이 아닙니다.'
        validationType='email'
      ></StyledInputContainer>
      <StyledInputContainer
        placeholder='8자리 이상'
        title='비밀번호'
        validationMessage='비밀번호는 8-16자 영문,숫자,특수문자의 조합이어야 합니다.'
        validationType='password'
        type='password'
      ></StyledInputContainer>
    </StyledLogInFieldsContainer>
  );
};

export default LogInFieldsContainer;

const StyledLogInFieldsContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledInputContainer = styled(InputContainer)`
  margin-bottom: 24px;
`;
