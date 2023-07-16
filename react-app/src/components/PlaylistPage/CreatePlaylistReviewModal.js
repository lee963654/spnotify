import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAlbumReviewsThunk, updateAlbumReviewThunk, getAllAlbumReviewsThunk } from "../../store/albumReviews";
// import "./CreateAlbumReview.css"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createPlaylistReviewThunk, getAllPlaylistReviewThunk, updatePlaylistReviewThunk } from "../../store/playlists";

export default function CreatePlaylistReviewModal({ formType, currentPlaylistId, playlistReview, currentPlaylist, reviewId }) {
    const history = useHistory()
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [review, setReview] = useState(playlistReview?.review || "")
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const formData = new FormData()
        formData.append("playlist_id", currentPlaylistId)
        formData.append("review", review)
        // formData.append("star_review", stars)
        console.log("the formdata", formData.get("review"))
        if (formType === "newPlaylist") {
            const newPlaylistReview = await dispatch(createPlaylistReviewThunk(formData, currentPlaylistId))
            if (newPlaylistReview.errors) {
                setErrors(newPlaylistReview.errors)
                setHasSubmitted(false)
            } else {
                setHasSubmitted(false)
                closeModal()
            }
        }
        if (formType === "editPlaylist") {
            console.log("in the edit playlist conditional")
            const updatePlaylistReview = await dispatch(updatePlaylistReviewThunk(formData, reviewId))

            if (updatePlaylistReview.errors) {
                setErrors(updatePlaylistReview.errors)
                setHasSubmitted(false)
            } else {
                // dispatch(getAlbumReviewsThunk(currentAlbum?.id))
                // dispatch(getAllAlbumReviewsThunk())
                dispatch(getAllPlaylistReviewThunk())
                setHasSubmitted(false)
                closeModal()
            }
        }
    }

    useEffect(() => {
        const errors = {}
        if (review.length > 1000) errors.review = "Review must be fewer than 1000 characters"

        setErrors(errors)
    }, [review])


    useEffect(() => {
        // dispatch(getAllAlbumReviewsThunk())
        // dispatch(getAlbumReviewsThunk(currentAlbum?.id))
        dispatch(getAllPlaylistReviewThunk())
    }, [dispatch, hasSubmitted])

    const newReview = "new-album-review-form-container"
    const updateReview = "update-album-review-form-container"

    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                {/* <h1>Write a review for the album <span>{currentAlbum.name}</span></h1> */}
                {formType === "newPlaylist" ?
                <h1>Write a review for the Playlist <span>{currentPlaylist.name}</span></h1>
                :
                <h1>Edit a review for the Playlist <span>{currentPlaylist.name}</span></h1>
                }
                {errors.review && <div className="errors">{errors.review}</div>}
                <textarea
                    className="album-review-textarea"
                    minLength="10"
                    rows="10"
                    cols="60"
                    type="text"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <button className="review-form-submit-button" disabled={review.length < 10 || review.length > 1000}>Submit Your Review</button>
            </form>
        </div>
    )
}
