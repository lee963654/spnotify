import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./ProfilePage.css"


export default function ProfilePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session?.user)
    const followingArtists = Object.values(sessionUser?.following)
    console.log("this is the following artists", followingArtists)


    useEffect(() => {

    }, [dispatch])



    return (
        <div className="profile-page-container">
            <div className="profile-page-header">
                <div className="profile-page-header-username">{sessionUser.username}</div>
            </div>
            {/* <div style={{marginLeft: 100, color: "white", marginTop: 100, fontSize:100}}>Page Coming Soon!</div> */}
            <div className="all-artists-container">
                <h1>Following Artists</h1>
                <div className="artists-container">
                    {followingArtists.length ?
                    followingArtists.map(artist => (
                        <div onClick={() => history.push(`/artists/${artist.id}`)} className="artist">
                            <div className="artist">
                                <div className="artist-inside">
                                    <div className="artist-image">
                                    <img src={artist.artist_icon_picture}></img>
                                    </div>
                                    <div className="artist-info-bottom">
                                        <h3>{artist.name}</h3>
                                        <p>Artist</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
