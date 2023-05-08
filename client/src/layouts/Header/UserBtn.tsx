import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const UserBtn = ({ url }: { url?: string }) => {
  return (
    <StyledContainer>
      <Link to='/mypage'>
        {url ? (
          <img src={url} alt='유저 프로필 이미지' />
        ) : (
          <AiOutlineUser color={'var(--cyan-dark-500)'} size={20} />
        )}
      </Link>
    </StyledContainer>
  );
};

export default UserBtn;

const StyledContainer = styled.div`
  border-radius: 50%;
  border: 2px solid var(--cyan-dark-500);
  background-color: #fff;
`;
