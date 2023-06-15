import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.css";
import OpenModalCheck from './OpenModalCheck';
import ConfirmLoginOrSignin from './Confirm';
import { getUserPlaylistsThunk, createPlaylistThunk } from '../../store/playlists';
import OpenModalPlaylist from './OpenModalPlaylist';
import CreatePlaylistModal from '../CreatePlaylistModal';
import DeletePlaylistModal from '../DeletePlaylistModal';



export default function Sidebar() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    // console.log("THIS IS THE SESSION USER", sessionUser)
    const userId = sessionUser?.id
    // console.log("THIS IS THE SESSION USER ID", userId)
    const userPlaylists = useSelector(state => state?.playlists?.userPlaylists)

    // console.log("userplaylists testing ===============", userPlaylists[userId])
    // console.log("userplaylists length=================", userPlaylists[userId]?.length)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        let playlistLength = userPlaylists[userId]?.length + 1
        let playlistName = `My Playlist #${playlistLength}`
        let isPrivate = false

        formData.append("name", playlistName)
        formData.append("private", isPrivate)

        const newPlaylist = await dispatch(createPlaylistThunk(formData))
    }







    useEffect(() => {
        dispatch(getUserPlaylistsThunk())

    }, [dispatch, sessionUser])


    return (
        <div>
            {!sessionUser ?
                <div className="sidebar-main-container">
                    <div className="sidebar-container">
                        <p>Home</p>
                        <p>Search</p>
                    </div>
                    <div>
                        <p>Your Library</p>
                        <div>
                            <p>Create your first playlist</p>
                            <p>It's easy, we'll help you</p>
                            <OpenModalCheck
                                buttonText="Create Playlist"
                                // onItemClick={closeMenu}
                                modalComponent={<ConfirmLoginOrSignin />}

                            />
                        </div>
                        <div>
                            <p>Let's find some artists to follow</p>
                            <button>Browse Artists</button>
                        </div>
                    </div>
                </div> :
                <div className="sidebar-main-container">
                    <div className="sidebar-container">
                        <p>Home</p>
                        <p>Search</p>
                    </div>
                    <div>
                        <p>Your Library</p>
                        {/* <OpenModalPlaylist
                            buttonText="Create Playlist"
                            modalComponent={<CreatePlaylistModal userId={userId} />}
                        /> */}
                        <button onClick={handleSubmit}>Create a playlist</button>
                        <div>
                            {userPlaylists && userPlaylists[userId]?.map(playlist => (
                                <div key={playlist.id}>
                                    <p>{playlist.name}</p>
                                    <div>
                                        <p>Playlist</p>
                                        <p>{playlist?.user_playlist?.username}</p>
                                    </div>
                                    <OpenModalPlaylist
                                        buttonText="Delete Playlist"

                                        modalComponent={<DeletePlaylistModal playlistId={playlist.id} playlistName={playlist.name} />}

                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

        </div>
    )
}
