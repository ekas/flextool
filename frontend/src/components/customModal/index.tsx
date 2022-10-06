import { Modal } from "antd";
import { FC } from "react";

interface CustomModalProps {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onOk: () => void;
  children: JSX.Element;
}

const CustomModal: FC<CustomModalProps> = ({
  onOk,
  title,
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      visible={isModalOpen}
      onOk={() => {
        handleOk();
        onOk();
      }}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
