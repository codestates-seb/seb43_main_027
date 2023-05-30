import styled from 'styled-components';

import SignupOauthBtn from './SignupOauthBtn';

export interface OauthButton {
  onClick: React.MouseEventHandler;
}

const SignupOauthContainer = ({ onClick }: OauthButton) => {
  return (
    <StyledSignUpOauthContainer>
      <SignupOauthBtn onClick={onClick} />
    </StyledSignUpOauthContainer>
  );
};

export default SignupOauthContainer;

const StyledSignUpOauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
