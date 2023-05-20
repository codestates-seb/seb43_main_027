import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const emailSignUp: React.MouseEventHandler = async (e: React.MouseEvent) => {
  const signupinfo = useSelector((state:RootState) => state.signup);
  console.log(signupinfo)
  e.preventDefault();
  try {
    await axios
      .post(
        'http://ec2-13-209-70-188.ap-northeast-2.compute.amazonaws.com:8080/api/members/signup',
        {
          username: signupinfo.username, 
          email: signupinfo.email, 
          password: signupinfo.password 
        }
      )
      .then((response) => {
        alert('you successfully signed up!');
        // Navigate('/login');
      });
  } catch (error) {
    console.log(error);
    alert('you failed to signup!');
    // navigator('/error');
  }
};

export default emailSignUp;