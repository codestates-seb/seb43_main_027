import ButtonEl from '../../components/elements/Button';
import { OauthButton } from './LogInOauthContainer';

const LogInOauthBtn = ({ onClick }: OauthButton) => {
  return (
    <StyledLogInOauthButton onClick={onClick}>
      <p>Google 로그인</p>
    </StyledLogInOauthButton>
  );
};

export default LogInOauthBtn;

const StyledLogInOauthButton = ButtonEl({
  fontSize: '2rem',
  fontWeight: '600'
});
