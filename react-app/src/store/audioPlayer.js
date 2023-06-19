const PLAY_SONG = "audioPlayer/PLAY_SONG"


const playSongAction = (song) => ({
    type: PLAY_SONG,
    song,
})


export const playSongThunk = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}`)
    const playSong = await response.json()
    if (response.ok) {
        dispatch(playSongAction(playSong))
        return playSong
    } else {
        return playSong
    }
}


const initialState = { currentSong : [], queue: []}

export default function reducer(state = initialState, action) {
    const newState = {...state, currentSong:[], queue : []}
    switch (action.type) {
        case PLAY_SONG:
            newState.currentSong = [action.song]
            return newState
        default:
            return state
    }
}
