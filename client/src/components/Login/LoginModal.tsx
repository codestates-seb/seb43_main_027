import Modal from '../common/Modal';

const LoginModal = ({
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
        needError={false}
        isOpen={isOpen}
        confirmMessage={confirmMessage}
        closeModalHandlerWithConfirm={closeHandler}
      />
    </>
  );
};

export default LoginModal;
