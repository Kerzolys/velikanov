import { ModalGallery } from "components/modal-gallery/modal-gallery";
import { Modal } from "components/modal/modal";
import { Slider } from "components/slider/slider"
import { useState } from "react";

export const ContentGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    setIsModal(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setIsModal(false);
  }
  return (
    <>
      <Slider onClick={openModal} isModal={isModal} />
      {modalOpen &&
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <ModalGallery isModal={isModal}  />
        </Modal>}
    </>
  )
}