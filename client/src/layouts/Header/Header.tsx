import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MenuBtn from './MenuBtn';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderBtnContainer from './HeaderBtnContainer';
import UserBtn from './UserBtn';

import { RootState } from '../../store/store';
import { NavStateType } from '../../types/propsTypes';

const Header = () => {
  const user = useSelector((s: RootState) => s.user);
  return (
    <StyledContainer>
      <MenuBtn />
      <Logo />
      <SearchBar />

      {user.memberId !== -1 ? (
        <UserBtn url={user.imageUrl} memberId={user.memberId} />
      ) : (
        <HeaderBtnContainer />
      )}
    </StyledContainer>
  );
};

export default Header;

const StyledContainer = styled.header`
  display: flex;
  position: fixed;
  gap: 0.8rem;
  top: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--cyan-dark-100);
  height: 50px;
  width: 100vw;
  padding: 0 2rem;
  background-color: #fff;
  z-index: 10;
`;
