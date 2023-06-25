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
        <div className="sidebar">
            {!sessionUser ?
                <div className="sidebar-main-container">
                    <div className="sidebar-container">
                        <div className="home-text" onClick={() => history.push("/")}>
                            Home
                            </div>
                        <div className="home-text">Search</div>
                        <div onClick={() => history.push("/songs")} className="home-text">All Songs</div>
                        <div onClick={() => history.push("/albums")} className="home-text">All Albums</div>
                        <div onClick={() => history.push("/artists")} className="home-text">All Artists</div>
                    </div>
                    <div className="sidebar-container-bottom">
                        <div className="home-text">Your Library</div>
                        {/* <div>
                            <div>Create your first playlist</div>
                            <div>It's easy, we'll help you</div>
                            <OpenModalCheck
                                buttonText="Create Playlist"
                                // onItemClick={closeMenu}
                                modalComponent={<ConfirmLoginOrSignin />}

                            />
                        </div> */}
                        {/* <div>
                            <div>Let's find some artists to follow</div>
                            <button>Browse Artists</button>
                        </div> */}
                    </div>
                </div> :
                <div className="sidebar-main-container">
                    <div className="sidebar-container">
                        <div className="home-text" onClick={() => history.push("/")}>Home</div>
                        <div className="home-text">Search</div>
                        <div onClick={() => history.push("/songs")} className="home-text">All Songs</div>
                        <div onClick={() => history.push("/albums")} className="home-text">All Albums</div>
                        <div onClick={() => history.push("/artists")} className="home-text">All Artists</div>
                    </div>
                    <div className="sidebar-container-bottom">
                        <div className="sidebar-bottom-header">
                        <div className="home-text">Your Library</div>
                        {/* <OpenModalPlaylist
                            buttonText="Create Playlist"
                            modalComponent={<CreatePlaylistModal userId={userId} />}
                        /> */}
                        <div className="create-playlist" onClick={handleSubmit}><i class="fa-solid fa-plus"></i></div>
                        </div>
                        <div className="side-playlist-container">
                            {userPlaylistObj.length ? userPlaylistObj.map(playlist => (
                                <div className="single-playlist-container" key={playlist.id}>
                                    <div className="playlist-info" onClick={() => history.push(`/playlists/${playlist.id}`)}>
                                        <div className="home-text playlist-name">{playlist.name}</div>
                                        <div className="not-working">
                                            <div className="home-text">Playlist</div>
                                            <div className="home-text">{playlist?.user_playlist?.username}</div>
                                        </div>

                                    </div>
                                    {/* <OpenModalPlaylist
                                        buttonText="Delete Playlist"

                                        modalComponent={<DeletePlaylistModal playlistId={playlist.id} playlistName={playlist.name} />}

                                    /> */}
                                    <OpenModalPlaylist
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
