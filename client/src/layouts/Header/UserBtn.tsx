import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slice/userSlice';
import PATH_URL from '../../constants/pathUrl';

const UserBtn = ({ url, memberId }: { url?: string; memberId: number }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      dispatch(clearUser());
    }
  };

  return (
    <StyledContainer>
      <Link to={`${PATH_URL.USER_INFO}${memberId}`}>
        {url ? (
          <StyledImg src={url} alt='유저 프로필 이미지' />
        ) : (
          <AiOutlineUser color={'var(--cyan-dark-500)'} size={20} />
        )}
      </Link>
      <StyledBtn onClick={onClickHandler}>로그아웃</StyledBtn>
    </StyledContainer>
  );
};

export default UserBtn;

const StyledContainer = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: #fff;
  align-items: center;
  gap: 1rem;
`;

const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;
const StyledBtn = styled.button`
  background-color: var(--cyan-dark-500);
  color: white;
  border: white;
  padding: 0.5rem 1.3rem;
  border-radius: 20px;
`;
