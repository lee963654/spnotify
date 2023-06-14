import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { Link } from "react-router-dom"
import "./LandingPage.css";

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const artists = useSelector(state => state.artists.allArtists)
    const albums = useSelector(state => state.albums.allAlbums)
    console.log("THESE ARE THE ARTISTS", artists)
    const artistObj = Object.values(artists)
    console.log("artist object===", artistObj)
    const albumsObj = Object.values(albums)
    console.log("THESE ARE THE ALBUMS", albumsObj)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
    }, [dispatch])

    return (
        <div className="landing-container">
            <div className="all-artists-container">
                <h1>Artists</h1>
                <div className="artists-container">
                    {artistObj.map(artist => (
                        <Link to={`/artists/${artist.id}`} key={artist.id} title={artist.name} className="artist-link">
                            <div key={artist.id} className="artist">
                                <img alt="artist" src={artist?.artist_picture}></img>
                                <h3>{artist.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="albums-container">
                    {albumsObj.map(album => (
                        <div className="album">
                            <img alt="album" src={album?.album_picture}></img>
                            <h3>{album.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}