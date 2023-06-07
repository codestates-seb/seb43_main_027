import ButtonEl from '../elements/Button';
import { OauthButton } from './LogInOauthContainer';

const LoginOauthBtn = ({ onClick }: OauthButton) => {
  return (
    <StyledLoginOauthButton onClick={onClick}>
      <p>Google 로그인</p>
    </StyledLoginOauthButton>
  );
};

export default LoginOauthBtn;

const StyledLoginOauthButton = ButtonEl({
  fontSize: '2rem',
  fontWeight: '600'
});
