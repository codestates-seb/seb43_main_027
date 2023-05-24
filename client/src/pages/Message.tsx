import styled from 'styled-components';

import { useState, useEffect } from 'react';
import axios from 'axios';

import MessageHeader from '../components/Message/MessageHeader';
import MessageContents from '../components/Message/MessageContents';
import { Single } from '../components/Message/SingleMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { stopChat } from '../slice/chatSlice';
import { closeNav } from '../slice/navSlice';
import Loading from '../components/common/Loading';
import { PageInfoType } from '../types/dataTypes';

// 대화 상대방 아이디 send 하는 쪽에 전달해주면 됨.

const Message = () => {
  const user = useSelector((s: RootState) => s.user);
  const [messageResponse, setMessageResponse] = useState<Single[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoType | null>(null);
  const chatInfo = useSelector((s: RootState) => s.chat);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addPrevMessages = (newData: Single[]) => {
    setMessageResponse((prev) => [...newData, ...prev]);
  };

  const addNewMessages = (newData: Single) => {
    setMessageResponse((prev) => [...prev, newData]);
  };

  useEffect(() => {
    if (user.memberId === -1) {
      dispatch(stopChat());
      dispatch(closeNav());
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/messages/${chatInfo.receiver.memberId}`,
          {
            headers: {
              Authorization: localStorage.getItem('access_token')
            }
          }
        );
        setMessageResponse(res.data.data);
        setPageInfo(res.data.pageInfo);
        setIsLoading(false);
        setIsSubmitted(false);
      } catch (error) {
        alert('채팅 내용을 불러오는 도중 에러가 발생했습니다.');
        dispatch(stopChat());
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isSubmitted]);

  const onWrapperClick = () => {
    dispatch(stopChat());
  };
  const onClickStopEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <StyledWrapper onClick={onWrapperClick}>
      <StyledMessageContainer onClick={onClickStopEvent}>
        <MessageHeader
          imageUrl={chatInfo.receiver.imageUrl}
          userName={chatInfo.receiver.userName}
          userId={chatInfo.receiver.memberId}
        />
        <MessageContents
          messageResponse={messageResponse}
          receiverId={chatInfo.receiver.memberId}
          receiverName={chatInfo.receiver.userName}
          addPrevMessages={addPrevMessages}
          addNewMessages={addNewMessages}
          pageInfo={pageInfo}
          setIsSubmitted={setIsSubmitted}
        />
      </StyledMessageContainer>
      {isLoading && <Loading />}
    </StyledWrapper>
  );
};

export default Message;

const StyledWrapper = styled.div`
  @media screen and (min-width: 650px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 25px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 2rem 0;
    z-index: 10;
  }
`;

const StyledMessageContainer = styled.div`
  display: flex;
  top: 50px;
  flex-direction: column;
  position: fixed;
  background-color: rgb(255, 255, 255);
  width: 100%;
  min-width: 40rem;
  height: calc(100vh - 50px);
  padding: 2rem;
  z-index: 2;

  @media screen and (min-width: 650px) {
    position: static;
    left: 50px;
    width: 50rem;
    height: calc(100vh - 100px);
    border-radius: 10px;
  }
`;
