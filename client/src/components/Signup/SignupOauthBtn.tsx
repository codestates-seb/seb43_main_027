import ButtonEl from '../../components/elements/Button';
import { OauthButton } from './SignupOauthContainer';

const SignupOauthBtn = ({ onClick }: OauthButton) => {
  return (
    <StyledSignupOauthButton onClick={onClick}>
      <p>Google 회원가입</p>
    </StyledSignupOauthButton>
  );
};

export default SignupOauthBtn;

const StyledSignupOauthButton = ButtonEl({
  fontSize: '2rem',
  fontWeight: '600'
});
