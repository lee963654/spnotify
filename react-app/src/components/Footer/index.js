import React, { useEffect } from 'react';
import "./Footer.css"
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from '../AudioPlayer';

export default function Footer() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state?.session?.user)


    useEffect(()=> {

    }, [])

    return (
        <div className="footer-container">
            {sessionUser ?
            <AudioPlayer />
            : <h1>footer without session user</h1>}
        </div>
    )
}
