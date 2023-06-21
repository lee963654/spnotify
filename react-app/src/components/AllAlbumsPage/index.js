import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumsThunk } from '../../store/albums';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
                        <div className="album-info">
                            <img style={{width: 75}} src={album.album_picture}></img>
                            <div>{album.name}</div>
                            <div>{album.artist_name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
