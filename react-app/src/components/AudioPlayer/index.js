import React, { useEffect, useState, useRef } from 'react';
import "./AudioPlayer.css"
import { useDispatch, useSelector } from 'react-redux';

export default function AudioPlayer() {
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef()   // reference to the audio
    const progressBar = useRef() // reference to the progressbar
    console.log("THIS IS THE DURATION", duration)
    console.log("THIS IS THE audio ref", audioRef.current)
    console.log("checking isNaN", !isNaN(duration))


    const togglePlayPause = () => {
        // the current.play() comes with the html dom element
        const previousValue = isPlaying
        setIsPlaying(!previousValue)
        if (!previousValue) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }

    const time = (seconds) => {
        const initialMinutes = Math.floor(seconds / 60)
        const resMinutes = initialMinutes < 10 ? `0${initialMinutes}` : `${initialMinutes}`
        const initialSeconds = Math.floor(seconds % 60)
        const resSeconds = initialSeconds < 10 ? `0${initialSeconds}` : `${initialSeconds}`
        const resTime = `${resMinutes}:${resSeconds}`
        return resTime
    }

    const changeRange = () => {
        audioRef.current.currentTime = progressBar.current.value

    }


    useEffect(() => {
        const seconds = Math.floor(audioRef.current.duration)
        console.log("the seconds in the useeffect before set duration", seconds)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

    return (
        <div className="footer-buttons-container">
            <div className="buttons-container">
                <audio ref={audioRef} src="https://spnotify.s3.us-east-2.amazonaws.com/Day+That+I+Die+(feat.+Amos+Lee).mp3" preload="metadata"></audio>
                <button>
                <i class="fa-solid fa-backward-step"></i>
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}
                </button>
                <button>
                <i class="fa-solid fa-forward-step"></i>
                </button>

            </div>

            <div className="footer-tracker-container">
                {/* current time */}
                <div>
                    {time(currentTime)}
                </div>

                {/* progress bar*/}
                <div>
                    <input className="progress-bar" type="range" defaultValue="0" ref={progressBar} onChange={changeRange}/>
                </div>

                {/* duration */}
                <div>
                    {duration && !isNaN(duration) ? time(duration) : `00:00`}
                </div>

            </div>
        </div>
    )
}
