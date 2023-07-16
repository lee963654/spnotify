import React from 'react';
import { useModal } from '../../context/Modal';

function OpenPlaylistReviewButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  type,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    // <div className="album-review-button" onClick={onClick}><i class="fa-regular fa-pen-to-square fa-xl"></i></div>
    <div className="album-review-button" onClick={onClick}><i class={
      type === "new-playlist" ? "fa-regular fa-pen-to-square fa-lg"
      :
      type === "edit-playlist" ? "fa-solid fa-pencil fa-lg"
      :
      "fa-solid fa-ban fa-lg"
      }></i></div>
  );
}

export default OpenPlaylistReviewButton;
