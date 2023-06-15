import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import LoginFormModal from '../LoginFormModal';
import OpenModalCheck from './OpenModalCheck';
import SignupFormModal from '../SignupFormModal';


export default function ConfirmLoginOrSignin() {



    return (
        <div>
            <p>Login or sign up to create and share playlists</p>
            <OpenModalCheck
                buttonText="Login"
                // onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
            />
            <OpenModalCheck
                buttonText="Signup"
                // onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
            />
        </div>
    )
}
