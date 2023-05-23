import styled from 'styled-components';

import SingleMessage, { Single } from './SingleMessage';
import { useEffect, useRef, useState } from 'react';
import { PageInfoType } from '../../types/dataTypes';
import { getData } from '../../api/apiCollection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
  const page = useRef(2);

  const fetchNewMessages = () => {
    if (!pageInfo || (pageInfo && pageInfo.totalSize <= pageInfo.page)) return;
    getData(
      `${process.env.REACT_APP_API_URL}/api/messages/${
        chatInfo.receiver.memberId
      }?page=${pageInfo.page + 1}&size=30`,
      (res) => {
        setIsScroll(false);
        addPrevMessages(res.data.data);
      },
      (err) => {
        console.error(err);
      },
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      }
    );
  };

  useEffect(() => {
    if (lastLi && isScroll) lastLi.scrollIntoView({ behavior: 'smooth' });
    setIsScroll(true);
  }, [lastLi]);

  return (
    <>
      <button onClick={fetchNewMessages}>test</button>
      <StyledUL>
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
