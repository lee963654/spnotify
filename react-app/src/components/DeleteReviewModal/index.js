import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAlbumReviewThunk, getAlbumReviewsThunk } from "../../store/albumReviews";
import "./DeleteReviewModal.css"

export default function DeleteAlbumReviewModal({reviewId, currentAlbum}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const handleDeleteButton = async (e) => {
        e.preventDefault()
        await dispatch(deleteAlbumReviewThunk(reviewId))
        dispatch(getAlbumReviewsThunk(currentAlbum?.id))
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
            <div className="delete-review-buttons-container">
            <button className="delete-review-button" onClick={e => handleCancelButton(e)}>Cancel</button>
            <button className="delete-review-button" onClick={e => handleDeleteButton(e)}>Delete</button>
            </div>
        </div>
    )
}
