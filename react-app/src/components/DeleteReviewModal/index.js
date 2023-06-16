import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


export default function DeleteAlbumReviewModal({reviewId, currentAlbum}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const handleDeleteButton = async (e) => {
        e.preventDefault()
        // await dispatch(deleteAlbumReviewThunk(reviewId))

        closeModal()
    }

    const handleCancelButton = (e) => {
        e.preventDefault()
        closeModal()
    }


    return (
        <div className="delete-review-container">
            <h1>Delete Review?</h1>
            <p>This will delete your review of the album {currentAlbum?.name}</p>
            <button onClick={e => handleCancelButton(e)}>Cancel</button>
            <button onClick={e => handleDeleteButton(e)}>Delete</button>
        </div>
    )
}
