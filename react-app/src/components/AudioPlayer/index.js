import React, { useEffect, useState, useRef } from 'react';
import "./AudioPlayer.css"
import { useDispatch, useSelector } from 'react-redux';

export default function AudioPlayer() {
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(false)
    const [songLength, setSongLength] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef()   // reference to the audio
    const progressBarRef = useRef() // reference to the progressbar
    const barAnimationRef = useRef() // reference the animation bar

    const togglePlayPause = () => {
        // the current.play() and current.pause() comes with the html dom element
        const previousValue = isPlaying
        setIsPlaying(!previousValue)
        if (!previousValue) {
            audioRef.current.play()
            barAnimationRef.current = requestAnimationFrame(whilePlaying) // requestAnimationFrame is a JS function
        } else {
            audioRef.current.pause()
            cancelAnimationFrame(barAnimationRef.current)
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
        audioRef.current.currentTime = progressBarRef.current.value
        setCurrentTime(progressBarRef.current.value)
    }

    const whilePlaying = () => {
        progressBarRef.current.value = audioRef.current.currentTime
        setCurrentTime(progressBarRef.current.value)
        barAnimationRef.current = requestAnimationFrame(whilePlaying)
    }


    useEffect(() => {
        const seconds = Math.floor(audioRef.current.duration)
        setSongLength(seconds)
        progressBarRef.current.max = seconds
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
                    <input className="progress-bar" type="range" defaultValue="0" ref={progressBarRef} onChange={changeRange}/>
                </div>

                {/* song length */}
                <div>
                    {songLength && !isNaN(songLength) ? time(songLength) : `00:00`}
                </div>

            </div>
        </div>
    )
}
