const GET_ALL_SONGS = "songs/GET_ALL_SONGS"


const getAllSongsAction = (songs) => ({
    type: GET_ALL_SONGS,
    songs
})


export const getAllSongsThunk = () => async (dispatch) => {
    const response = await fetch("/api/songs")
    const allSongs = await response.json()
    if (response.ok) {
        dispatch(getAllSongsAction(allSongs))
        return allSongs
    } else {
        return allSongs
    }
}


const initialState = { allSongs: {} }

export default function reducer(state = initialState, action) {
    const newState = {...state, allSongs: {...state.allSongs}}
    switch(action.type) {
        case GET_ALL_SONGS:
            newState.allSongs = {...action.songs}
            return newState
        default:
            return state
    }
}
