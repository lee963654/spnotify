import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, updatePlaylistThunk } from '../../store/playlists';


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
        if (name.length > 30) errors.name = "Name must be under 30 characters"
        if (name.length === 0) errors.name = "You must provide a name for your playlist"
        setErrors(errors)
    }, [name])

    return (
        <div className="update-playlist-container">
            <h1>Edit details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    {errors.name && <p>{errors.name}</p>}
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Playlist
                    <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                        {/* <option value="" disabled></option> */}
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </label>
                <button disabled={name.length > 30 || name.length === 0}>
                    Save
                </button>
            </form>
        </div>
    )
}
