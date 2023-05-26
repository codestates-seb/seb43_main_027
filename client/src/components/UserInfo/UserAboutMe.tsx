import styled from 'styled-components';
import { UserAboutPropsType, StyledAboutMePropsType } from '../../types/propsTypes';
import { SERVICE_MESSAGE } from '../../constants/stringMessage';

const UserAboutMe = ({ isUserAboutMe }: UserAboutPropsType) => {


  const emptyState = isUserAboutMe === null || isUserAboutMe.length === 0;

  return (
    <StyledWrapper emptyState={emptyState}>
      { emptyState ? SERVICE_MESSAGE.EMPTY_ABOUT : isUserAboutMe }
    </StyledWrapper>
  );
};

export default UserAboutMe;

const StyledWrapper = styled.div<StyledAboutMePropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 50px;
  border-radius: 15px;
  word-break: keep-all;
  overflow-wrap: break-word;
  font-size: 14px;
  color: var(--category-tag-bg-default);
  color: ${({emptyState}) => emptyState ? 'var(--cyan-dark-600)' : 'var(--category-tag-bg-default)' }
`;