const GET_ALBUM_REVIEWS = "reviews/GET_ALBUM_REVIEWS"


const getAlbumReviews = (reviews) => ({
    type: GET_ALBUM_REVIEWS,
    reviews
})


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



const initialState = { allAlbumReviews: {}, singleAlbumReviews: {} }

export default function reducer(state = initialState, action) {
    const newState = { ...state, allAlbumReviews: { ...state.allAlbumReviews }, singleAlbumReviews: { ...state.singleAlbumReviews } }

    switch (action.type) {
        case GET_ALBUM_REVIEWS:
            newState.singleAlbumReviews = {...action.reviews}
            return newState
        default:
            return state
    }
}
