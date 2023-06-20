import React, { useEffect, useState, useRef } from 'react';
import "./AudioPlayer.css"
import { useDispatch, useSelector } from 'react-redux';
import { nextSongThunk } from '../../store/audioPlayer';

export default function AudioPlayer() {
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(false)
    const [songLength, setSongLength] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [songUrl, setSongUrl] = useState("")

    const currentSongPlay = useSelector(state => state?.audioPlayer?.currentSong[0]?.song_url)
    console.log("THIS IS THE CURRENT SONG PLAY", currentSongPlay)
    const currentSong = useSelector(state => state?.audioPlayer?.currentSong[0])
    console.log("THIS IS THE CURRENT SONG INFO", currentSong)
    const audioPlayer = useSelector(state => state?.audioPlayer)
    console.log("THIS IS THE AUDIO PLAYER INFO", audioPlayer)


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

    useEffect(() => {
        if (currentSongPlay) {

            setSongUrl(currentSongPlay)
        }
    }, [currentSongPlay])

    useEffect(() => {
        if (songUrl) {
            audioRef.current.play()
            setIsPlaying(true)
            barAnimationRef.current = requestAnimationFrame(whilePlaying)

        }
    }, [songUrl])

    useEffect(() => {

        if (songLength == currentTime) {
            const nextSong = dispatch(nextSongThunk())

        }
    }, [currentTime])


    return (
        <div className="footer-buttons-container">
            <div className="song-info-container">
                <div className="song-info">
                    <img src={currentSong?.album_cover} style={{width: 75}}></img>
                    <div>
                        <p>{currentSong?.name}</p>
                        <p>{currentSong?.artist_name}</p>
                    </div>
                </div>
            </div>
            <div className="middle-section">
                <div className="buttons-container">
                    <audio ref={audioRef} src={songUrl} preload="metadata"></audio>
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
                        <input className="progress-bar" type="range" defaultValue="0" ref={progressBarRef} onChange={changeRange} />
                    </div>

                    {/* song length */}
                    <div>
                        {songLength && !isNaN(songLength) ? time(songLength) : `00:00`}
                    </div>
                </div>

            </div>
        </div>
    )
}
