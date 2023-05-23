import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';
import { useEffect, useRef, useState } from 'react';
import { PageInfoType } from '../../types/dataTypes';
import { getData } from '../../api/apiCollection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loading from '../common/Loading';

interface OutputType {
  messageResponse: Single[];
  addPrevMessages: (newData: Single[]) => void;
  pageInfo: PageInfoType | null;
}

const MessageOutput = ({
  messageResponse,
  addPrevMessages,
  pageInfo
}: OutputType) => {
  const [lastLi, setLastLi] = useState<Element | null>(null);
  const [isScroll, setIsScroll] = useState(true);
  const chatInfo = useSelector((s: RootState) => s.chat);
  const [isLoading, setIsLoading] = useState(false);
  const observerTargetEl = useRef<HTMLDivElement>(null);
  const [firstLi, setFirstLi] = useState<Element | null>(null);
  const pageRef = useRef(2);

  const fetchNewMessages = () => {
    if (!pageInfo || (pageInfo && pageInfo.totalPage < pageRef.current)) return;
    setIsLoading(true);
    setTimeout(() => {
      getData(
        `${process.env.REACT_APP_API_URL}/api/messages/${chatInfo.receiver.memberId}?page=${pageRef.current}&size=30`,
        (res) => {
          setIsScroll(false);
          addPrevMessages(res.data.data);
          setTimeout(() => {
            firstLi?.scrollTo(0, firstLi?.clientHeight * 3);
          }, 0);
          pageRef.current += 1;
          setIsLoading(false);
        },
        (err) => {
          console.error(err);
          setIsLoading(false);
        },
        {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        }
      );
    }, 100);
  };

  useEffect(() => {
    if (!observerTargetEl.current || !pageInfo) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetchNewMessages();
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [messageResponse]);

  useEffect(() => {
    if (lastLi && isScroll) lastLi.scrollIntoView();
    setIsScroll(true);
  }, [lastLi]);

  return (
    <>
      <button onClick={fetchNewMessages}>test</button>
      <StyledUL ref={setFirstLi}>
        {isLoading ? <Loading /> : <StyledScrollDiv ref={observerTargetEl} />}
        {messageResponse.map((item, i) =>
          i === messageResponse.length - 1 ? (
            <div key={i} className='last' ref={setLastLi}>
              <SingleMessage
                senderId={item.senderId}
                content={item.content}
                createdAt={item.createdAt}
              />
            </div>
          ) : (
            <SingleMessage
              key={i}
              senderId={item.senderId}
              content={item.content}
              createdAt={item.createdAt}
            />
          )
        )}
      </StyledUL>
    </>
  );
};

export default MessageOutput;

const StyledUL = styled.ul`
  display: flex;
  flex: 1 0 0;
  gap: 4rem;
  flex-direction: column;
  height: 50rem;
  overflow-y: scroll;
  padding: 0.5rem;
  margin-bottom: 2rem;
  > :first-child {
    margin-top: auto;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledScrollDiv = styled.div`
  height: 100px;
`;
