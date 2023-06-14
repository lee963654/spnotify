const GET_ARTISTS = "artists/GET_ARTISTS";
const GET_SINGLE_ARTIST = "artists/GET_SINGLE_ARTIST";


const getArtists = (artists) => ({
    type: GET_ARTISTS,
    artists,
})

const getSingleArtist = (artist) => ({
    type: GET_SINGLE_ARTIST,
    artist,
})


export const getArtistsThunk = () => async (dispatch) => {
    const response = await fetch("/api/artists/")
    const artists = await response.json()
    if (response.ok) {
        console.log("artists in the thunk", artists)
        dispatch(getArtists(artists))
        return artists
    } else {
        return artists
    }
}

export const getSingleArtistThunk = (artistId) => async (dispatch) => {
    const response = await fetch(`/api/artists/${artistId}`)

    const artist = await response.json()
    if (response.ok) {
        console.log("ONE ARTIST IN THE THUNK", artist)
        dispatch(getSingleArtist(artist))
        return artist
    } else {
        return artist
    }
}


const initialState = { allArtists: {}, singleArtist: {} }

export default function reducer(state = initialState, action) {
    const newState = {...state, allArtists: {...state.allArtists}, singleArtist: {...state.singleArtist}}
    switch (action.type) {
        case GET_ARTISTS:
            newState.allArtists = {...action.artists}
            return newState
        case GET_SINGLE_ARTIST:
            newState.singleArtist = {...action.artist}
            return newState
        default:
            return state;
    }
}
