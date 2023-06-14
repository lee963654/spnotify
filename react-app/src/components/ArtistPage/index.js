import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ArtistPage.css"
import { useParams } from 'react-router-dom'
import { getSingleArtistThunk } from '../../store/artists';

export default function ArtistPage() {
    const dispatch = useDispatch()


    const { id } = useParams()

    const currentArtist = useSelector(state => state.artists.singleArtist)
    console.log("THE CURRENT ARTIST", currentArtist)

    useEffect(()=> {
        dispatch(getSingleArtistThunk(id))
    }, [dispatch])

    return (
        <div className="single-artist-container">
            <h1>{currentArtist.name}</h1>

        </div>
    )
}
