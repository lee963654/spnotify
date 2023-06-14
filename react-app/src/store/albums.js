const GET_ALBUMS = "albums/GET_ALBUMS";


const getAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums,
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


const initialState = { allAlbums: {} }


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALBUMS:
            const newState = {...state, allAlbums: {...state.allAlbums}}
            newState.allAlbums = {...action.albums}
            return newState
        default:
            return state
    }
}
