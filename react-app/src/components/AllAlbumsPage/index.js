import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumsThunk } from '../../store/albums';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AllAlbums.css"

export default function AllAlbumsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allAlbums = useSelector(state => state?.albums?.allAlbums)
    const allAlbumsObj = Object.values(allAlbums || {})
    console.log("THESE ARE ALL THE ALBUMS", allAlbumsObj)


    useEffect(() => {
        dispatch(getAlbumsThunk())
    }, [dispatch])

    return (
        <div className="all-albums-container">
            <h1>All Albums</h1>
            <div className="albums-container">
                {allAlbumsObj && allAlbumsObj.map(album => (
                    <div onClick={() => history.push(`/albums/${album.id}`)} className="album">
                        <div className="album-inside">
                            <div className="album-image">
                                <img src={album.album_picture}></img>
                            </div>
                            <div className="album-info-bottom">
                                <h3>{album.name.length > 16 ? `${album.name.slice(0, 16)}...` : `${album.name}`}</h3>
                                <p>{album.artist_name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
