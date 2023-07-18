import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistReviewThunk } from "../../store/playlists";

export default function DeletePlaylistReviewModal({ playlistReview, playlistReviewId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleDeletePlaylistReviewButton = async (e) => {
        e.preventDefault()
        // await dispatch(deleteAlbumReviewThunk(reviewId))
        // dispatch(getAlbumReviewsThunk(currentAlbum?.id))
        await dispatch(deletePlaylistReviewThunk(playlistReviewId))
        closeModal()
    }

    const handleCancelButton = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="delete-review-container">
            <h1>Delete Review?</h1>
            <p>This will delete your review of the playlist {playlistReview?.name}</p>
            <div className="delete-review-buttons-container">
                <button className="delete-review-button" onClick={e => handleCancelButton(e)}>Cancel</button>
                <button className="delete-review-button" onClick={e => handleDeletePlaylistReviewButton(e)}>Delete</button>
            </div>
        </div>
    )
}
