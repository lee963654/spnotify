import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from "../../store/songs"
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
            <div className="songs-container">
                {allSongsObj && allSongsObj.map(song => (
                    <div onClick={() => history.push(`/songs/${song.id}`)} className="song">
                        <div className="song-info">
                            <img src={song.album_cover} style={{width: 75}}></img>
                            <div>{song.name}</div>
                            <div>{song.artist_name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
