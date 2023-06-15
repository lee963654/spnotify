const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST"


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


export const getUserPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch("/api/playlists/")
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


const initialState = { allPlaylists: {}, userPlaylists: {}}

export default function reducer(state = initialState, action) {
    const newState = {...state, allPlaylists: {...state.allPlaylists}, userPlaylists: {...state.userPlaylists}}
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            newState.userPlaylists = {...action.playlists}
            return newState
        case CREATE_PLAYLIST:
            newState.userPlaylists[action.playlist.user_id].push(action.playlist)
            return newState
        case DELETE_PLAYLIST:
            console.log("THIS IS TEH DELETE REDUCER ACTION", action)
            console.log("THIS IS TEH new state", state)
            const deleteState = newState.userPlaylists[action.playlist.user_id].filter(playlist =>
                playlist.id !== action.playlist.id
            )
            console.log("THIS IS THE DELETED STATE", deleteState)
            const returnState = {...state, allPlaylists: {...state.allPlaylists}, userPlaylists: {...deleteState}}
            return returnState
        default:
            return state
    }
}
