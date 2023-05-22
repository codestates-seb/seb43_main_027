import styled from 'styled-components';

import axios from 'axios';
import { Single } from './SingleMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRef } from 'react';
import { SubmitEvent } from '../../types/propsTypes';

type SendType = {
  receiverId: number;
  addNewMessages: (newData: Single) => void;
};

const MessageSend = ({ receiverId, addNewMessages }: SendType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((s: RootState) => s.user);

  const sendMessage = (e: SubmitEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    const value = inputRef?.current?.value;
    if (!value || value.length === 0) return;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/messages/${receiverId}`,
        JSON.stringify({ content: value }),
        { headers }
      )
      .then(() => {
        addNewMessages({
          content: value,
          createdAt: Date().toString(),
          senderId: user.memberId
        });
        if (inputRef && inputRef.current) inputRef.current.value = '';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={sendMessage}>
        <StyledInputContainer
          placeholder='메시지를 입력하세요.'
          ref={inputRef}
        />
        <StyledSubmitButton onClick={sendMessage}>전송</StyledSubmitButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default MessageSend;

const StyledContainer = styled.div`
  display: flex;
  background-color: #e6fffb;
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--cyan-dark-500);
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  :nth-child(1) {
    padding: 0;
  }
  label {
    display: none;
  }
  p {
    display: none;
  }
`;

const StyledSubmitButton = styled.button`
  background-color: var(--cyan-dark-500);
  color: white;
  border-style: none;
  border-radius: 5px;
  width: 5rem;
  height: 3rem;
`;

const StyledInputContainer = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid var(--cyan-dark-500);
  font-size: 1.4rem;
  padding: 0.5rem;
  border-radius: 5px;
`;
