const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST"
const GET_ALL_PLAYLISTS = "playlists/GET_ALL_PLAYLISTS"
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST"


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


const initialState = { allPlaylists: [], userPlaylists: {}}

export default function reducer(state = initialState, action) {
    const newState = {...state, allPlaylists: [], userPlaylists: {...state.userPlaylists}}
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            newState.userPlaylists = {...action.playlists}
            return newState
        case CREATE_PLAYLIST:
            newState.userPlaylists[action.playlist.user_id].push(action.playlist)
            return newState
        case DELETE_PLAYLIST:
            const deleteState = newState.userPlaylists[action.playlist.user_id].filter(playlist =>
                playlist.id !== action.playlist.id
            )
            const returnState = {...state, allPlaylists: {...state.allPlaylists}, userPlaylists: {...deleteState}}
            return returnState
        case GET_ALL_PLAYLISTS:
            newState.allPlaylists = action.playlists
            return newState
        case UPDATE_PLAYLIST:
            console.log("IN THE REDUCER THE NEWSTATE", newState)

            newState.allPlaylists[action.playlist.id] = action.playlist
            const userState = newState.userPlaylists[action.playlist.user_id].filter(playlist => playlist.id !== action.playlist.id)
            userState.push(action.playlist)
            newState.userPlaylists[action.playlist.user_id] = userState
            return newState
        default:
            return state
    }
}