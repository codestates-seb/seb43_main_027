import Modal from './ConfirmModal';

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
    <>
      <Modal confirmMessage={confirmMessage} confirmOnClick={closeHandler}>
        {children}
      </Modal>
    </>
  );
};

export default SingupConfirmModal;
