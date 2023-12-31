import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllSongsThunk } from "../../store/songs"
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { clearAudioThunk, playSongThunk } from '../../store/audioPlayer';

import LoginFormModal from '../LoginFormModal';
import OpenModalAuthCheck from '../OpenModalAuthCheck';
import ConfirmLoginOrSignin from '../Sidebar/Confirm';
import "./SongPage.css"


export default function SongPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const { id } = useParams()
    const allSongs = useSelector(state => state?.songs?.allSongs)
    const currentSong = allSongs[id]
    const currentArtistId = currentSong?.artist_id
    const allArtists = useSelector(state => state?.artists?.allArtists)
    const currentArtist = allArtists[currentArtistId]
    const allAlbums = useSelector(state => state?.albums?.allAlbums)
    const currentAlbumId = currentSong?.album_id
    const currentAlbum = allAlbums[currentAlbumId]


    const handleClick = async (e) => {
        e.preventDefault()

        dispatch(playSongThunk(id, currentAlbumId, currentArtistId))
    }


    // on a redirect will take you to top of page
    useEffect(() => {
        document.getElementById("scroll-to-top").scroll(0,0)
    }, []);

    useEffect(() => {
        dispatch(getAllSongsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
    }, [dispatch])

    return (
        <div className="song-container">
            <div className="song-info-container">
                <img src={currentAlbum?.album_picture}></img>
                <div className="song-title-container">
                    <h1>{currentSong?.name}</h1>
                    <div className="bottom-song-title-container">
                        <p style={{cursor: "pointer"}} onClick={() => history.push(`/artists/${currentArtist?.id}`)}>{currentArtist?.name}</p>
                        <p style={{cursor: "pointer"}} onClick={() => history.push(`/albums/${currentAlbum?.id}`)}>{currentAlbum?.name}</p>
                        <p>{currentAlbum?.release_year}</p>
                    </div>
                </div>

            </div>

            {sessionUser ?
                <div className="middle-play-container">
                    <i onClick={handleClick} class="fa-solid fa-play fa-lg"></i>
                </div> :
                <OpenModalAuthCheck mainButtonTest={true} modalComponent={<ConfirmLoginOrSignin />} />
            }
            <div className="song-lyrics-container">
                <div className="lyrics-container">
                    <h2>Lyrics</h2>
                    <p>{currentSong?.lyrics}</p>
                </div>
                <div style={{cursor: "pointer"}} className="lyrics-artist-container" onClick={() => history.push(`/artists/${currentArtist?.id}`) }>
                    <img src={currentArtist?.artist_icon_picture} style={{ width: 75 }}></img>
                    <div className="artist-name-container">
                        <p>Artist</p>
                        <h3>{currentArtist?.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
