import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAlbumReviewThunk, getAlbumReviewsThunk, updateAlbumReviewThunk, getAllAlbumReviewsThunk } from "../../store/albumReviews";
import "./CreateAlbumReview.css"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


export default function CreateAlbumReviewModal({ formType, currentAlbumId, currentAlbum, albumReview, reviewId }) {
    const history = useHistory()
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [review, setReview] = useState(albumReview?.review || "")
    // const [stars, setStars] = useState(albumReview?.star_review)
    // const [activeStars, setActiveStars] = useState(stars)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const formData = new FormData()
        formData.append("album_id", currentAlbumId)
        formData.append("review", review)
        // formData.append("star_review", stars)

        if (formType === "new") {
            const newAlbumReview = await dispatch(createAlbumReviewThunk(formData, currentAlbumId))
            if (newAlbumReview.errors) {
                setErrors(newAlbumReview.errors)
                setHasSubmitted(false)
            } else {
                setHasSubmitted(false)
                closeModal()
            }
        }
        if (formType === "edit") {
            const updateAlbumReview = await dispatch(updateAlbumReviewThunk(formData, reviewId))
            if (updateAlbumReview.errors) {
                setErrors(updateAlbumReview.errors)
                setHasSubmitted(false)
            } else {
                dispatch(getAlbumReviewsThunk(currentAlbum?.id))
                dispatch(getAllAlbumReviewsThunk())
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
        dispatch(getAllAlbumReviewsThunk())
        dispatch(getAlbumReviewsThunk(currentAlbum?.id))
    }, [dispatch, hasSubmitted])

    const newReview = "new-album-review-form-container"
    const updateReview = "update-album-review-form-container"

    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                {/* <h1>Write a review for the album <span>{currentAlbum.name}</span></h1> */}
                {formType === "new" ?
                <h1>Write a review for the album <span>{currentAlbum.name}</span></h1>
                :
                <h1>Edit a review for the album <span>{currentAlbum.name}</span></h1>
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
                {/* <div className="stars-container">
                    <div
                        className={activeStars >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(1)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(1) }}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(2)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(2) }}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(3)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(3) }}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(4)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(4) }}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(5)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(5) }}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>

                    </div>
                    <div>Stars</div>
                </div> */}
                <button className="review-form-submit-button" disabled={review.length < 10 || review.length > 1000}>Submit Your Review</button>
            </form>
        </div>
    )
}
