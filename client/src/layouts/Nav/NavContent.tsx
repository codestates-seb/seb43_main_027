import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const NavContent = ({
  type,
  Content
}: {
  type: string;
  Content: (props: any) => JSX.Element;
}) => {
  const [data, setData] = useState([]);
  const user = useSelector((s: RootState) => s.user);
  const apiRef = useRef<{ [key: string]: string }>({
    user: `/api/members/${user.memberId}/following`,
    bookmark: `/api/members/${user.memberId}/bookmark`,
    games: `/api/members/${user.memberId}/mygame`
  });
  // TODO: type에 따라서 데이터 패칭을 다르게 하고 보여준다.

  useEffect(() => {
    (async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_URL}${apiRef.current[type]}`,
          {
            headers: {
              Authorization: localStorage.getItem('access_token')
            }
          }
        );
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [type]);

  return (
    <StyledContainer>
      <StyledRelativeBox>
        <StyledItemContainer>
          {user.memberId !== -1 ? (
            data.map((a) => <Content key={a} />)
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

const StyledNotiMsgContainer = styled.div`
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  font-size: 2rem;
  padding: 0;
`;

const StyledRelativeBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  min-height: 30rem;
  justify-content: space-between;
  gap: 2rem;
  @media screen and (min-width: 650px) {
    position: fixed;
    top: 70px;
    width: 100%;
    max-width: 36rem;
    max-height: 40vh;
    overflow: scroll;
  }
`;
