import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PATH_URL from '../../constants/pathUrl';
import { useDispatch } from 'react-redux';
import { stopChat } from '../../slice/chatSlice';
import { closeNav } from '../../slice/navSlice';

const MessageHeader = ({
  imageUrl,
  userName,
  userId
}: {
  imageUrl: string;
  userName: string;
  userId: number;
}) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(stopChat());
  };

  return (
    <StyledWrapper>
      <StyledLeft>
        <StyledImg src={imageUrl} />
        <Link to={`${PATH_URL.USER_INFO}${userId}`} onClick={onClickHandler}>
          <StyledUsername>{userName}</StyledUsername>
        </Link>
      </StyledLeft>

      <StyledRight>
        <StyledCloseButton onClick={onClickHandler}>X</StyledCloseButton>
      </StyledRight>
    </StyledWrapper>
  );
};

export default MessageHeader;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5rem;
`;

const StyledLeft = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1rem;
`;

const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const StyledUsername = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
`;

const StyledCloseButton = styled.button`
  background-color: var(--cyan-dark-400);
  color: white;
  border-style: none;
  height: 2rem;
  border-radius: 5px;
`;
const StyledRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
