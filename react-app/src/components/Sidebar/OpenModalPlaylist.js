import React from 'react';
import { useModal } from '../../context/Modal';
import "./Sidebar.css"

export default function OpenModalPlaylist({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className="trash-can" onClick={onClick}><i class="fa-regular fa-trash-can"></i></div>
  );
}
