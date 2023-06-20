const PLAY_SONG = "audioPlayer/PLAY_SONG"
const SKIP_SONG = "audioPlayer/SKIP_SONG"
const PLAY_ALBUM = "audioPlayer/PLAY_ALBUM"
const PLAY_ARTIST = "audioPlayer/PLAY_ARTIST"
const PLAY_PLAYLIST = "audioPlayer/PLAY_PLAYLIST"


const playSongAction = (song) => ({
    type: PLAY_SONG,
    song,
})

const skipSongAction = () => ({
    type: SKIP_SONG,
})

const playAlbumAction = (songsInAlbum) => ({
    type: PLAY_ALBUM,
    songsInAlbum,
})

const playArtistAction = (songsByArtist) => ({
    type: PLAY_ARTIST,
    songsByArtist
})

const playPlaylistAction = (songsOnPlaylist) => ({
    type: PLAY_PLAYLIST,
    songsOnPlaylist,
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

export const playAlbumThunk = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/songs/album/${albumId}`)
    const playAlbum = await response.json()
    if (response.ok) {
        dispatch(playAlbumAction(playAlbum))
        return playAlbum
    } else {
        return playAlbum
    }
}

export const playArtistThunk = (artistId) => async (dispatch) => {
    const response = await fetch(`/api/songs/artist/${artistId}`)
    const playArtist = await response.json()
    if (response.ok) {
        dispatch(playArtistAction(playArtist))
        return playArtist
    } else {
        return playArtist
    }
}

export const playPlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/songs/playlist/${playlistId}`)
    const playPlaylist = await response.json()
    if (response.ok) {
        dispatch(playPlaylistAction(playPlaylist))
        return playPlaylist
    } else {
        return playPlaylist
    }
}

export const skipSongThunk = () => async (dispatch) => {
    dispatch(skipSongAction())
}


const initialState = { currentSong : [], queue: []}

export default function reducer(state = initialState, action) {
    const newState = {...state, currentSong:[], queue : []}
    switch (action.type) {
        case PLAY_SONG:
            newState.currentSong = [action.song]
            return newState
        case SKIP_SONG:
            if (newState.queue.length === 0) {
                newState.currentSong = []
                newState.queue = []
            } else {
                newState.currentSong = [state.queue[0]]
                newState.queue = [...state.queue.slice(1)]
                return newState
            }
        case PLAY_ALBUM:
            newState.currentSong = [action.songsInAlbum[0]]
            newState.queue = [...action.songsInAlbum.slice(1)]
            return newState
        case PLAY_ARTIST:
            newState.currentSong = [action.songsByArtist[0]]
            newState.queue = [...action.songsByArtist.slice(1)]
            return newState
        case PLAY_PLAYLIST:
            newState.currentSong = [action.songsOnPlaylist[0]]
            newState.queue = [...action.songsOnPlaylist.slice(1)]
            return newState
        default:
            return state
    }
}
