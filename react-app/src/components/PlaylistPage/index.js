import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPlaylistsThunk } from '../../store/playlists';

export default function PlaylistPage () {
    const dispatch = useDispatch()
    const { id } = useParams()
    const allPlaylists = useSelector(state => state.playlists.allPlaylists)
    console.log("THIS IS TEH ID IN THE PLAYLIST PAGE", id)
    console.log("TESTING, ", allPlaylists)

    useEffect(() => {

        dispatch(getAllPlaylistsThunk())

    }, [dispatch])

    return (
        <h1>{id}</h1>
    )

}
