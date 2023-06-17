import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSongToPlaylistThunk } from "../../store/playlists";


export default function SongOptionsModal({songId, songName}) {
    const dispatch = useDispatch()
    const userPlaylists = useSelector(state => state?.playlists?.userPlaylists)
    console.log("THE USER PALYLISTS IN THE MODAL", userPlaylists)
    const userPlaylistsObj = Object.values(userPlaylists)
    console.log("THE USER PLAYLISTS IN ARRAY", userPlaylistsObj)

    const handleSubmit = async (e, playlistId) => {
        e.preventDefault()
        const addSongToPlaylist = await dispatch(addSongToPlaylistThunk(songId, playlistId))
        console.log("THIS IS TEH PLAYLIST ID IN THE HANDLE SUBMIT", playlistId)
    }

    return (
        <div className="song-options-container">
            <h1>Which playlist would you like to add {songName} to?</h1>
            {userPlaylistsObj && userPlaylistsObj.length && (userPlaylistsObj.map(playlist => (
                <div className="playlists-container-modal">
                    <div className="playlist" onClick={(e) => {handleSubmit(e, playlist.id)}}>
                        {playlist.name}
                    </div>
                </div>

            ))
            )}
        </div>
    )
}
