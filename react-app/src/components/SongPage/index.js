import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllSongsThunk } from "../../store/songs"


export default function SongPage() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const allSongs = useSelector(state => state?.songs?.allSongs)
    console.log("THESE ARE THE SONGS========", allSongs)
    console.log("IN THE SONG PAGE")

    // on a redirect will take you to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getAllSongsThunk())
    }, [dispatch])

    return (
        <h1>song pageasdfasdf</h1>
    )
}
