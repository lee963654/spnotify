import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreatePlaylistModal ({userId}) {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [isPrivate, setIsPrivate] = useState(true)
    const [error, setError] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
    }


    return (
        <div className="create-playlist-container">
            <h1>Create a Playlist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Playlist name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </form>
        </div>
    )
}
