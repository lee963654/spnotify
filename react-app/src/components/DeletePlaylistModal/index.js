import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistThunk, getUserPlaylistsThunk } from "../../store/playlists";

export default function DeletePlaylistModal({playlistId, playlistName}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDeleteButton = async (e) => {
        e.preventDefault()
        await dispatch(deletePlaylistThunk(playlistId))
        dispatch(getUserPlaylistsThunk())
        closeModal()
    }

    const handleCancelButton = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="delete-playlist-container">
            <h1>Delete from Library?</h1>
            <p>This will delete {playlistName} from <span>Your Library</span></p>
            <button onClick={e => handleCancelButton(e)}>Cancel</button>
            <button onClick={e => handleDeleteButton(e)}>Delete</button>
        </div>
    )
}
