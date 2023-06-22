import React, { useEffect, useState, useRef } from 'react';
import "./AudioPlayer.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearAudioThunk, nextSongThunk, prevSongThunk, shuffleSongsThunk } from '../../store/audioPlayer';

export default function AudioPlayer() {
    const dispatch = useDispatch()
    const audioPlayer = useSelector(state => state?.audioPlayer)
    const sessionUser = useSelector(state => state.session.user)
    console.log("THIS IS THE SESSION USER", sessionUser)

    const [isPlaying, setIsPlaying] = useState(false)
    const [songLength, setSongLength] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [songUrl, setSongUrl] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [trackCurrentSong, setTrackCurrentSong] = useState(audioPlayer?.songList[currentIndex])
    const [volume, setVolume] = useState(50)
    const [shuffle, setShuffle] = useState(false)

    const currentSongPlay = useSelector(state => state?.audioPlayer?.currentSong[0]?.song_url)
    console.log("THIS IS THE CURRENT SONG URL", currentSongPlay)
    const currentSong = useSelector(state => state?.audioPlayer?.currentSong[0])
    console.log("THIS IS THE CURRENT SONG INFO", currentSong)
    const audioPlayerState = useSelector(state => state?.audioPlayer)

    console.log("THIS IS THE TRACK CURRENT SONG", trackCurrentSong)
    console.log("THIS IS THE CURRENT INDEX", currentIndex)


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
        audioRef.current.currentTime = progressBarRef?.current.value
        setCurrentTime(progressBarRef.current.value)
    }

    const whilePlaying = () => {
        if (progressBarRef.current) {
            progressBarRef.current.value = audioRef?.current?.currentTime
            setCurrentTime(progressBarRef?.current?.value)
            barAnimationRef.current = requestAnimationFrame(whilePlaying)

        }
    }

    const volumeChange = (e) => {
        e.preventDefault()
        setVolume(e.target.value)
        audioRef.current.volume = e.target.value / 100
    }

    const nextSong = (e) => {
        e.preventDefault()
        if (!audioPlayer?.queue.length) {
            // setCurrentIndex(0)
            // setTrackCurrentSong("")
            return
        }
        if ((currentIndex >= audioPlayer?.songList.length - 1)) {
            // setCurrentIndex(0)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])

            dispatch(nextSongThunk())
        } else {
            setCurrentIndex((prev) => prev + 1)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex + 1])
            dispatch(nextSongThunk())
        }
    }

    const prevSong = (e) => {
        e.preventDefault()
        if (currentIndex === 0) {
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])
            dispatch(prevSongThunk(currentIndex))
        } else {
            setCurrentIndex((prev) => prev - 1)
            const newIndex = currentIndex - 1
            setTrackCurrentSong(audioPlayer?.songList[newIndex])
            dispatch(prevSongThunk(newIndex))
        }
    }

    const shuffleSongs = (e) => {
        e.preventDefault()
        setShuffle(!shuffle)
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
    }, [currentSongPlay, trackCurrentSong, audioPlayerState])

    useEffect(() => {
        if (songUrl) {
            audioRef.current.volume = volume / 100
            audioRef.current.play()
            setIsPlaying(true)
            barAnimationRef.current = requestAnimationFrame(whilePlaying)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])
        }
    }, [songUrl])

    // useEffect(() => {
    //     if (songLength == currentTime) {
    //         const nextSong = dispatch(nextSongThunk())
    //     }
    // }, [currentTime])
    useEffect(() => {
        if (songLength == currentTime) {
            if (shuffle) {
                dispatch(shuffleSongsThunk())
                const nextSong = dispatch(nextSongThunk())
                return
            }
            const nextSong = dispatch(nextSongThunk())
        }
    }, [currentTime])
    console.log("THE SHUFFLE", shuffle)

    useEffect(() => {

        if (!sessionUser) {
            dispatch(clearAudioThunk())
        }
    }, [dispatch, sessionUser])


    return (
        <div className="footer-buttons-container">
            <div className="song-info-container">
                <div className="song-info">
                    <img src={currentSong?.album_cover} style={{ width: 75 }}></img>
                    <div>
                        <p>{currentSong?.name}</p>
                        <p>{currentSong?.artist_name}</p>
                    </div>
                </div>
            </div>
            <div className="middle-section">
                <div className="buttons-container">
                    <audio ref={audioRef} src={songUrl} preload="metadata"></audio>
                    <button onClick={(e) => shuffleSongs(e)}>
                        <i class="fa-solid fa-shuffle"></i>
                    </button>
                    <button onClick={(e) => prevSong(e)}>
                        <i class="fa-solid fa-backward-step"></i>
                    </button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}
                    </button>
                    <button onClick={(e) => nextSong(e)}>
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
            <div className="volume-container">
                <div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={volumeChange}
                    />
                </div>
            </div>
        </div>
    )
}
