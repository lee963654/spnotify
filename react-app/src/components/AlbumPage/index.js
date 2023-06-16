import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAlbumsThunk } from '../../store/albums';
import { getArtistsThunk } from '../../store/artists';

export default function AlbumPage() {
    const dispatch = useDispatch()
    const { id } = useParams()

    const albums = useSelector(state => state?.albums?.allAlbums)
    const currentAlbum = albums[id]
    console.log("THE CURRENT ALBUM", currentAlbum)
    const songsInAlbum = currentAlbum?.songs
    const artists = useSelector(state => state?.artists?.allArtists)
    const currentArtist = artists[id]
    console.log("THE CURRENT ARTIST", currentArtist)




    useEffect(() => {
        dispatch(getAlbumsThunk())
        dispatch(getArtistsThunk())
    }, [dispatch])

    return (
        <div className="single-album-container">
            <div className="top-container">
                <img style={{ width: 200 }} src={currentAlbum?.album_picture}></img>
                <h1>{currentAlbum?.name}</h1>
            </div>
            <div className="middle-play-container">
                <div>Play Button Here</div>
            </div>
            <div className="album-songs-container">
                {songsInAlbum.length ? songsInAlbum.map(song => (
                    <div className="song-container">
                        <p>{song?.name}</p>
                        <p>{currentArtist?.name}</p>
                    </div>
                ))
                    : <div></div>}
            </div>
            <div className="more-by-artist">

            </div>
        </div>
    )
}
