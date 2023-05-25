import Modal from '../common/Modal';

const LoginFailModal = ({
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

export default LoginFailModal;
