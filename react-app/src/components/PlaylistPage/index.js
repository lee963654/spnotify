import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, removeSongFromPlaylistThunk } from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import UpdatePlaylist from '../UpdatePlaylist';
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { playPlaylistThunk, playSongThunk } from '../../store/audioPlayer';
import "./PlaylistPage.css"
import PlaylistNameModal from './PlaylistNameModal';

export default function PlaylistPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const allPlaylists = useSelector(state => state?.playlists?.allPlaylists)
    const currentPlaylist = allPlaylists[id]
    const artists = useSelector(state => state?.artists?.allArtists)
    const albums = useSelector(state => state?.albums?.allAlbums)

    const songsInPlaylist = currentPlaylist?.songs_in_playlist
    const songObj = Object.values(songsInPlaylist || {})

    const playlistPrivate = currentPlaylist?.private === true ? "private" : "public"

    const handleSubmit = async (e, songId) => {
        e.preventDefault()

        const removeSongFromPlaylist = await dispatch(removeSongFromPlaylistThunk(songId, id))
    }

    const handleClickPlaylist = async (e) => {
        e.preventDefault()
        dispatch(playPlaylistThunk(id))
    }

    const handleClickSong = async (e, songId, albumId, artistId) => {
        e.preventDefault()
        dispatch(playSongThunk(songId, albumId, artistId))
    }


    useEffect(() => {

        dispatch(getAllPlaylistsThunk())
        dispatch(getUserPlaylistsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
    }, [dispatch])

    // On a redirect, will rerender to top of the page
    useEffect(() => {
        document.getElementById("scroll-to-top").scroll(0, 0)
    }, []);



    return (
        <div className="single-playlist-page-container">
            <div className="playlist-header-container">
                <p>Playlist</p>
                <PlaylistNameModal
                    buttonText={currentPlaylist?.name}
                    modalComponent={<UpdatePlaylist playlistName={currentPlaylist?.name} playlistId={id} playlistPrivate={playlistPrivate} />}
                />
                <p>{currentPlaylist?.user_playlist?.username}</p>
            </div>
            <div className="middle-play-container"><i onClick={handleClickPlaylist} class="fa-solid fa-play fa-lg"></i></div>
            <div className="playlist-song-container">
                {songObj && songObj.length > 0 && Array.isArray(songObj) ? (songObj.map(song => (
                    <div className="playlist-song">
                        <div className="title-container">
                            <img src={song?.album_cover} style={{ width: 100 }}></img>
                            <div className="playlist-song-artist">
                                <p onClick={() => history.push(`/songs/${song.id}`)}>{song?.name}</p>
                                <p onClick={() => history.push(`/artists/${song.artist_id}`)}>{artists[song.artist_id]?.name}</p>
                            </div>
                        </div>
                        <div className="playlist-bar-right">
                            <div className="playlist-album-name">
                                <p onClick={() => history.push(`/albums/${song.album_id}`)}>{albums[song.album_id]?.name}</p>
                            </div>
                            <div className="playlist-controls-container">
                                <div onClick={(e) => { handleClickSong(e, song.id, song.album_id, song.artist_id) }}><i class="fa-solid fa-play"></i></div>
                                <div onClick={(e) => { handleSubmit(e, song.id) }}><i class="fa-regular fa-trash-can"></i></div>
                            </div>
                        </div>
                    </div>
                ))) : <div>No Songs</div>}
            </div>
        </div>
    )

}
