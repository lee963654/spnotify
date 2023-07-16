const FOLLOWING_ARTISTS = "following/FOLLOWING_ARTISTS"

const followArtistAction = (artist) => ({
    type: FOLLOWING_ARTISTS,
    artist
})

export const followArtistThunk = (artistId) => async (dispatch) => {
    const response = await fetch(`/api/users/follow/${artistId}`, {
        method: "POST"
    })
    console.log("THIS IS THE RESPONSE FOR FOLLOW", response)
    const followArtist = await response.json()
    if (response.ok) {
        dispatch(followArtistAction(followArtist))
        return followArtist
    } else {
        return followArtist
    }
}



const initialState = { following: {}}

export default function reducer(state = initialState, action) {
    const newState = {...state, following: {...state.following}}
    switch (action.type) {
        case FOLLOWING_ARTISTS:
            newState.following = {...action.following}
            return newState

        default:
            return state
    }
}
