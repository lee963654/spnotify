const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST"
const GET_ALL_PLAYLISTS = "playlists/GET_ALL_PLAYLISTS"
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST"
const ADD_SONG_TO_PLAYLIST = "playlists/ADD_SONG_TO_PLAYLIST"
const REMOVE_SONG_FROM_PLAYLIST = "playlists/REMOVE_SONG_FROM_PLAYLIST"
const CREATE_PLAYLIST_REVIEW = "playlists/CREATE_PLAYLIST_REVIEW"
const GET_PLAYLIST_REVIEWS = "playlists/GET_PLAYLIST_REVIEWS"
const UPDATE_PLAYLIST_REVIEW = "playlists/UPDATE_PLAYLIST_REVIEW"
const DELETE_PLAYLIST_REVIEW = "playlists/DELETE_PLAYLIST_REVIEW"


const getUserPlaylists = (playlists) => ({
    type: GET_USER_PLAYLISTS,
    playlists,
})

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist,
})

const deletePlaylist = (playlist) => ({
    type: DELETE_PLAYLIST,
    playlist,
})

const getAllPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLISTS,
    playlists,
})

const updatePlaylistAction = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
})

const addSongToPlaylist = (playlist) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlist
})

const createPlaylistReviewAction = (playlistReview) => ({
    type: CREATE_PLAYLIST_REVIEW,
    playlistReview
})

const getPlaylistReviewsAction = (playlistReviews) => ({
    type: GET_PLAYLIST_REVIEWS,
    playlistReviews
})

const updatePlaylistReviewAction = (playlistReview) => ({
    type: UPDATE_PLAYLIST_REVIEW,
    playlistReview
})

const deletePlaylistReviewAction = (playlistReview) => ({
    type: DELETE_PLAYLIST_REVIEW,
    playlistReview
})


export const getUserPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch("/api/playlists/user")
    const playlists = await response.json()

    if (response.ok) {

        dispatch(getUserPlaylists(playlists))
        return playlists
    } else {
        return playlists
    }
}

export const createPlaylistThunk = (formData) => async (dispatch) => {
    const response = await fetch("/api/playlists/", {
        method: "POST",
        body: formData
    })
    const newPlaylist = await response.json()
    if (response.ok) {
        dispatch(createPlaylist(newPlaylist))
        return newPlaylist
    } else {
        return newPlaylist
    }
}

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE"
    })
    const deletedPlaylist = await response.json()
    console.log("THIS IS THE DELETEDPLAYLIST IN THE THUNK", deletedPlaylist)
    if (response.ok) {
        dispatch(deletePlaylist(deletedPlaylist))
        return deletedPlaylist
    } else {
        return deletedPlaylist
    }
}

export const getAllPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/playlists/`)
    const allPlaylists = await response.json()
    if (response.ok) {
        dispatch(getAllPlaylists(allPlaylists))
        return allPlaylists
    } else {
        return allPlaylists
    }
}

export const updatePlaylistThunk = (playlistId, formData) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/update`, {
        method: "PUT",
        body: formData
    })
    const updatePlaylist = await response.json()
    if (response.ok) {
        dispatch(updatePlaylistAction(updatePlaylist))
        return updatePlaylist
    } else {
        return updatePlaylist
    }
}

export const addSongToPlaylistThunk = (songId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/${songId}`, {
        method: "POST"
    })
    const addedSongToPlaylist = await response.json()
    if (response.ok) {
        dispatch(updatePlaylistAction(addedSongToPlaylist))
        return addedSongToPlaylist
    } else {
        return addedSongToPlaylist
    }
}

export const removeSongFromPlaylistThunk = (songId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/${songId}`, {
        method: "DELETE"
    })
    const removedSongFromPlaylist = await response.json()
    if (response.ok) {
        dispatch(updatePlaylistAction(removedSongFromPlaylist))
        return removedSongFromPlaylist
    } else {
        return removedSongFromPlaylist
    }
}

export const createPlaylistReviewThunk = (formData, currentPlaylistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/reviews/${currentPlaylistId}`, {
        method: "POST",
        body: formData
    })
    const newPlaylistReview = await response.json()
    if (response.ok) {
        dispatch(createPlaylistReviewAction(newPlaylistReview))
        return newPlaylistReview
    } else {
        return newPlaylistReview
    }
}

export const getAllPlaylistReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/reviews/all`)
    const allPlaylistReviews = await response.json()
    if (response.ok) {
        dispatch(getPlaylistReviewsAction(allPlaylistReviews))
        return allPlaylistReviews
    } else {
        return allPlaylistReviews
    }
}

export const updatePlaylistReviewThunk = (formData, reviewId) => async (dispatch) => {
    console.log("the form data in the thunk", formData.get("review"))
    const response = await fetch(`/api/playlists/reviews/edit/${reviewId}`, {
        method: "PUT",
        body: formData
    })

    const updatedPlaylistReview = await response.json()
    if (response.ok) {
        dispatch(updatePlaylistReviewAction(updatedPlaylistReview))
        return updatedPlaylistReview
    } else {
        return updatedPlaylistReview
    }
}

export const deletePlaylistReviewThunk = (playlistReviewId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/reviews/${playlistReviewId}/delete`, {
        method: "DELETE"
    })
    const deletedPlaylistReview = await response.json()
    if (response.ok) {
        dispatch(deletePlaylistReviewAction(deletedPlaylistReview))
        return deletedPlaylistReview
    } else {
        return deletedPlaylistReview
    }
}


const initialState = { allPlaylists: {}, userPlaylists: {}, playlistReviews: {}}

export default function reducer(state = initialState, action) {
    const newState = {...state, allPlaylists: {...state.allPlaylists}, userPlaylists: {...state.userPlaylists}, playlistReviews: {...state.playlistReviews}}
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            newState.userPlaylists = {...action.playlists}
            return newState
        case CREATE_PLAYLIST:
            newState.userPlaylists[action.playlist.id] = action.playlist
            newState.allPlaylists[action.playlist.id] = action.playlist
            return newState
        case DELETE_PLAYLIST:
            delete newState.allPlaylists[action.playlist.id]
            delete newState.userPlaylists[action.playlist.id]
            return newState
        case GET_ALL_PLAYLISTS:
            newState.allPlaylists = {...action.playlists}
            return newState
        case UPDATE_PLAYLIST:
            newState.allPlaylists[action.playlist.id] = action.playlist
            newState.userPlaylists[action.playlist.id] = action.playlist
            return newState
        case CREATE_PLAYLIST_REVIEW:
            newState.playlistReviews[action.playlistReview.id] = action.playlistReview
            return newState
        case GET_PLAYLIST_REVIEWS:
            newState.playlistReviews = {...action.playlistReviews}
            return newState
        case UPDATE_PLAYLIST_REVIEW:
            newState.playlistReviews[action.playlistReview.id] = action.playlistReview
            return newState
        case DELETE_PLAYLIST_REVIEW:
            delete newState.playlistReviews[action.playlistReview.id]
            return newState
        default:
            return state
    }
}
