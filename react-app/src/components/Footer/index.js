import React, { useEffect } from 'react';
import "./Footer.css"
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from '../AudioPlayer';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

export default function Footer() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state?.session?.user)


    useEffect(()=> {

    }, [])

    return (
        <div className="footer-container">
            {sessionUser ?
            <AudioPlayer />
            :
            <div className="no-session-user">
                <div className="banner-left">
                    <div>
                        PREVIEW OF SPNOTIFY
                    </div>
                    <div>
                        Sign up or Log in to listen to songs!
                    </div>
                </div>
                <div className="banner-right">
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
            }
        </div>
    )
}
