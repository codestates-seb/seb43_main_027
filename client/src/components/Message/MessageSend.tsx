import styled from 'styled-components';

import axios from 'axios';

import { useState } from 'react';

import InputContainer from '../common/InputContainer';
import ButtonEl from '../elements/Button';

type SendType = {
  receiverId: number;
};

const MessageSend = ({ receiverId }: SendType) => {
  const sendMessage = (value: string) => {
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: token
    };
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/messages/${receiverId}`,
      { content: value },
      { headers }
    );
  };

  return (
    <StyledContainer>
      <StyledForm>
        <StyledInputContainer title='' type='text' extraAction={sendMessage} />
        <StyledSubmitButton>전송</StyledSubmitButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default MessageSend;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
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

const StyledInputContainer = styled(InputContainer)``;
