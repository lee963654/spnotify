import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.css";
import OpenModalCheck from './OpenModalCheck';
import ConfirmLoginOrSignin from './Confirm';
import { getUserPlaylistsThunk, createPlaylistThunk, getAllPlaylistsThunk } from '../../store/playlists';
import OpenModalPlaylist from './OpenModalPlaylist';
import CreatePlaylistModal from '../CreatePlaylistModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export default function Sidebar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const userId = sessionUser?.id

    const userPlaylists = useSelector(state => state?.playlists?.userPlaylists)
    // console.log("USER PALYLISTS", userPlaylists)
    const userPlaylistObj = Object.values(userPlaylists)
    console.log("USER OBJECT VALUES", userPlaylistObj)

    // console.log("THE user playlists ", userPlaylists)
    // console.log("THE user playlists at the length value ", userPlaylists[1])
    // let length = 1
    // while(userPlaylists[length]) {
    //     length = length + 1
    // }
    // console.log("THIS IS THE LENGTH", length)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        let playlistLength = userPlaylistObj?.length + 1
        let playlistName = `My Playlist #${playlistLength}`
        let isPrivate = false

        formData.append("name", playlistName)
        formData.append("private", isPrivate)

        const newPlaylist = await dispatch(createPlaylistThunk(formData))
        await history.push(`/playlists/${newPlaylist?.id}`)
    }


    useEffect(() => {
        dispatch(getUserPlaylistsThunk())
        dispatch(getAllPlaylistsThunk())

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
                            {userPlaylistObj.length ? userPlaylistObj.map(playlist => (
                                <div className="single-playlist-container" key={playlist.id}>
                                    <div onClick={() => history.push(`/playlists/${playlist.id}`)}>
                                        <p>{playlist.name}</p>
                                        <div>
                                            <p>Playlist</p>
                                            <p>{playlist?.user_playlist?.username}</p>
                                        </div>

                                    </div>
                                    <OpenModalPlaylist
                                        buttonText="Delete Playlist"

                                        modalComponent={<DeletePlaylistModal playlistId={playlist.id} playlistName={playlist.name} />}

                                    />
                                </div>
                            )) : <div></div>}
                        </div>
                    </div>
                </div>}

        </div>
    )
}
