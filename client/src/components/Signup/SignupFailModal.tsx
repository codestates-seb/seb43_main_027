import Modal from '../common/Modal';

const SingupFailModal = ({
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

export default SingupFailModal;
