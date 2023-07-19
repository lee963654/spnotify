import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAlbumsThunk } from '../../store/albums';
import { getAlbumReviewsThunk, getAllAlbumReviewsThunk } from '../../store/albumReviews';
import { getArtistsThunk } from '../../store/artists';
import OpenReviewButton from './OpenReviewButton';
import DeleteAlbumReviewModal from '../DeleteReviewModal';
import CreateAlbumReviewModal from '../CreateAlbumReviewModal';
import OpenOptionsModalButton from '../ArtistPage/OpenOptionsModalButton';
import SongOptionsModal from '../SongOptionsModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { playAlbumThunk, playSongThunk } from '../../store/audioPlayer';
import OpenModalAuthCheck from '../OpenModalAuthCheck';
import ConfirmLoginOrSignin from '../Sidebar/Confirm';
import "./AlbumPage.css"

export default function AlbumPage() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const albums = useSelector(state => state?.albums?.allAlbums)
    const currentAlbum = albums[id]
    const songsInAlbum = currentAlbum?.songs
    const artists = useSelector(state => state?.artists?.allArtists)
    const currentArtist = artists[currentAlbum?.artist_id]
    const albumReviews = currentAlbum?.album_reviews
    const currentUser = useSelector(state => state?.session?.user)
    const albumReviewsState = useSelector(state => state?.albumReviews?.singleAlbumReviews)
    const allAlbumReviews = useSelector(state => state?.albumReviews?.allAlbumReviews)
    const allAlbumReviewsObj = Object.values(allAlbumReviews).filter(review => review.album_id == id)
    console.log("THIS IS THE CURRENT ARTIST", currentArtist)
    console.log("THIS IS THE CURRENT album", currentAlbum)

    let hasReview;

    for (let review of Object.values(albumReviewsState)) {
        if (review.user_id === currentUser?.id) {
            hasReview = true
        }

    }

    const handleClickAlbum = async (e) => {
        e.preventDefault()
        dispatch(playAlbumThunk(id, currentAlbum?.id, currentArtist?.id))
    }

    const handleClickSingle = async (e, songId) => {
        e.preventDefault()
        dispatch(playSongThunk(songId, currentAlbum?.id, currentArtist?.id))
    }

    useEffect(() => {
        dispatch(getAlbumsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumReviewsThunk(id))
        dispatch(getAllAlbumReviewsThunk())

    }, [dispatch, currentUser, id, hasReview])

    useEffect(() => {
        document.getElementById("scroll-to-top").scroll(0,0)
    }, []);




    return (
        <div className="single-album-container">
            <div className="top-container">
                <div className="top-container-album">
                    <img src={currentAlbum?.album_picture}></img>
                    <div className="album-info-container">
                        <h1>{currentAlbum?.name}</h1>
                        <div className="album-artist-container">
                            <img src={currentArtist?.artist_icon_picture}></img>
                            <h2 onClick={() => history.push(`/artists/${currentArtist?.id}`)}>{currentArtist?.name}</h2>
                            <p>{currentAlbum?.release_year}</p>
                            {songsInAlbum?.length === 1 ? <p>{songsInAlbum?.length} song</p> : <p>{songsInAlbum?.length} songs</p>}
                            {!hasReview && currentUser && (
                                <OpenReviewButton
                                    type="new"
                                    buttonText="Write a Review"
                                    modalComponent={<CreateAlbumReviewModal currentAlbumId={id} formType="new" currentAlbum={currentAlbum} />}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {currentUser ?
                <div className="middle-play-container">
                    <i onClick={handleClickAlbum} class="fa-solid fa-play fa-lg"></i>
                </div>
                :
                <OpenModalAuthCheck mainButtonTest={true} modalComponent={<ConfirmLoginOrSignin />} />
            }
            <div className="album-songs-container">
                <h2>Songs</h2>
                {songsInAlbum && songsInAlbum.length ? songsInAlbum.map(song => (
                    <div className="song-container-album">
                        <div className="song-container-info">
                            <p onClick={() => history.push(`/songs/${song?.id}`)}>{song?.name}</p>
                            <p onClick={() => history.push(`/artists/${currentArtist?.id}`)}>{currentArtist?.name}</p>
                        </div>
                        <div className="song-container-info-bottom">
                            {currentUser ?
                                <div onClick={(e) => handleClickSingle(e, song?.id)}>
                                    <i class="fa-solid fa-play"></i>
                                </div>
                                :
                                <OpenModalAuthCheck modalComponent={<ConfirmLoginOrSignin />} />
                            }
                            {currentUser ?
                                <OpenOptionsModalButton
                                    buttonText="Add Song To Playlist"
                                    modalComponent={<SongOptionsModal songId={song.id} songName={song.name} />}
                                />
                                :
                                <OpenOptionsModalButton
                                    buttonText="Add Song To Playlist"
                                    modalComponent={<ConfirmLoginOrSignin />}
                                />
                            }
                        </div>
                        {/* // <OpenOptionsModalButton
                        //     buttonText="Add Song To Playlist"
                        //     modalComponent={<SongOptionsModal songId={song.id} songName={song.name} />}
                        // /> */}

                    </div>
                ))
                    : <div></div>}
            </div>
            <div className="more-by-artist">

            </div>
            <div className="album-review-container">
                <h2>Album Reviews</h2>

                <div className="review-container">
                    {allAlbumReviewsObj && allAlbumReviewsObj.length ? allAlbumReviewsObj.map(review => (
                        <div className="review">
                            <h3>{review?.review_user?.username}</h3>
                            {/* <p>{review?.star_review} Stars</p> */}
                            <p>{review?.review}</p>
                            {currentUser?.id === review?.user_id && (
                                <div className="album-edit-delete-buttons">
                                    <OpenReviewButton
                                        type="edit"
                                        buttonText="Edit Review"
                                        modalComponent={<CreateAlbumReviewModal reviewId={review.id} albumReview={review} formType="edit" currentAlbum={currentAlbum} />}
                                    />
                                    <OpenReviewButton
                                        type="delete"
                                        buttonText="Delete Review"
                                        modalComponent={<DeleteAlbumReviewModal reviewId={review.id} currentAlbum={currentAlbum} />}
                                    />
                                </div>
                            )}
                        </div>
                    )) :
                        <div>
                            <h2>No Reviews</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
