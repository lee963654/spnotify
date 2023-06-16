const GET_ALBUMS = "albums/GET_ALBUMS";
const GET_ARTIST_ALBUMS = "albums/GET_ARTIST_ALBUMS"
const GET_SINGLE_ALBUM = "albums/GET_SINGLE_ALBUM"


const getAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums,
})

const getArtistAlbums = (album) => ({
    type: GET_ARTIST_ALBUMS,
    album,
})

const getSingleAlbum = (album) => ({
    type: GET_SINGLE_ALBUM,
    album
})


export const getAlbumsThunk = () => async (dispatch) => {
    const response = await fetch("/api/albums/")
    const albums = await response.json()
    if (response.ok) {
        console.log("albums in the thunk", albums)
        dispatch(getAlbums(albums))
        return albums
    } else {
        return albums
    }
}




const initialState = { allAlbums: {}, artistAlbums: {} }


export default function reducer(state = initialState, action) {
    const newState = {...state, allAlbums: {...state.allAlbums}, artistAlbums: {...state.artistAlbums}}
    switch(action.type) {
        case GET_ALBUMS:
            newState.allAlbums = {...action.albums}
            return newState
        default:
            return state
    }
}
