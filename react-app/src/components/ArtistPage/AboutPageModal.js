import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


export default function AboutPageModal ({aboutPicture, aboutContent}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    return (
        <div className="about-modal-container">
            <div className="about-picture-modal">
                <img className="modal-picture" src={aboutPicture}></img>
            </div>
            <div className="modal-about-info">
                <p>{aboutContent}</p>
            </div>
        </div>
    )
}
