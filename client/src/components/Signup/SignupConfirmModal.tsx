import styled from 'styled-components';

import ConfirmModal from './ConfirmModal';

const SingupConfirmModal = ({
  children,
  confirmMessage,
  closeHandler,
  isOpen
}: {
  children: React.ReactElement;
  isOpen: boolean;
  confirmMessage: string;
  closeHandler: (value: string) => void;
}) => {
  return (
    <StyledContainer>
      <ConfirmModal
        confirmMessage={confirmMessage}
        confirmOnClick={closeHandler}
        isOpenConfirm={isOpen}
      >
        {children}
      </ConfirmModal>
    </StyledContainer>
  );
};

export default SingupConfirmModal;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;
