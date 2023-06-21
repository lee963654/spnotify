import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getArtistsThunk } from '../../store/artists';


export default function AllArtistsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allArtists = useSelector(state => state?.artists?.allArtists)
    const allArtistsObj = Object.values(allArtists || {})
    console.log("THESE ARE ALL THE ARTISTS", allArtistsObj)

    useEffect(() => {
        dispatch(getArtistsThunk())
    }, [dispatch])

    return (
        <div className="all-artists-container">
            <h1>All Artists</h1>
            <div className="artists-container">
                {allArtistsObj && allArtistsObj.map(artist => (
                    <div onClick={() => history.push(`/artists/${artist.id}`)} className="artist">
                        <div className="artist-info">
                            <img src={artist.about_picture} style={{width: 75}}></img>
                            <div>{artist.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
