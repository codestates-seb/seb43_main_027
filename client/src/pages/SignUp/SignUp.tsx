import styled from 'styled-components';
import logo from '../../asset/logo.png';

import ButtonEl from '../../components/elements/Button';
import InputContainer from '../../components/common/InputContainer';

const StyledSignUpContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const StyledSignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 2rem;
    margin: 0.3rem;
  }
`;

const StyledSignUpFormTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledSignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 380px;
`;

const StyledSignUpOauthContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledSignUpFieldsContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledSignUpButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  @media screen and (max-width: 650px) {
    flex-direction: row;
    p {
      display: none;
    }
  }
`;

const StyledOauthButton = ButtonEl({
  fontSize: '2rem',
  fontWeight: '600'
});

const StyledSignUpButton = ButtonEl({
  fontSize: '1.6rem'
});

const StyledSignInButton = ButtonEl({
  fontSize: '1.6rem',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});

const oauthSignUp = () => {
  console.log('oauth');
};

const emailSignUp = () => {
  console.log('email');
};

const moveSignIn = () => {
  console.log('gosignin');
};

function SignUp() {
  return (
    <StyledSignUpContainer>
      <StyledSignUpFormWrapper>
        {/* top - component */}
        <StyledSignUpFormTopWrapper>
          <img src={logo} width={'200rem'} />
          <div className='cover'>
            <p>인디벗에서 취향이 맞는 벗과</p>
            <p>다양한 인디게임을 즐겨보세요!</p>
          </div>
        </StyledSignUpFormTopWrapper>
        {/* Oauthcomponent */}
        <StyledSignUpOauthContainer>
          <StyledOauthButton onClick={oauthSignUp}>
            <p>Google 회원가입</p>
          </StyledOauthButton>
        </StyledSignUpOauthContainer>
        {/* Form component */}
        <StyledSignUpFormContainer>
          <StyledSignUpFieldsContainer>
            <InputContainer
              placeholder='ex)인디벗'
              title='닉네임'
            ></InputContainer>
            <InputContainer
              placeholder='ex)inddy@gmail.com'
              title='아이디'
            ></InputContainer>
            <InputContainer
              placeholder='8자리 이상'
              title='비밀번호'
            ></InputContainer>
          </StyledSignUpFieldsContainer>
          <StyledSignUpButtonsContainer>
            <StyledSignUpButton onClick={emailSignUp}>
              <p>회원가입!!</p>
            </StyledSignUpButton>
            <p>이미 회원이신가요?</p>
            <StyledSignInButton onClick={moveSignIn}>로그인</StyledSignInButton>
          </StyledSignUpButtonsContainer>
        </StyledSignUpFormContainer>
      </StyledSignUpFormWrapper>
    </StyledSignUpContainer>
  );
}

export default SignUp;
