import React, { useState } from 'react';
import styled from 'styled-components';

import ButtonEl from '../elements/Button';

const Modal = ({ confirmMessage }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  console.log(confirmMessage);
  return (
    <>
      <ModalContainer>
        <ModalButton onClick={openModalHandler}>
          {isOpen === false ? 'Open Modal' : 'Opened!'}
        </ModalButton>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <span onClick={openModalHandler} className='close-btn'>
                &times;
              </span>
              <div className='desc'>{confirmMessage}</div>
              <ModalConfirmButton>확인</ModalConfirmButton>
              <ModalCancelButton>취소</ModalCancelButton>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default Modal;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

// export const ModalBtn = styled.button`
//   background-color: #4000c7;
//   text-decoration: none;
//   border: none;
//   padding: 20px;
//   color: white;
//   border-radius: 30px;
//   cursor: grab;
// `;

const ModalButton = ButtonEl({
  bg: 'white',
  padding: '20px',
  radius: '30px'
});

const ModalConfirmButton = ButtonEl({
  bg: 'var(--cyan-dark-400)',
  hoverBg: 'var(--cyan-dark-500)'
});

const ModalCancelButton = ButtonEl({
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)'
});

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog'
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 45rem;
  height: 15rem;

  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;
