import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';

const GoogleLogIn = () => {
  const navigator = useNavigate();

  const url = new URL(window.location.href);
  const accessToken = url.searchParams.get('token');
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    navigator('/');
  } else {
    alert('로그인에 실패하였습니다.');
    console.log('Access token이 없습니다.');
    navigator('/signup');
  }

  return (
    <>
      <Loading />
    </>
  );
};

export default GoogleLogIn;
