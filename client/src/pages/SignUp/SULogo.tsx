import { Link } from 'react-router-dom';

import logo from '../../asset/logo.png';

const SULogo = () => {
  return (
    <Link to='/'>
      <img src={logo} width={'100rem'} />
    </Link>
  );
};

export default SULogo;
