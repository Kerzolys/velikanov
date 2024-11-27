export type ModalUIProps = {
  isOpen: boolean;
  onClose: (evt: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  closeButtonRef: React.RefObject<HTMLButtonElement>;
  // className?: string;
};
