import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAlbumsThunk } from '../../store/albums';
import { getAlbumReviewsThunk, getAllAlbumReviewsThunk } from '../../store/albumReviews';
import { getArtistsThunk } from '../../store/artists';
import OpenReviewButton from './OpenReviewButton';
import DeleteAlbumReviewModal from '../DeleteReviewModal';
import CreateAlbumReviewModal from '../CreateAlbumReviewModal';

export default function AlbumPage() {
    const dispatch = useDispatch()
    const { id } = useParams()

    const albums = useSelector(state => state?.albums?.allAlbums)
    const currentAlbum = albums[id]
    const songsInAlbum = currentAlbum?.songs
    const artists = useSelector(state => state?.artists?.allArtists)
    const currentArtist = artists[id]
    const albumReviews = currentAlbum?.album_reviews
    const currentUser = useSelector(state => state?.session?.user)
    const albumReviewsState = useSelector(state => state?.albumReviews?.singleAlbumReviews)
    const allAlbumReviews = useSelector(state => state?.albumReviews?.allAlbumReviews)
    console.log("ALL ALBUM REVIEW STATE +++++++++++++++", allAlbumReviews)
    const allAlbumReviewsObj = Object.values(allAlbumReviews).filter(review => review.album_id == id)

    console.log("THIS IS TEH FILTERED REVIEW OBJECTS", allAlbumReviewsObj)


    let hasReview;

    for (let review of Object.values(albumReviewsState)) {
        if (review.user_id === currentUser?.id) {
            hasReview = true
        }

    }

    useEffect(() => {
        dispatch(getAlbumsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumReviewsThunk(id))
        dispatch(getAllAlbumReviewsThunk())
    }, [dispatch, currentUser, id, hasReview])



    return (
        <div className="single-album-container">
            <div className="top-container">
                <img style={{ width: 200 }} src={currentAlbum?.album_picture}></img>
                <h1>{currentAlbum?.name}</h1>
                {!hasReview && (
                    <OpenReviewButton
                    buttonText="Write a Review"
                    modalComponent={<CreateAlbumReviewModal currentAlbumId={id} formType="new" currentAlbum={currentAlbum} />}
                />
                )}
            </div>
            <div className="middle-play-container">
                <div>Play Button Here</div>
            </div>
            <div className="album-songs-container">
                {songsInAlbum && songsInAlbum.length ? songsInAlbum.map(song => (
                    <div className="song-container">
                        <p>{song?.name}</p>
                        <p>{currentArtist?.name}</p>
                    </div>
                ))
                    : <div></div>}
            </div>
            <div className="more-by-artist">

            </div>
            <div className="album-review-container">
                <h2>Album Reviews</h2>

                <div className="review-container">
                    {/* {albumReviews && albumReviews.length ? albumReviews.map(review => (
                        <div className="review">
                            <h2>{review?.review_user?.username}</h2>
                            <p>{review?.star_review} Stars</p>
                            <p>{review?.review}</p>
                            {currentUser?.id === review?.user_id && (
                                <div>
                                    <OpenReviewButton
                                        buttonText="Edit Review"
                                        modalComponent={<CreateAlbumReviewModal reviewId={review.id} albumReview={review} formType="edit" currentAlbum={currentAlbum} />}
                                    />
                                    <OpenReviewButton
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
                    } */}
                    {allAlbumReviewsObj && allAlbumReviewsObj.length ? allAlbumReviewsObj.map(review => (
                        <div className="review">
                            <h2>{review?.review_user?.username}</h2>
                            <p>{review?.star_review} Stars</p>
                            <p>{review?.review}</p>
                            {currentUser?.id === review?.user_id && (
                                <div>
                                    <OpenReviewButton
                                        buttonText="Edit Review"
                                        modalComponent={<CreateAlbumReviewModal reviewId={review.id} albumReview={review} formType="edit" currentAlbum={currentAlbum} />}
                                    />
                                    <OpenReviewButton
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
