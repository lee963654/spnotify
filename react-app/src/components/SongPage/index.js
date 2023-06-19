import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllSongsThunk } from "../../store/songs"
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { playSongThunk } from '../../store/audioPlayer';


export default function SongPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const allSongs = useSelector(state => state?.songs?.allSongs)
    console.log("THESE ARE THE SONGS========", allSongs)
    const currentSong = allSongs[id]
    console.log("this is the target song", currentSong)
    const currentArtistId = currentSong?.artist_id
    const allArtists = useSelector(state => state?.artists?.allArtists)
    const currentArtist = allArtists[currentArtistId]
    console.log("this is the current artist", currentArtist)
    const allAlbums = useSelector(state => state?.albums?.allAlbums)
    const currentAlbumId = currentSong?.album_id
    const currentAlbum = allAlbums[currentAlbumId]
    console.log("this is the current album", currentAlbum)

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch(playSongThunk(id))
    }


    // on a redirect will take you to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getAllSongsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
    }, [dispatch])

    return (
        <div className="song-container">
            <div className="album-picture-container">
                <img src={currentAlbum?.album_picture} style={{ width: 200 }}></img>
            </div>
            <div className="song-title-container">
                <h1>{currentSong?.name}</h1>
                <div className="bottom-song-title-container">
                    <p onClick={() => history.push(`/artists/${currentArtist?.id}`)}>{currentArtist?.name}</p>
                    <p onClick={() => history.push(`/albums/${currentAlbum?.id}`)}>{currentAlbum?.name}</p>
                    <p>{currentAlbum?.release_year}</p>
                </div>
            </div>
            <div onClick={handleClick}>
            <i class="fa-solid fa-play"></i>
            </div>
            <div className="song-lyrics-container">
                <div className="lyrics-container">
                    <h2>Lyrics</h2>
                    {currentSong?.lyrics}
                </div>
                <div className="lyrics-artist-container" onClick={() => history.push(`/artists/${currentArtist?.id}`)}>
                    <img src={currentArtist?.artist_picture} style={{width: 75}}></img>
                    <div className="artist-name-container">
                        <p>Artist</p>
                        <h3>{currentArtist?.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
