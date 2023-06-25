import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistThunk, getUserPlaylistsThunk } from "../../store/playlists";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./DeletePlaylistModal.css"


export default function DeletePlaylistModal({playlistId, playlistName}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const location = useLocation()
    const history = useHistory()
    console.log("THIS IS TEH LOCATION ", location)

    const handleDeleteButton = async (e) => {
        e.preventDefault()
        await dispatch(deletePlaylistThunk(playlistId))
        dispatch(getUserPlaylistsThunk())
        if (location.pathname === `/playlists/${playlistId}`) {
            history.push("/")
        }
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
            <div className="delete-playlist-buttons-container">
            <button className="delete-playlist-button" onClick={e => handleCancelButton(e)}>Cancel</button>
            <button className="delete-playlist-button" onClick={e => handleDeleteButton(e)}>Delete</button>
            </div>
        </div>
    )
}
