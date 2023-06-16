import React, { useState } from "react";
import { useDispatch } from "react-redux";


export default function CreateAlbumReviewModal ({currentAlbum}) {

    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(currentReview.stars)
    const [activeStars, setActiveStars] = useState(stars)


    return (

    )
}
