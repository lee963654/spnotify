import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AllPlaylistsPage.css"


export default function AllPlaylistsPage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const allPlaylists = useSelector(state => state?.playlists?.allPlaylists)
    const allPlaylistsObj = Object.values(allPlaylists || {})
    console.log("THESE ARE ALL THE PLAYLISTS", allPlaylistsObj)
    const allPublicPlaylists = allPlaylistsObj.filter(playlist => playlist.private === false)
    console.log("ALL PUBLIC PLAYLISTS", allPublicPlaylists)

    return (

        <div className="all-playlists-container">
            <h1>All Playlists</h1>
            <div className="playlists-container">
                {allPublicPlaylists && allPublicPlaylists.map(playlist => (
                    <div onClick={() => history.push(`/playlists/${playlist?.id}`)} className="playlist">
                        <div className="playlist-inside">
                            <div className="playlist-image">
                                <img src={playlist?.playlist_picture}></img>
                            </div>
                            <div className="playlist-info-bottom">
                                <h3>{playlist?.name.length > 16 ? `${playlist?.name.slice(0, 16)}...` : `${playlist?.name}`}</h3>
                                <p>{playlist?.user_playlist?.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
