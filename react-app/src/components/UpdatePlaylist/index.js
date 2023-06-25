import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, updatePlaylistThunk } from '../../store/playlists';
import "./UpdatePlaylist.css"

export default function UpdatePlaylist ({playlistName, playlistId, playlistPrivate}) {

    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [name, setName] = useState(playlistName || "")
    const [isPrivate, setIsPrivate] = useState(playlistPrivate || "private")
    const [errors, setErrors] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        let privateCheck;
        isPrivate === "private" ? privateCheck = true : privateCheck = false

        formData.append("name", name)
        formData.append("private", privateCheck)
        console.log("this is the private check", privateCheck)

        const updatePlaylist = await dispatch(updatePlaylistThunk(playlistId, formData))
        if (updatePlaylist.errors) {

        } else {
            closeModal()

        }
    }
    console.log("this is the isprivate before handle sub", isPrivate)

    useEffect(() => {
        const errors = {}
        if (name.length > 25) errors.name = "Name must be under 25 characters"
        if (name.length === 0) errors.name = "You must provide a name for your playlist"
        setErrors(errors)
    }, [name])

    return (
        <div className="update-playlist-container">
            <h1>Edit Playlist</h1>
            <form className="update-playlist-form-container" onSubmit={handleSubmit}>
                <label className="update-playlist-label">
                <div className="update-playlist-label-name">Name {errors.name && <span className="errors">{errors.name}</span>}</div>
                    <input
                        className="update-playlist-input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label className="update-playlist-label">
                    Playlist
                    <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                        {/* <option value="" disabled></option> */}
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </label>
                <button className="update-playlist-button" disabled={name.length > 25 || name.length === 0}>
                    Save
                </button>
            </form>
        </div>
    )
}
