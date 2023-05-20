import { Link } from 'react-router-dom';

import logo from '../../asset/logo.png';
import styled from 'styled-components';

const Logo = () => {
  return (
    <Link to='/'>
      <StyledContainer>
        <img src={logo} width={40} />
        <StyledLogoText>INDDY BUDDY</StyledLogoText>
      </StyledContainer>
    </Link>
  );
};

export default Logo;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLogoText = styled.span`
  display: none;
  font-size: 1.2rem;
  @media screen and (min-width: 650px) {
    display: inline;
  }
`;
