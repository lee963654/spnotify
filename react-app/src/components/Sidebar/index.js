import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.css";
import OpenModalCheck from './OpenModalCheck';
import ConfirmLoginOrSignin from './Confirm';
import { getUserPlaylistsThunk } from '../../store/playlists';


export default function Sidebar() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    console.log("THIS IS THE SESSION USER", sessionUser)
    const userId = sessionUser?.id
    console.log("THIS IS THE SESSION USER ID", userId)
    const userPlaylists = useSelector(state => state?.playlists?.userPlaylists)

    console.log("userplaylists testing ===============", userPlaylists[userId])
    console.log("userplaylists mapping over", userPlaylists[userId]?.[0])







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
                        <div>
                            {userPlaylists && userPlaylists[userId]?.map(playlist => (
                                <div key={playlist.id}>
                                    <p>{playlist.name}</p>
                                    <div>
                                        <p>Playlist</p>
                                        <p>{playlist?.user_playlist?.username}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

        </div>
    )
}
