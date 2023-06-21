import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function ProfilePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session?.user)



    useEffect(() => {

    }, [dispatch])



    return (
        <div className="profile-container">
            <div className="profile-header">
                <div>{sessionUser.username}</div>
            </div>
        </div>
    )
}
