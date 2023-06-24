import React from 'react';
import { useModal } from '../../context/Modal';


function OpenModalAuthCheck({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    mainButtonTest,
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        <div className={mainButtonTest === true? "middle-play-container" : "artist-page-play-button"}>
            <i  onClick={onClick} class={mainButtonTest === true ? "fa-solid fa-play fa-lg" : "fa-solid fa-play"}></i>
        </div>

    );
}

export default OpenModalAuthCheck;
