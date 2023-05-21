import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AiOutlineUser } from 'react-icons/ai';
import { User } from '../../types/dataTypes';
import PATH_URL from '../../constants/pathUrl';
import { TbMessages } from 'react-icons/tb';

const UserNavItem = ({ data: user }: { data: User }) => {
  const navigation = useNavigate();

  const onUserClickHandler = () => {
    navigation(`${PATH_URL.USER_INFO}${user.memberId}`);
  };
  const onMailClickHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
  };
  return (
    <StyledContainer onClick={onUserClickHandler}>
      {user.imageUrl ? (
        <StyledImg src={user.imageUrl} />
      ) : (
        <AiOutlineUser size={'3rem'} />
      )}
      <StyledUserName>{user.userName}</StyledUserName>
      <div>
        <TbMessages
          color={'#999'}
          size={20}
          onClick={onMailClickHandler}
          cursor={'pointer'}
        />
      </div>
    </StyledContainer>
  );
};

export default UserNavItem;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  width: 100%;
  height: fit-content;
  cursor: pointer;

  border-bottom: 1px solid var(--cyan-dark-500);
  > :nth-child(3) {
    flex: 1 0 0;
    text-align: end;
  }
`;

const StyledUserName = styled.span`
  font-weight: bold;
  font-size: 1.6rem;
`;
const StyledImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;
