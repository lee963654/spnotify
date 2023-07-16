import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
                    <div className="single-playlist-container" key={playlist.id}>
                        <div className="playlist-info" onClick={() => history.push(`playlists/${playlist.id}`)}>
                            <div className="home-text playlist-name">
                                {playlist.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
