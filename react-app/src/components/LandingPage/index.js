import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistsThunk } from '../../store/artists';

import "./LandingPage.css";

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const artists = useSelector(state => state.artists.allArtists)
    const albums = useSelector(state => state.albums)
    console.log("THESE ARE THE ARTISTS", artists)
    const artistObj = Object.values(artists)
    console.log("artist object===", artistObj)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistsThunk())
        // dispatch(getAlbumsThunk())
    }, [dispatch])

    return (
        <div className="landing-container">
            <div className="all-artists-container">
                <h1>Artists</h1>
                <div className="artists-container">
                    {artistObj.map(artist => (
                        <div className="artist">
                            <img src={artist?.artist_picture}></img>
                            <h3>{artist.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}
