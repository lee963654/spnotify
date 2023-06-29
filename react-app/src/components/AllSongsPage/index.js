import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from "../../store/songs"
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AllSongsPage.css"

export default function AllSongsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allSongs = useSelector(state => state?.songs?.allSongs)
    const allSongsObj = Object.values(allSongs || {})
    console.log("THESE ARE ALL THE SONGS", allSongsObj)

    useEffect(() => {
        dispatch(getAllSongsThunk())
    }, [dispatch])

    return (
        <div className="all-songs-container">
            <h1>All Songs</h1>
            <div className="songs-container-only">
                {allSongsObj && allSongsObj.map(song => (
                    <div onClick={() => history.push(`/songs/${song.id}`)} className="all-songs-song">
                        <div className="all-songs-song-info">
                            <div className="all-songs-song-image">
                                <img src={song.album_cover}></img>
                            </div>
                            <div className="all-songs-info-bottom">
                                <h3>{song?.name?.length > 16 ? `${song?.name?.slice(0, 16)}...` : `${song?.name}`}</h3>
                                <p>{song?.artist_name?.length > 16 ? `${song?.artist_name?.slice(0, 16)}...` : `${song?.artist_name}`}</p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
