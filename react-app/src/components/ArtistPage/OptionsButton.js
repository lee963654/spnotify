import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./ArtistPage.css"


export default function OptionsButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className="options-button">
            <button onClick={openMenu}>
                Options
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>Add to playlist</li>
                <li>Go to album</li>
                <li>Go to song page</li>
            </ul>
        </div>
    )
}
