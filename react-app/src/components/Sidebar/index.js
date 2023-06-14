import React from 'react';
import { useSelector } from 'react-redux';
import "./Sidebar.css";

export default function Sidebar() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="sidebar-container">
            {sessionUser ? <h1>Logged in Side Bar</h1> : <h1>No User Side Bar</h1>}
        </div>

    )
}
