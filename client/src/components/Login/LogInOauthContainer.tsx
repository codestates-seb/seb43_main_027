import styled from 'styled-components';

import LogInOauthBtn from './LogInOauthBtn';

export interface OauthButton {
  onClick: React.MouseEventHandler;
}

const LogInOauthContainer = ({ onClick }: OauthButton) => {
  return (
    <StyledLogInOauthContainer>
      <LogInOauthBtn onClick={onClick} />
    </StyledLogInOauthContainer>
  );
};

export default LogInOauthContainer;

const StyledLogInOauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
