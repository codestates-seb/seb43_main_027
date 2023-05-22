import styled from 'styled-components';

import axios from 'axios';

import { useState } from 'react';

import InputContainer from '../common/InputContainer';

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
      <StyledInputContainer title='' type='text' extraAction={sendMessage} />
    </StyledContainer>
  );
};

export default MessageSend;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledInputContainer = styled(InputContainer)``;
