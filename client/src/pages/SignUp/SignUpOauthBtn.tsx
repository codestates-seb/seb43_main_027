import ButtonEl from '../../components/elements/Button';
import { OauthButton } from './SignUpOauthContainer';

const SignUpOauthBtn = ({ onClick }: OauthButton) => {
  return (
    <StyledSignUpOauthButton onClick={onClick}>
      <p>Google 회원가입</p>
    </StyledSignUpOauthButton>
  );
};

export default SignUpOauthBtn;

const StyledSignUpOauthButton = ButtonEl({
  fontSize: '2rem',
  fontWeight: '600'
});
