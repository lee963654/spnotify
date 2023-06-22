const PLAY_SONG = "audioPlayer/PLAY_SONG"
const NEXT_SONG = "audioPlayer/NEXT_SONG"
const PLAY_ALBUM = "audioPlayer/PLAY_ALBUM"
const PLAY_ARTIST = "audioPlayer/PLAY_ARTIST"
const PLAY_PLAYLIST = "audioPlayer/PLAY_PLAYLIST"
const PREV_SONG = "audioPlayer/PREV_SONG"
const CLEAR_AUDIO = "audioPlayer/CLEAR"
const SHUFFLE_SONGS = "audioPlayer/SHUFFLE_SONGS"
const PLAY_FROM_START = "audioPlayer/PLAY_FROM_START"

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }


const playSongAction = (song) => ({
    type: PLAY_SONG,
    song,
})

const nextSongAction = () => ({
    type: NEXT_SONG,
})

const prevSongAction = (currentIndex) => ({
    type: PREV_SONG,
    currentIndex
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

const clearAudioAction = () => ({
    type: CLEAR_AUDIO,
})

const shuffleSongsAction = () => ({
    type: SHUFFLE_SONGS,
})

const playFromStartAction = () => ({
    type: PLAY_FROM_START,
})



export const playSongThunk = (songId, albumId, artistId) => async (dispatch) => {
    const response = await fetch(`/api/songs/song/${songId}/${albumId}/${artistId}`)
    const playSong = await response.json()
    if (response.ok) {
        dispatch(playSongAction(playSong))
        return playSong
    } else {
        return playSong
    }
}

export const playAlbumThunk = (songId, albumId, artistId) => async (dispatch) => {
    const response = await fetch(`/api/songs/album/${songId}/${albumId}/${artistId}`)
    const playAlbum = await response.json()
    if (response.ok) {
        dispatch(playAlbumAction(playAlbum))
        return playAlbum
    } else {
        return playAlbum
    }
}

export const playArtistThunk = (artistId) => async (dispatch) => {
    const response = await fetch(`/api/artists/${artistId}`)
    const playArtist = await response.json()
    if (response.ok) {
        const playArtistSongs = Object.values(playArtist?.songs || {})
        dispatch(playArtistAction(playArtistSongs))
        return playArtistSongs
    } else {
        return playArtist
    }
}

export const playPlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch("/api/playlists/user")
    const playPlaylist = await response.json()
    if (response.ok) {
        const currentPlaylist = playPlaylist[playlistId]
        const songsInPlaylist = Object.values(currentPlaylist?.songs_in_playlist || {})
        dispatch(playPlaylistAction(songsInPlaylist))
        return playPlaylist
    } else {
        return playPlaylist
    }
}

export const nextSongThunk = () => async (dispatch) => {
    dispatch(nextSongAction())
}

export const prevSongThunk = (currentIndex) => async (dispatch) => {
    dispatch(prevSongAction(currentIndex))
}

export const clearAudioThunk = () => async (dispatch) => {
    dispatch(clearAudioAction())
}

export const shuffleSongsThunk = () => async (dispatch) => {
    dispatch(shuffleSongsAction())
}

export const playFromStartThunk = () => async (dispatch) => {
    dispatch(playFromStartAction())
}


const initialState = { currentSong : [], queue: [], songList: [], shuffleOrder: []}

export default function reducer(state = initialState, action) {
    const newState = {...state, currentSong:[...state.currentSong], queue : [...state.queue], songList: [...state.songList], shuffleOrder: [...state.shuffleOrder]}
    switch (action.type) {
        case PLAY_SONG:
            newState.currentSong = [action.song]
            newState.queue = []
            newState.songList = [action.song]
            return newState
        case NEXT_SONG:
            if (newState.queue.length === 0) {
                newState.currentSong = [...state.currentSong]
                newState.queue = []
                newState.songList = [...state.songList]
                return newState
            } else {
                newState.currentSong = [state.queue[0]]
                newState.queue = [...state.queue.slice(1)]
                newState.songList = [...state.songList]
                return newState
            }
        case PLAY_ALBUM:
            newState.currentSong = [action.songsInAlbum[0]]
            newState.queue = [...action.songsInAlbum.slice(1)]
            newState.songList = [...action.songsInAlbum]
            return newState
        case PLAY_ARTIST:
            newState.currentSong = [action.songsByArtist[0]]
            newState.queue = [...action.songsByArtist.slice(1)]
            newState.songList = [...action.songsByArtist]
            return newState
        case PLAY_PLAYLIST:
            newState.currentSong = [action.songsOnPlaylist[0]]
            newState.queue = [...action.songsOnPlaylist.slice(1)]
            newState.songList = [...action.songsOnPlaylist]
            return newState
        case PREV_SONG:
            newState.currentSong = [state.songList[action.currentIndex]]
            newState.queue = [...state.songList.slice(action.currentIndex + 1)]
            newState.songList = [...state.songList]
            return newState
        case CLEAR_AUDIO:
            newState.currentSong = []
            newState.queue = []
            newState.songList = []
            return newState
        case PLAY_FROM_START:
            newState.currentSong = [state.songList[0]]
            newState.queue = [...state.songList.slice(1)]
            newState.songList = [...state.songList]
            return newState
        case SHUFFLE_SONGS:
            // newState.shuffleOrder = [...state.songList]
            // const shuffled = shuffle(state.songList)
            // newState.currentSong = [shuffled[0]]
            // newState.queue = [...shuffled.slice(1)]
            // newState.songList = [...shuffled]
            // console.log("THIS IS THE SHUFFLED NEW STATE", newState)
            // WORKING ON THE SHUFFLE
            return newState
        default:
            return state
    }
}
