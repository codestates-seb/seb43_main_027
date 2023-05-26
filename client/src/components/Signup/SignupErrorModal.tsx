import Modal from '../common/Modal';

const SingupErrorModal = ({
  isOpen,
  confirmMessage,
  closeHandler
}: {
  isOpen: boolean;
  confirmMessage: string;
  closeHandler: () => void;
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        confirmMessage={confirmMessage}
        closeModalHandlerWithConfirm={closeHandler}
      />
    </>
  );
};

export default SingupErrorModal;
