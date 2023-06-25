import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import LoginFormModal from '../LoginFormModal';
import OpenModalCheck from './OpenModalCheck';
import SignupFormModal from '../SignupFormModal';
import "./Sidebar.css"


export default function ConfirmLoginOrSignin() {



    return (
        <div className="auth-confirm-container">
            <p>Login or sign up to continue</p>
            <div className="auth-modal-buttons">
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
        </div>
    )
}
