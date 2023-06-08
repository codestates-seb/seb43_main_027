import { useEffect, useState } from 'react';
import styled from 'styled-components';

const NoticeModal = () => {
  const [show, setShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const onCloseButtonClickHandler = () => {
    isChecked && localStorage.setItem('notice', Date.now().toString());
    setShow(false);
  };

  const onChangeHandler = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    const closedTime = localStorage.getItem('notice');

    if (!closedTime) {
      setShow(true);
    } else if (Date.now() - parseInt(closedTime) >= 1000 * 60 * 60 * 24) {
      localStorage.removeItem('notice');
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show && (
        <StyledWrapper className='modal'>
          <StyledContainer>
            <StyledCloseBtn onClick={onCloseButtonClickHandler}>
              X
            </StyledCloseBtn>
            <StyledHeaderContainer>
              <StyledHeader>인디버디에 방문해주셔서 감사합니다!</StyledHeader>
            </StyledHeaderContainer>
            <StyledContentContainer>
              <StyledContent>
                즐겨하는 <strong>인디 게임을 등록</strong>해보세요!
              </StyledContent>
              <StyledContent>
                함께 게임을 하고 싶은 <strong>친구들을 찾아보아요!</strong>
              </StyledContent>
            </StyledContentContainer>
            <StyledCheckBoxContainer>
              <span>하루동안 그만보기</span>
              <input type='checkbox' onChange={onChangeHandler} />
            </StyledCheckBoxContainer>
          </StyledContainer>
        </StyledWrapper>
      )}
    </>
  );
};

export default NoticeModal;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
`;

const StyledContainer = styled.div`
  display: flex;
  top: 50px;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  padding: 2rem;
  position: static;
  left: 50px;
  width: 80vw;
  max-height: 50vh;
  border-radius: 10px;

  @media screen and (min-width: 650px) {
    width: 60rem;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  font-size: 1.2rem;
  margin: 2rem 0;
  @media screen and (min-width: 650px) {
    font-size: 1.6rem;
  }
`;

const StyledContent = styled.div`
  > strong {
    color: var(--cyan-dark-500);
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledHeader = styled.h2`
  flex: 1 0 0;
  font-size: 1.4rem;
  text-align: center;
  padding: 0.5rem;

  @media screen and (min-width: 650px) {
    font-size: 2rem;
  }
`;

const StyledCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledCloseBtn = styled.button`
  background-color: var(--cyan-dark-400);
  color: white;
  border-style: none;
  height: 2rem;
  border-radius: 5px;
  width: fit-content;
  align-self: flex-end;
  margin-bottom: 2rem;
`;
