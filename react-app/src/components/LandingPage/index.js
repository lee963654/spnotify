import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { Link } from "react-router-dom"
import "./LandingPage.css";
import { getAllPlaylistsThunk } from '../../store/playlists';

export default function LandingPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const artists = useSelector(state => state.artists.allArtists)
    const albums = useSelector(state => state.albums.allAlbums)
    const artistObj = Object.values(artists)
    const albumsObj = Object.values(albums)

    const gabe = artists[1]
    const luke = artists[2]
    const chris = artists[3]
    const zac = artists[4]
    const featureArtists = [gabe, luke, chris, zac]
    console.log("THESE ARE THE FEATURE ARTISTS", featureArtists)

    const hometown = albums[1]
    const honky = albums[5]
    const starting = albums[3]
    const reunion = albums [9]
    const featureAlbums = [hometown, honky, reunion, starting]


    useEffect(() => {
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())
        dispatch(getAllPlaylistsThunk())
    }, [dispatch])


    return (
        <div className="landing-container">
            <div className="my-info-container">
                <h2>James Lee</h2>
                <div className="my-info-icons">
                    <a href="https://www.linkedin.com/in/jamesleeswe/" target="_blank" rel="noreferrer">
                    <i class="fa-brands fa-linkedin fa-xl"></i>
                    </a>
                    <a href="https://github.com/lee963654" target="_blank" rel="noreferrer">
                    <i class="fa-brands fa-github fa-xl"></i>
                    </a>
                </div>
            </div>
            <div className="body-container">
                <div className="all-artists-container">
                    <h2>Featured Artists</h2>
                    <div className="artists-container">

                        {featureArtists.map(artist => (
                            <Link to={`/artists/${artist?.id}`} key={artist?.id} title={artist?.name} className="artist-link">
                                <div key={artist?.id} className="artist">
                                    <div className="artist-inside">
                                        <div className="artist-image">
                                            <img alt="artist" src={artist?.artist_icon_picture}></img>

                                        </div>
                                        <div className="artist-info-bottom">
                                            <h3>{artist?.name}</h3>
                                            <p>Artist</p>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="all-albums-container">
                    <h2>Featured Albums</h2>
                    <div className="albums-container">
                        {featureAlbums.map(album => (
                            <Link to={`/albums/${album?.id}`} key={album?.id} title={album?.name} className="album-link">
                                <div className="album">
                                    <div className="album-inside">
                                        <div className="album-image">
                                            <img alt="album" src={album?.album_picture}></img>

                                        </div>
                                        <div className="album-info-bottom">
                                            {/* <h3>{album.name}</h3> */}
                                            {album?.name?.length > 16 ? <h3>{`${album?.name?.slice(0, 16)}...`}</h3> : <h3>{album?.name}</h3>}
                                            <p>{album?.artist_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>

        </div>

    )
}
