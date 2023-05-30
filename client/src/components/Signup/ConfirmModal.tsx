import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import ButtonEl from '../elements/Button';
import Timer from './Timer';
import { ButtonType } from '../../types/componentsTypes';

/** Modal 창이 포함된 Button 컴포넌트 입니다. 가장 바깥 div의 크기가 100%로 지정되어있으므로 감싸는 Container로 크기를 조정해 줄 수 있습니다.
 *
 * @param {string}buttonName -확인버튼의 표시되는 텍스트입니다. ex) 삭제, 언팔로우
 * @param {string}buttonTextWhileBackground -확인모달이 활성화 중에 백그라운드에 표시되는 버튼 텍스트입니다. ex) 언팔로우 확인 모달 표출 중 언팔로우 버튼의 텍스트
 * @param {string}comfirmMessage -확인 내용을 표시하는 인자입니다. ex) 정말 삭제하시겠습니까?
 * @param {function}comfirmOnClick -모달 창에서 확인을 눌렀을 경우 실행되고자 하는 함수를 () => void 형태로 사용할 수 있습니다.
 * @param {function}cancelOnClick -모달 창에서 취소를 눌렀을 경우 실행되고자 하는 함수를 () => void 형태로 사용할 수 있습니다.
 * @returns {JSX.Element} - 페이지에 존재하는 Button 대신에 Modal을 넣으면 모달 창이 포함된 버튼으로 바꿀 수 있습니다.
 *
 *
 */

const ConfirmModal = ({
  confirmMessage,
  confirmOnClick,
  cancelOnClick,
  children
}: ModalButtonType): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const closeModalHandlerWithConfirm = (value: string) => {
    if (confirmOnClick) {
      console.log('this works');
      console.log(value);
      confirmOnClick(value);
    }
    openModalHandler();
  };

  const closeModalHandlerWithCancel = () => {
    openModalHandler();
    if (cancelOnClick) cancelOnClick();
  };
  const inputhandler = (e: any) => setInputValue(e.target.value);
  return (
    <StyledModalContainer>
      <StyledModalButtonContainer>
        <StyledDiv onClick={openModalHandler}>{children}</StyledDiv>
      </StyledModalButtonContainer>
      {isOpen && (
        //  모달 바깥을 클릭해도 취소가 되도록 할지 여부에 따라 backdrop 온클릭 속성 유무 결정
        <StyledModalBackdrop onClick={openModalHandler}>
          <StyledModalView onClick={(e) => e.stopPropagation()}>
            <StyledConfirmMessageContainer>
              <StyledConfirmMessage>{confirmMessage}</StyledConfirmMessage>
              <StyledInput
                type='text'
                onChange={inputhandler}
                value={inputValue}
              />
            </StyledConfirmMessageContainer>
            <Timer />
            <ModalConfirmButton
              onClick={(event) => {
                event.stopPropagation();
                closeModalHandlerWithConfirm(inputValue);
              }}
            >
              확인
            </ModalConfirmButton>
            <ModalCancelButton onClick={closeModalHandlerWithCancel}>
              취소
            </ModalCancelButton>
          </StyledModalView>
        </StyledModalBackdrop>
      )}
    </StyledModalContainer>
  );
};

interface ModalButtonType extends ButtonType {
  confirmMessage: string;
  confirmOnClick?: (value: string) => void;
  cancelOnClick?: () => void;
  children: ReactElement;
}

export default ConfirmModal;

const StyledModalBackdrop = styled.div`
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

const StyledModalContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const StyledModalButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ModalConfirmButton = styled.button`
  background-color: var(--cyan-dark-400);
  border-style: none;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0.7rem;
  padding: 0.5rem 0.7rem;
  &:hover {
    background-color: var(--cyan-dark-500);
  }
`;

const ModalCancelButton = ButtonEl({
  flex: '1',
  bg: 'var(--button-inactive-color)',
  hoverBg: 'var(--button-inactive-hover-color)',
  type: 'button',
  margin: '0 0.7rem'
});

const StyledModalView = styled.div.attrs((props) => ({
  role: 'dialog'
}))`
  border-radius: 6px;
  background-color: #ffffff;
  width: 45rem;
  height: 15rem;

  @media screen and (max-width: 650px) {
    width: 30rem;
    /* height: 10rem; */
  }
`;

const StyledConfirmMessageContainer = styled.div`
  display: flex;
  height: 60%;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledConfirmMessage = styled.div`
  display: flex;
  margin-top: 1.8rem;
  font-size: 1.8rem;
`;

const StyledInput = styled.input`
  margin-top: 1.9rem;
  margin-left: 1rem;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid var(--cyan-dark-500);
  border-radius: 5px;
`;

const StyledDiv = styled.div`
  width: 100%;
`;
