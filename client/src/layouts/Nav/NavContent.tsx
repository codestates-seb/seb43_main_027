import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/common/Loading';

const NavContent = ({
  type,
  Content,
  navHeight
}: {
  type: string;
  Content: (props: any) => JSX.Element;
  navHeight: number;
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((s: RootState) => s.user);
  const apiRef = useRef<{ [key: string]: string }>({
    user: `/api/members/${user.memberId}/following`,
    bookmark: `/api/members/${user.memberId}/bookmark`,
    games: `/api/members/${user.memberId}/mygame`,
    messages: '/api/members/messages',
    myGames: `/api/members/${user.memberId}/creategame`
  });

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

        if (type === 'messages') {
          const tmp = new Set(
            res.data.data.map((data: any) => {
              if (data.sender.memberId !== user.memberId)
                return data.sender.memberId;
              else return data.receiver.memberId;
            })
          );

          const newData = res.data.data
            .map((data: any) => {
              if (data.sender.memberId !== user.memberId) return data.sender;
              else return data.receiver;
            })
            .filter((a: any) => {
              if (tmp.has(a.memberId)) {
                tmp.delete(a.memberId);
                return true;
              }
              return false;
            });

          setData(newData);
        } else {
          setData(res.data.data);
        }
      } catch (err: any) {
        setIsLoading(false);
        console.log(err);
        if (err?.response.status === 404) {
          alert('해당 경로가 존재하지 않습니다.');
        }
      }
    })();
  }, [type]);

  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    return () => {
      document.body.setAttribute(
        'style',
        'overflow-y: scroll; overflow-x:hidden'
      );
    };
  }, []);

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
        games: '팔로우한 게임이 없습니다.',
        messages: '채팅한 유저가 없습니다.',
        myGames: '생성한 게임이 없습니다.'
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
      <StyledContainer navHeight={navHeight}>
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

const StyledContainer = styled.div<{ navHeight: number }>`
  display: flex;
  position: absolute;
  background-color: #fff;
  width: 100%;
  padding: 2rem;
  max-height: 40rem;
  overflow: auto;
  z-index: 2;

  @media screen and (min-width: 650px) {
    width: 40rem;
    max-height: 100%;
    position: fixed;
    left: 50px;
    top: 0;
    padding-top: 60px;
    height: ${({ navHeight }) => {
      return `${navHeight}px`;
    }};
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

  @media screen and (min-width: 650px) {
    top: 70px;
    width: 100%;
    max-width: 36rem;
  }
`;
