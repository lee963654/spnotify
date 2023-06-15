import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ArtistPage.css"
import { useParams } from 'react-router-dom'
import { getSingleArtistThunk } from '../../store/artists';
import OptionsButton from './OptionsButton';

export default function ArtistPage() {
    const dispatch = useDispatch()

    // Options Menu
    const [active, setActive] = useState()
    // Options Menu

    const { id } = useParams()

    const currentArtist = useSelector(state => state.artists.singleArtist)

    console.log("THE CURRENT ARTIST", currentArtist)

    useEffect(() => {
        dispatch(getSingleArtistThunk(id))
    }, [dispatch])

    // Options

    // Options

    return (
        <div className="single-artist-container">
            <h1>{currentArtist.name}</h1>
            <div className="single-songs-container">
                {currentArtist?.songs?.map(song => (
                    <div key={song.id} className="single">
                        <img></img>
                        <p>{song.name}</p>
                        <p>{song.num_of_plays}</p>
                        <OptionsButton key={song.id} />
                    </div>
                ))}
            </div>
            <div className="single-albums-container">
                {currentArtist?.albums?.map(album => (
                    <div className="album">
                        <p>{album.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
