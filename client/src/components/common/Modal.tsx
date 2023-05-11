import React, { useState } from 'react';
import styled from 'styled-components';

import ButtonEl from '../elements/Button';

const Modal = ({ confirmMessage, confirmOnClick, cancelOnClick }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const closeModalHandler = () => {
    openModalHandler();
    if (cancelOnClick) cancelOnClick();
  };

  return (
    <>
      <ModalContainer>
        <ModalButton onClick={openModalHandler}>
          {isOpen === false ? 'Open Modal' : 'Opened!'}
        </ModalButton>
        {isOpen === true ? (
          //  모달 바깥을 클릭해도 취소가 되도록 할지 여부에 따라 backdrop 온클릭 속성 유무 결정
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className='desc'>{confirmMessage}</div>
              <ModalConfirmButton onClick={confirmOnClick}>
                확인
              </ModalConfirmButton>
              <ModalCancelButton onClick={closeModalHandler}>
                취소
              </ModalCancelButton>
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

const ModalButton = ButtonEl({
  // bg: 'var(--cyan-light-400)',
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

  @media screen and (max-width: 650px) {
    width: 30rem;
    height: 10rem;
  }
`;
