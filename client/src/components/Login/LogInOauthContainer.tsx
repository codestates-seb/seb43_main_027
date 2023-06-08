import styled from 'styled-components';

import LoginOauthBtn from './LogInOauthBtn';

export interface OauthButton {
  onClick: React.MouseEventHandler;
}

const LoginOauthContainer = ({ onClick }: OauthButton) => {
  return (
    <StyledLoginOauthContainer>
      <LoginOauthBtn onClick={onClick} />
    </StyledLoginOauthContainer>
  );
};

export default LoginOauthContainer;

const StyledLoginOauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
