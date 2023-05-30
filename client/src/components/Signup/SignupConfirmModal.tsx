import styled from 'styled-components';

import ConfirmModal from './ConfirmModal';

const SingupConfirmModal = ({
  children,
  confirmMessage,
  closeHandler
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
