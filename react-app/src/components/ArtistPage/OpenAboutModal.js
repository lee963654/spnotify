import React from 'react';
import { useModal } from '../../context/Modal';


function OpenAboutModal({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    aboutPicture,
    aboutContent,
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        <div className="artist-page-about-section" onClick={onClick} style ={{
            backgroundImage: `url(${aboutPicture})`
        }}>
            {aboutContent?.length > 200 ? <div className="about-info-container">{`${aboutContent.slice(0, 200)}...`}</div> : <div className="about-info-container">{aboutContent}</div>}
        </div>
    );
}

export default OpenAboutModal;
