import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPlaylistsThunk, getUserPlaylistsThunk, removeSongFromPlaylistThunk, getAllPlaylistReviewThunk } from '../../store/playlists';
import UpdatePlaylist from '../UpdatePlaylist';
import { getArtistsThunk } from '../../store/artists';
import { getAlbumsThunk } from '../../store/albums';
import { playPlaylistThunk, playSongThunk } from '../../store/audioPlayer';
import "./PlaylistPage.css"
import CreatePlaylistReviewModal from './CreatePlaylistReviewModal';
import OpenPlaylistReviewButton from './OpenPlaylistReviewButton';
import PlaylistNameModal from "./PlaylistNameModal"
import CreateAlbumReviewModal from '../CreateAlbumReviewModal';
import DeletePlaylistReviewModal from './DeletePlaylistReviewModal';


export default function PlaylistPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const allPlaylists = useSelector(state => state?.playlists?.allPlaylists)
    const currentPlaylist = allPlaylists[id]
    const artists = useSelector(state => state?.artists?.allArtists)
    const albums = useSelector(state => state?.albums?.allAlbums)
    const sessionUser = useSelector(state=> state?.session?.user)

    const userPlaylist = useSelector(state => state?.playlists?.userPlaylists)
    console.log("THIS IS THE USER PLAYLIST", userPlaylist)

    const allPlaylistReviews = useSelector(state => state?.playlists?.playlistReviews)
    const allPlaylistReviewsObj = Object.values(allPlaylistReviews).filter(review => review.playlist_id == id)
    console.log("all playlist reviews obj", allPlaylistReviewsObj)


    const songsInPlaylist = currentPlaylist?.songs_in_playlist
    const songObj = Object.values(songsInPlaylist || {})

    const playlistPrivate = currentPlaylist?.private === true ? "private" : "public"

    let hasReview;
    for (let review of allPlaylistReviewsObj) {

        if (review?.user_playlist_review?.id == sessionUser?.id) {
            hasReview = true
        }
    }

    const handleSubmit = async (e, songId) => {
        e.preventDefault()

        const removeSongFromPlaylist = await dispatch(removeSongFromPlaylistThunk(songId, id))
    }

    const handleClickPlaylist = async (e) => {
        e.preventDefault()
        dispatch(playPlaylistThunk(id))
    }

    const handleClickSong = async (e, songId, albumId, artistId) => {
        e.preventDefault()
        dispatch(playSongThunk(songId, albumId, artistId))
    }


    useEffect(() => {
        dispatch(getAllPlaylistReviewThunk(id))
        dispatch(getAllPlaylistsThunk())
        dispatch(getUserPlaylistsThunk())
        dispatch(getArtistsThunk())
        dispatch(getAlbumsThunk())

    }, [dispatch])

    // On a redirect, will rerender to top of the page
    useEffect(() => {
        document.getElementById("scroll-to-top").scroll(0, 0)
    }, []);



    return (
        <div className="single-playlist-page-container">
            <div className="playlist-header-container">
                <p>Playlist</p>
                {sessionUser && userPlaylist[id] ? <PlaylistNameModal
                    buttonText={currentPlaylist?.name}
                    modalComponent={<UpdatePlaylist playlistName={currentPlaylist?.name} playlistId={id} playlistPrivate={playlistPrivate} />}
                />
                :
                <div className="playlist-name-modal-not-owner">
                {currentPlaylist?.name}
                {/* {!hasReview && sessionUser && (
                    <OpenPlaylistReviewButton
                    type="new-playlist"
                    modalComponent={<CreatePlaylistReviewModal
                        currentPlaylistId={id}
                        currentPlaylist={currentPlaylist}
                        formType="newPlaylist"
                        />}
                />
                )} */}

                </div>
                }

                <p>{currentPlaylist?.user_playlist?.username}</p>
                {!hasReview && sessionUser && !userPlaylist[id] && (
                    <OpenPlaylistReviewButton
                    type="new-playlist"
                    modalComponent={<CreatePlaylistReviewModal
                        currentPlaylistId={id}
                        currentPlaylist={currentPlaylist}
                        formType="newPlaylist"
                        />}
                />
                )}
            </div>
            <div className="middle-play-container"><i onClick={handleClickPlaylist} class="fa-solid fa-play fa-lg"></i></div>
            <div className="playlist-song-container">
                {songObj && songObj.length > 0 && Array.isArray(songObj) ? (songObj.map(song => (
                    <div className="playlist-song">
                        <div className="title-container">
                            <img src={song?.album_cover} style={{ width: 100 }}></img>
                            <div className="playlist-song-artist">
                                <p onClick={() => history.push(`/songs/${song.id}`)}>{song?.name}</p>
                                <p onClick={() => history.push(`/artists/${song.artist_id}`)}>{artists[song.artist_id]?.name}</p>
                            </div>
                        </div>
                        <div className="playlist-bar-right">
                            <div className="playlist-album-name">
                                <p onClick={() => history.push(`/albums/${song.album_id}`)}>{albums[song.album_id]?.name}</p>
                            </div>
                            <div className="playlist-controls-container">
                                <div onClick={(e) => { handleClickSong(e, song.id, song.album_id, song.artist_id) }}><i class="fa-solid fa-play"></i></div>
                                <div onClick={(e) => { handleSubmit(e, song.id) }}><i class="fa-regular fa-trash-can"></i></div>
                            </div>
                        </div>
                    </div>
                ))) : <div style={{fontSize: 50, color: "white"}}>No Songs</div>}
            </div>
            <div className="playlist-review-container">
                <h2>Playlist Reviews</h2>
                <div classname="playlist-container">
                    {allPlaylistReviewsObj && allPlaylistReviewsObj.length ?
                    allPlaylistReviewsObj.map(review => (
                        <div className="playlist-review">
                            <h3>{review?.user_playlist_review?.username}</h3>
                            <p>{review?.review}</p>
                            {sessionUser?.id == review.user_playlist_review?.id && (
                                <div className="playlist-review-edit-delete-buttons">
                                    <OpenPlaylistReviewButton
                                        type="edit-playlist"
                                        modalComponent={<CreatePlaylistReviewModal
                                            reviewId={review.id}
                                            playlistReview={review}
                                            currentPlaylist={currentPlaylist}
                                            formType="editPlaylist"
                                        />}
                                    />
                                    <OpenPlaylistReviewButton
                                        type="delete-playlist"
                                        modalComponent={<DeletePlaylistReviewModal
                                            playlistReview={review}
                                            playlistReviewId={review.id}

                                        />}
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
