import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ArtistPage.css"
import { useParams } from 'react-router-dom'
import { getSingleArtistThunk } from '../../store/artists';
import OptionsButton from './OptionsButton';
import OpenOptionsModalButton from './OpenOptionsModalButton';
import SongOptionsModal from '../SongOptionsModal';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { playArtistThunk, playSongThunk } from '../../store/audioPlayer';
import OpenModalAuthCheck from '../OpenModalAuthCheck';
import ConfirmLoginOrSignin from '../Sidebar/Confirm';
import OpenAboutModal from './OpenAboutModal';
import AboutPageModal from './AboutPageModal';


export default function ArtistPage() {
    const dispatch = useDispatch()
    const history = useHistory()


    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const currentArtist = useSelector(state => state.artists.singleArtist)



    const handleClickSingle = async (e, songId, albumId) => {
        e.preventDefault()
        dispatch(playSongThunk(songId, albumId, id))
    }

    const handleClickArtistSongs = async (e) => {
        e.preventDefault()
        dispatch(playArtistThunk(id))
    }


    useEffect(() => {
        dispatch(getSingleArtistThunk(id))

    }, [dispatch])

    useEffect(() => {
        document.getElementById("scroll-to-top").scroll(0,0)
    }, []);



    return (
        <div className="single-artist-container">
            {/* <img className="test-background" src={currentArtist.artist_picture} style={{ width: 800 }}></img> */}
            <div className="top-header-container" style={{
                backgroundImage: `url(${currentArtist.artist_picture})`
            }}>
                <div className="header-artist-name">{currentArtist.name}</div>
                {/* <img src={currentArtist.artist_picture} style={{ width: 800 }}></img> */}
            </div>
            {/* <div className="middle-play-container"> */}
            {sessionUser ?
                <div className="middle-play-container"><i onClick={handleClickArtistSongs} class="fa-solid fa-play fa-lg"></i></div>
                :
                <OpenModalAuthCheck mainButtonTest={true} modalComponent={<ConfirmLoginOrSignin />} />
            }
            {/* </div> */}
            <div className="single-songs-container">
                <h2>Songs</h2>
                {currentArtist?.songs?.map(song => (
                    <div key={song.id} className="single">

                            <div onClick={() => history.push(`/songs/${song.id}`)} className="single-song">
                                <div className="album-and-song">
                                    <img src={song.album_cover} style={{ width: 75, cursor: "pointer" }}></img>
                                    <p>{song.name}</p>
                                </div>
                                <p>{song.num_of_plays}</p>
                            </div>
                            {/* <div onClick={(e) => handleClickSingle(e, song?.id, song.album_id)}>
                            PLAY BUTTON HERE
                        </div> */}
                            {sessionUser ?
                                <div className="artist-page-play-button" onClick={(e) => handleClickSingle(e, song?.id, song.album_id)}>
                                    <i class="fa-solid fa-play"></i>
                                </div>
                                :
                                <OpenModalAuthCheck modalComponent={<ConfirmLoginOrSignin />} />
                            }
                            <div className="song-to-playlist">
                                {sessionUser ?
                                    <OpenOptionsModalButton
                                        buttonText="Add Song To Playlist"
                                        modalComponent={<SongOptionsModal songId={song.id} songName={song.name} />}
                                    />
                                    // <OptionsButton />
                                    :
                                    <OpenOptionsModalButton
                                        buttonText="Add Song To Playlist"
                                        modalComponent={<ConfirmLoginOrSignin />}
                                    />
                                }
                            </div>

                    </div>
                ))}
            </div>
            <div className="single-albums-container">
                <h2>Discography</h2>
                {currentArtist?.albums?.map(album => (
                    <div onClick={() => history.push(`/albums/${album.id}`)} className="album">
                        <div className="album-inside">
                            <div className="album-image">
                                <img src={album.album_picture}></img>

                            </div>
                            <div className="album-info-bottom">
                                {/* <h3>{album.name}</h3> */}
                                {album?.name?.length > 16 ? <h3>{`${album?.name?.slice(0, 16)}...`}</h3> : <h3>{album.name}</h3>}
                                <p>{album.artist_name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="artist-about-container">
                <h2>About</h2>
                {/* <img src={currentArtist.artist_picture} style={{ width: 800 }}></img>
                <p>{currentArtist.about}</p> */}
                <OpenAboutModal
                modalComponent={<AboutPageModal aboutPicture={currentArtist?.artist_picture} aboutContent={currentArtist?.about}/>}
                aboutPicture={currentArtist?.artist_picture}
                aboutContent={currentArtist?.about}
                />
            </div>
        </div>
    )
}
