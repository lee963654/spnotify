import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, updatePlaylistThunk } from '../../store/playlists';


export default function UpdatePlaylist ({playlistName, playlistId}) {

    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [name, setName] = useState(playlistName || "")
    const [isPrivate, setIsPrivate] = useState()
    const [errors, setErrors] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        let privateCheck;
        isPrivate === "private" ? privateCheck = true : privateCheck = false

        formData.append("name", name)
        formData.append("private", privateCheck)

        const updatePlaylist = await dispatch(updatePlaylistThunk(playlistId, formData))
        console.log("THIS IS THE UPDATED PLAYLIST", updatePlaylist)
        if (updatePlaylist.errors) {

        } else {
            closeModal()

        }
    }


    return (
        <div className="update-playlist-container">
            <h1>Edit details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Playlist
                    <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </label>
                <button>
                    Save
                </button>
            </form>
        </div>
    )
}
