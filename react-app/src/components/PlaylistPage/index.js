import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPlaylistsThunk, getUserPlaylistsThunk } from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import UpdatePlaylist from '../UpdatePlaylist';

export default function PlaylistPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const allPlaylists = useSelector(state => state.playlists.allPlaylists)
    console.log("THIS IS TEH ID IN THE PLAYLIST PAGE", id)

    const currentPlaylist = allPlaylists[id]
    console.log("THIS IS TEH CURRENT PLAYLIST", currentPlaylist)

    useEffect(() => {

        dispatch(getAllPlaylistsThunk())
        dispatch(getUserPlaylistsThunk())
    }, [dispatch])

    return (
        <div className="single-playlist-container">
            <div>
                <p>Playlist</p>
                <OpenModalButton
                    buttonText={currentPlaylist?.name}
                    modalComponent={<UpdatePlaylist playlistName={currentPlaylist?.name} playlistId={id} />}
                />
                <p>{currentPlaylist?.user_playlist?.username}</p>
            </div>

        </div>
    )

}
