import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const navigator = useNavigate();

const emailSignUp: React.MouseEventHandler = async (e: React.MouseEvent) => {
  e.preventDefault();
  try {
    await axios
      .post(
        'http://ec2-13-209-70-188.ap-northeast-2.compute.amazonaws.com:8080/api/members/signup',
        {
          
        }
      )
      .then((response) => {
        alert('you successfully signed up!');
        navigator('/login');
      });
  } catch (error) {
    console.log(error);
    alert('you failed to signup!');
    navigator('/error');
  }
};

export default emailSignUp;