import React from 'react';
import styled from 'styled-components';
import ButtonEl from '../elements/Button';
import Img404 from '../../asset/404.png';
import { useNavigate } from 'react-router-dom';

interface Prop404 {
  message404?: string;
  buttonMessage?: string;
  where?: string;
}

const Page404: React.FunctionComponent<Prop404> = ({
  message404 = '페이지를 찾을 수 없습니다.',
  buttonMessage = 'Back to Home',
  where = ''
}: Prop404) => {
  const navigate = useNavigate();

  const moveSomewhere = (where: string) => {
    navigate(`/${where}`);
  };

  return (
    <Styled404Wrapper>
      <StyledBackground src={Img404} />
      <StyledContainer>
        <StyledMessageContainer>
          <StyledMessage>{message404}</StyledMessage>
        </StyledMessageContainer>
        <ButtonContainer>
          <StyledButton onClick={() => moveSomewhere(where)}>
            {buttonMessage}
          </StyledButton>
        </ButtonContainer>
      </StyledContainer>
    </Styled404Wrapper>
  );
};

export default Page404;

const Styled404Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const StyledBackground = styled.img`
  margin: 20rem 0rem 1rem -5rem;
  position: fixed;
  width: 100%;
  height: 90%;
  z-index: 2;
`;

const StyledMessage = styled.div`
  margin-bottom: 2rem;
  font-size: 3.2rem;
`;
const Button = ButtonEl({
  fontColor: 'black',
  fontSize: '2.0rem'
});
const ButtonContainer = styled.div`
  background-color: transparent;
`;
const StyledButton = styled(Button)``;

const StyledMessageContainer = styled.div`
  display: flex;
  background-color: transparent;
`;

const StyledContainer = styled.div`
  margin-left: 32rem;
  margin-top: 55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  z-index: 2;
`;
