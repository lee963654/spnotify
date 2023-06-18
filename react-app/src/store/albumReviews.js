const GET_ALBUM_REVIEWS = "reviews/GET_ALBUM_REVIEWS"
const CREATE_ALBUM_REVIEW = "reviews/CREATE_ALBUM_REVIEW"
const DELETE_ALBUM_REVIEW = "reviews/DELETE_ALBUM_REVIEW"
const UPDATE_ALBUM_REVIEW = "reviews/UPDATE_ALBUM_REVIEW"
const GET_ALL_ALBUM_REVIEWS = "reviews/GET_ALL_ALBUM_REVIEWS"


const getAlbumReviews = (reviews) => ({
    type: GET_ALBUM_REVIEWS,
    reviews
})

const createAlbumReview = (review) => ({
    type: CREATE_ALBUM_REVIEW,
    review
})

const deleteAlbumReviewAction = (review) => ({
    type: DELETE_ALBUM_REVIEW,
    review
})

const updateAlbumReviewAction = (review) => ({
    type: UPDATE_ALBUM_REVIEW,
    review
})

const getAllAlbumReviews = (reviews) => ({
    type: GET_ALL_ALBUM_REVIEWS,
    reviews
})



export const getAllAlbumReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/albums/reviews")
    const allAlbumReviews = await response.json()
    if (response.ok) {
        dispatch(getAllAlbumReviews(allAlbumReviews))
        console.log("ALL ALBUM REVIEWS IN THE THUNK", allAlbumReviews)
        return allAlbumReviews
    } else {
        return allAlbumReviews
    }
}

export const getAlbumReviewsThunk = (albumId) => async (dispatch) => {
    console.log("IN THE ALBUM REVIEWS THUNK")
    const response = await fetch(`/api/albums/${albumId}/reviews`)
    const albumReviews = await response.json()
    console.log("THE ALBUM REVIEWS IN THE THUNK", albumReviews)
    if (response.ok) {
        dispatch(getAlbumReviews(albumReviews))
        return albumReviews
    } else {
        return albumReviews
    }
}

export const createAlbumReviewThunk = (formData, albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}/reviews/new`, {
        method: "POST",
        body: formData
    })
    const newAlbumReview = await response.json()
    if (response.ok) {
        dispatch(createAlbumReview(newAlbumReview))
        return newAlbumReview
    } else {
        return newAlbumReview
    }
}

export const deleteAlbumReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${reviewId}/delete`, {
        method: "DELETE"
    })
    const deletedAlbumReview = await response.json()
    if (response.ok) {
        dispatch(deleteAlbumReviewAction(deletedAlbumReview))
        return deletedAlbumReview
    } else {
        return deletedAlbumReview
    }
}

export const updateAlbumReviewThunk = (formData, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/albums/reviews/${reviewId}/update`, {
        method: "PUT",
        body: formData
    })
    const updatedAlbumReview = await response.json()
    if (response.ok) {
        dispatch(updateAlbumReviewAction(updatedAlbumReview))
        return updatedAlbumReview
    } else {
        return updatedAlbumReview
    }
}



const initialState = { allAlbumReviews: {}, singleAlbumReviews: {} }

export default function reducer(state = initialState, action) {
    const newState = { ...state, allAlbumReviews: { ...state.allAlbumReviews }, singleAlbumReviews: { ...state.singleAlbumReviews } }

    switch (action.type) {
        case GET_ALBUM_REVIEWS:
            newState.singleAlbumReviews = {...action.reviews}
            return newState
        case CREATE_ALBUM_REVIEW:
            newState.allAlbumReviews[action.review.id] = action.review
            newState.singleAlbumReviews[action.review.id] = action.review
            return newState
        case DELETE_ALBUM_REVIEW:
            delete newState.allAlbumReviews[action.review.id]
            delete newState.singleAlbumReviews[action.review.id]
            return newState
        case UPDATE_ALBUM_REVIEW:
            newState.allAlbumReviews[action.review.id] = action.review
            newState.singleAlbumReviews[action.review.id] = action.review
            return newState
        case GET_ALL_ALBUM_REVIEWS:
            newState.allAlbumReviews = {...action.reviews}
            return newState
        default:
            return state
    }
}
