import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';

const NavContent = ({
  type,
  Content
}: {
  type: string;
  Content: (props: any) => JSX.Element;
}) => {
  const user = useSelector((s: RootState) => s.user);
  // TODO: type에 따라서 데이터 패칭을 다르게 하고 보여준다.

  return (
    <StyledContainer>
      <StyledRelativeBox>
        <StyledItemContainer>
          {user ? (
            [1, 2, 3, 4, 5, 6, 7].map((a) => <Content key={a} />)
          ) : (
            <StyledNotiMsgContainer>
              <span>로그인이 필요한 서비스입니다.</span>
            </StyledNotiMsgContainer>
          )}
        </StyledItemContainer>
      </StyledRelativeBox>
    </StyledContainer>
  );
};

export default NavContent;

const StyledContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: #fff;
  width: 100%;
  padding: 2rem;
  max-height: 40rem;
  overflow: scroll;
  z-index: 2;

  @media screen and (min-width: 650px) {
    top: 0;
    left: 100%;
    min-width: 40rem;
    height: 100%;
    max-height: 100%;
  }
`;

const StyledNotiMsgContainer = styled(StyledContainer)`
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  align-items: center;
  font-size: 2rem;
`;

const StyledRelativeBox = styled.div`
  position: relative;
  height: 100%;
`;

const StyledItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: space-between;
  gap: 2rem;
  @media screen and (min-width: 650px) {
    position: fixed;
    top: 70px;
    max-width: 36rem;
    max-height: 60rem;
    overflow: scroll;
  }
`;
