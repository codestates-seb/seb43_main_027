import Modal from '../common/Modal';

const SingupModal = ({
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

export default SingupModal;
