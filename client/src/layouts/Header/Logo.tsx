import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = () => {
  return (
    <Link to='/'>
      <StyledContainer>Logo</StyledContainer>
    </Link>
  );
};

export default Logo;

const StyledContainer = styled.div``;
