import styled from 'styled-components';

import SignUpOauthBtn from './SignUpOauthBtn';

export interface OauthButton {
  onClick: React.MouseEventHandler;
}

const SignUpOauthContainer = ({ onClick }: OauthButton) => {
  return (
    <StyledSignUpOauthContainer>
      <SignUpOauthBtn onClick={onClick} />
    </StyledSignUpOauthContainer>
  );
};

export default SignUpOauthContainer;

const StyledSignUpOauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
