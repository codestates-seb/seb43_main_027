import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';
import { useEffect, useRef, useState } from 'react';
import { PageInfoType } from '../../types/dataTypes';
import { getData } from '../../api/apiCollection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loading from '../common/Loading';
import Modal from '../common/Modal';

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
  const [isOpen, setIsOpen] = useState(false);
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
          setIsOpen(true);
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
      <StyledUL ref={setFirstLi}>
        {isLoading ? (
          <StyledLoadingContainer>
            <Loading />
          </StyledLoadingContainer>
        ) : (
          <StyledScrollDiv ref={observerTargetEl} />
        )}
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
      <Modal
        isOpen={isOpen}
        closeModalHandlerWithConfirm={() => setIsOpen(false)}
        confirmMessage='내용을 불러오는 도중 문제가 발생했습니다.'
      />
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
  padding: 0.5rem 2rem;
  margin-bottom: 2rem;

  > :first-child {
    margin-top: auto;
  }
`;

const StyledScrollDiv = styled.div`
  height: 100px;
`;

const StyledLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
