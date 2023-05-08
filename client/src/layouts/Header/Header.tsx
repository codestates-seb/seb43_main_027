import styled from 'styled-components';

import MenuBtn from './MenuBtn';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderBtnContainer from './HeaderBtnContainer';
import UserBtn from './UserBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Header = () => {
  const user = useSelector((s: RootState) => s.user);
  return (
    <StyledContainer>
      <MenuBtn />
      <StyledResponsiveContainer>
        <Logo />
        <SearchBar />
      </StyledResponsiveContainer>
      {user ? <UserBtn /> : <HeaderBtnContainer />}
    </StyledContainer>
  );
};

export default Header;

const StyledContainer = styled.div`
  display: flex;
  position: fixed;
  gap: 0.8rem;
  top: 0;
  align-items: center;
  border-bottom: 2px solid var(--cyan-dark-100);
  height: 50px;
  width: 100vw;
  padding: 0 2rem;
`;
const StyledResponsiveContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  align-items: center;
`;
