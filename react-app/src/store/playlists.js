const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";


const getUserPlaylists = (playlists) => ({
    type: GET_USER_PLAYLISTS,
    playlists,
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


const initialState = { allPlaylists: {}, userPlaylists: {}}

export default function reducer(state = initialState, action) {
    const newState = {...state, allPlaylists: {...state.allPlaylists}, userPlaylists: {...state.userPlaylists}}
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            newState.userPlaylists = {...action.playlists}
            return newState
        default:
            return state
    }
}
