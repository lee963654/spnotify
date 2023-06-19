import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, removeSongFromPlaylistThunk } from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import UpdatePlaylist from '../UpdatePlaylist';
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';

export default function PlaylistPage() {
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


    useEffect(() => {

        dispatch(getAllPlaylistsThunk())
        dispatch(getUserPlaylistsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
    }, [dispatch])

    // On a redirect, will rerender to top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



    return (
        <div className="single-playlist-container">
            <div className="playlist-header-container">
                <p>Playlist</p>
                <OpenModalButton
                    buttonText={currentPlaylist?.name}
                    modalComponent={<UpdatePlaylist playlistName={currentPlaylist?.name} playlistId={id} playlistPrivate={playlistPrivate} />}
                />
                <p>{currentPlaylist?.user_playlist?.username}</p>
            </div>
            <div className="playlist-song-container">
                {songObj && songObj.length > 0 && Array.isArray(songObj) ? (songObj.map(song => (
                    <div className="playlist-song">
                        <div className="title-container">
                        <img src={song?.album_cover} style={{width: 100}}></img>
                        <p>{song?.name}</p>
                        <p>{artists[song.artist_id]?.name}</p>
                        </div>
                        <div>
                            <p>{albums[song.album_id]?.name}</p>
                        </div>
                        <div>
                            <button onClick={(e) => {handleSubmit(e, song.id)}}>Remove Song</button>
                        </div>
                    </div>
                ))) : <div>No Songs</div>}
            </div>
        </div>
    )

}
