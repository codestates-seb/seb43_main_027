import styled from 'styled-components';

import axios from 'axios';

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
        <StyledInputContainer placeholder='메시지를 입력하세요.' />
        <StyledSubmitButton>전송</StyledSubmitButton>
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
