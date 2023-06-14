const GET_ARTISTS = "artists/GET_ARTISTS";


const getArtists = (artists) => ({
    type: GET_ARTISTS,
    artists,
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


const initialState = {allArtists: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTISTS:
            const newState = {...state, allArtists: {...state.allArtists}}
            newState.allArtists = {...action.artists}
            return newState
        default:
            return state;
    }
}
