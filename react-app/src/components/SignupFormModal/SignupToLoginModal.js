import React from 'react';
import { useModal } from '../../context/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SignupToLoginModal({
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
    <Link className="signup-to-login-link" onClick={onClick}>Log in</Link>
  );
}

export default SignupToLoginModal;
