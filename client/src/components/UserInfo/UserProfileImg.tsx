import styled from 'styled-components';
import { StyledUserImgType } from '../../types/propsTypes';

const UserProfileImg = ({ isUserImg }: { isUserImg: string }) => {

  return (
    <StyledWrapper getUserImg={isUserImg} />
  );
};

export default UserProfileImg;

const StyledWrapper = styled.div<StyledUserImgType>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background:
    url(${(props) => props.getUserImg});
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;