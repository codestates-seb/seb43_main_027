import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/common/Loading';

const NavContent = ({
  type,
  Content
}: {
  type: string;
  Content: (props: any) => JSX.Element;
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((s: RootState) => s.user);
  const apiRef = useRef<{ [key: string]: string }>({
    user: `/api/members/${user.memberId}/following`,
    bookmark: `/api/members/${user.memberId}/bookmark`,
    games: `/api/members/${user.memberId}/mygame`
  });
  // TODO: type에 따라서 데이터 패칭을 다르게 하고 보여준다.

  useEffect(() => {
    if (user.memberId === -1) return;
    setIsLoading(true);

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
        setIsLoading(false);
        setData(res.data.data);
      } catch (err: any) {
        setIsLoading(false);
        if (err.response.status === 404) {
          alert('해당 경로가 존재하지 않습니다.');
        }
      }
    })();
  }, [type]);

  const getContent = () => {
    if (user.memberId === -1)
      return (
        <StyledNotiMsgContainer>
          <span>로그인이 필요한 서비스입니다.</span>
        </StyledNotiMsgContainer>
      );
    else if (data.length === 0) {
      const msg: { [key: string]: string } = {
        user: '팔로우한 유저가 없습니다.',
        bookmark: '북마크한 게시글이 없습니다.',
        games: '팔로우한 게임이 없습니다.'
      };
      return (
        <StyledNotiMsgContainer>
          <span>{msg[type]}</span>
        </StyledNotiMsgContainer>
      );
    }

    return data.map((a, i) => <Content key={i} data={a} />);
  };

  return (
    <>
      <StyledContainer>
        <StyledRelativeBox>
          {isLoading ? (
            <Loading />
          ) : (
            <StyledItemContainer>{getContent()}</StyledItemContainer>
          )}
        </StyledRelativeBox>
      </StyledContainer>
    </>
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
  ::-webkit-scrollbar {
    display: none;
  }
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
  min-height: 10rem;
  justify-content: space-between;
  gap: 2rem;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 650px) {
    position: fixed;
    top: 70px;
    width: 100%;
    max-width: 36rem;
    max-height: 40vh;
    overflow: scroll;
  }
`;
