import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./ArtistPage.css"


export default function OptionsButton({}) {
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
        <div>
            <button onClick={openMenu}>
                Options
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>add to playlist</li>
                <li>test button</li>
            </ul>
        </div>
    )
}
