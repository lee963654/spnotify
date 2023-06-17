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

    useEffect(() => {
        dispatch(getSingleArtistThunk(id))
    }, [dispatch])

    // Options

    // Options

    return (
        <div className="single-artist-container">
            <div className="top-header-container">
                <h1>{currentArtist.name}</h1>
                <img src={currentArtist.artist_picture} style={{ width: 800 }}></img>
            </div>
            <div className="middle-play-container">
                <div>PLAY BUTTON HERE</div>
            </div>
            <div className="single-songs-container">
                {currentArtist?.songs?.map(song => (
                    <div key={song.id} className="single">
                        <div className="single-song">
                            <img src={song.album_cover} style={{ width: 75 }}></img>
                            <p>{song.name}</p>
                            <p>Number of plays {song.num_of_plays}</p>
                        </div>
                        <OptionsButton className="options-button" key={song.id} />
                    </div>
                ))}
            </div>
            <div className="single-albums-container">
                <h2>Discography</h2>
                {currentArtist?.albums?.map(album => (
                    <div className="album">
                        <img src={album.album_picture}></img>
                        <p>{album.name}</p>
                    </div>
                ))}
            </div>
            <div className="artist-about-container">
                <h2>About</h2>
                <img src={currentArtist.artist_picture} style={{ width: 800 }}></img>
                <p>{currentArtist.about}</p>
            </div>
        </div>
    )
}
