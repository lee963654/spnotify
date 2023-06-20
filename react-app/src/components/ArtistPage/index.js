import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ArtistPage.css"
import { useParams } from 'react-router-dom'
import { getSingleArtistThunk } from '../../store/artists';
import OptionsButton from './OptionsButton';
import OpenOptionsModalButton from './OpenOptionsModalButton';
import SongOptionsModal from '../SongOptionsModal';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { playSongThunk } from '../../store/audioPlayer';


export default function ArtistPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()

    const currentArtist = useSelector(state => state.artists.singleArtist)



    const handleClickSingle = async (e, songId, albumId) => {
        e.preventDefault()
        dispatch(playSongThunk(songId, albumId, id))
    }


    useEffect(() => {
        dispatch(getSingleArtistThunk(id))
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



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
                        <div onClick={() => history.push(`/songs/${song.id}`)} className="single-song">
                            <img src={song.album_cover} style={{ width: 75 }}></img>
                            <p>{song.name}</p>
                            <p>Number of plays {song.num_of_plays}</p>
                        </div>
                        <div onClick={(e) => handleClickSingle(e, song?.id, song.album_id)}>
                            PLAY BUTTON HERE
                        </div>
                        <div className="song-to-playlist">
                            <OpenOptionsModalButton
                                buttonText="Add Song To Playlist"
                                modalComponent={<SongOptionsModal songId={song.id} songName={song.name} />}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="single-albums-container">
                <h2>Discography</h2>
                {currentArtist?.albums?.map(album => (
                    <div onClick={() => history.push(`/albums/${album.id}`)} className="album">
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
