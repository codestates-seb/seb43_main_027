import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

const UserNavItem = () => {
  const navigation = useNavigate();

  const onUserClickHandler = () => {
    navigation('/user');
  };
  const onMailClickHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
  };
  return (
    <StyledContainer onClick={onUserClickHandler}>
      <AiOutlineUser color={'var(--cyan-dark-500)'} size={'3rem'} />
      <StyledUserName>User Name</StyledUserName>
      <div>
        <AiOutlineMail
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
