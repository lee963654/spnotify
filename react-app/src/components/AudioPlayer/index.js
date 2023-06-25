import React, { useEffect, useState, useRef } from 'react';
import "./AudioPlayer.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearAudioThunk, nextSongThunk, prevSongThunk, shuffleSongsThunk, playFromStartThunk, originalSongOrderThunk } from '../../store/audioPlayer';

export default function AudioPlayer() {
    const dispatch = useDispatch()
    const audioPlayer = useSelector(state => state?.audioPlayer)
    const sessionUser = useSelector(state => state.session.user)
    // console.log("THIS IS THE SESSION USER", sessionUser)

    const [isPlaying, setIsPlaying] = useState(false)
    const [songLength, setSongLength] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [songUrl, setSongUrl] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [trackCurrentSong, setTrackCurrentSong] = useState(audioPlayer?.songList[currentIndex])
    const [volume, setVolume] = useState(10)
    const [shuffle, setShuffle] = useState(false)
    const [loopOne, setLoopOne] = useState(false)
    const [loop, setLoop] = useState(false)

    const currentSongPlay = useSelector(state => state?.audioPlayer?.currentSong[0]?.song_url)
    console.log("THIS IS THE CURRENT SONG URL", currentSongPlay)
    const currentSong = useSelector(state => state?.audioPlayer?.currentSong[0])
    // console.log("THIS IS THE CURRENT SONG INFO", currentSong)


    console.log("THIS IS THE TRACK CURRENT SONG", trackCurrentSong)
    console.log("THIS IS THE CURRENT INDEX", currentIndex)


    const audioRef = useRef()   // reference to the audio
    const progressBarRef = useRef() // reference to the progressbar
    const barAnimationRef = useRef() // reference the animation bar
    const songListRef = useRef() // reference the list of songs



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
        //updating the progress bar
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
        // if (!audioPlayer?.queue.length) {
        //     console.log("IN THE NO AUDIO PLAYER")
        //     // setCurrentIndex(0)
        //     // setTrackCurrentSong("")
        //     return
        // }


        if ((currentIndex >= audioPlayer?.songList.length - 1)) {
            // setCurrentIndex(0)
            //TEST loop
            if (loop) {
                console.log("IN THE LOOP")
                dispatch(playFromStartThunk())
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                // dispatch(nextSongThunk())
                return
            }
            //TEST loop
            if (shuffle && (audioPlayer?.songList?.length === audioPlayer?.queue?.length)) {
                console.log("IN THE CURRENT INDEX >= audioplayer songlist length")
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            if (!shuffle && (audioPlayer?.songList?.length === audioPlayer?.queue?.length)) {
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])

            dispatch(nextSongThunk())
        } else {
            // TESTING shuffle
            if (shuffle && (audioPlayer?.songList?.length === audioPlayer?.queue?.length)) {
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            // TESTING shuffle
            // TESTING ORIGINAL SONG ORDER
            if (!shuffle && (audioPlayer?.songList?.length === audioPlayer?.queue?.length)) {
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            // TESTING ORIGINAL SONG ORDER
            setCurrentIndex((prev) => prev + 1)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex + 1])
            dispatch(nextSongThunk())
        }
    }

    const prevSong = (e) => {
        e.preventDefault()
        if (currentIndex === 0) {
            audioRef.current.currentTime = 0
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])
            // dispatch(prevSongThunk(currentIndex))
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

    const handleLoop = (e) => {
        e.preventDefault()
        if (!loopOne && !loop) {
            setLoopOne(true)
        } else if (loopOne && !loop) {
            setLoopOne(false)
            setLoop(true)
        } else {
            setLoopOne(false)
            setLoop(false)
        }
    }



    // Function to help check if two array of objects have the same values. We will use this to check if a different set of songs is playing so we can reset the current index back to 0
    const songListCheck = (arr1, arr2) => {
        return (arr1?.length === arr2?.length && arr1.every((first) => arr2.some((second) => Object.keys(first).every((key) => first[key] === second[key]))))
    }




    useEffect(() => {
        const seconds = Math.floor(audioRef.current.duration)
        setSongLength(seconds)
        progressBarRef.current.max = seconds
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

    useEffect(() => {
        // TESTING SHUFFLE
        // if (shuffle && (audioPlayer?.songList?.length - 1 === audioPlayer?.queue?.length)) {
        //     console.log("INSIDE THE IF STATEMENT")
        //     dispatch(shuffleSongsThunk())
        //     dispatch(nextSongThunk())
        // }
        // console.log("IN THE USEEFFECT FOR CURRENT SONG PLAY")
        // console.log("IN THE USEEFFECT FOR CURRENT SONG PLAY", audioPlayer)
        // TESTING SHUFFLE
        console.log("THE CURRENTSONG PLAY OUTSIDE THE IF CONDITION", audioPlayer)
        if (currentSongPlay) {
            console.log("THE CURRENTSONG PLAY INSIDE THE IF CONDITION", audioPlayer)
            setSongUrl(currentSongPlay)
        }
    }, [currentSongPlay])
    // , trackCurrentSong, audioPlayer

    useEffect(() => {
        console.log("IN THE USEEFFECT FOR THE SONG URL")
        if (songUrl) {
            audioRef.current.volume = volume / 100
            audioRef.current.play()
            setIsPlaying(true)
            barAnimationRef.current = requestAnimationFrame(whilePlaying)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex])
        }
    }, [songUrl])

    useEffect(() => {
        if (songLength == currentTime) {
            if (loopOne) {
                audioRef.current.currentTime = 0
                return
            } else if (loop && audioPlayer.queue.length === 0) {
                dispatch(playFromStartThunk())
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                return
            }
            //TESTING shuffle
            if (shuffle && (audioPlayer?.queue?.length === audioPlayer?.songList?.length)) {
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            //TESTING shuffle
            // TESTING ORIGINAL SONG LIST
            if (!shuffle && (audioPlayer?.queue?.length === audioPlayer?.songList?.length)) {
                setCurrentIndex(0)
                setTrackCurrentSong(audioPlayer?.songList[0])
                dispatch(nextSongThunk())
                return
            }
            // TESTING ORIGINAL SONG LIST
            setCurrentIndex((prev) => prev + 1)
            setTrackCurrentSong(audioPlayer?.songList[currentIndex + 1])

            const nextSong = dispatch(nextSongThunk())
        }
    }, [currentTime])



    useEffect(() => {

        if (!sessionUser) {
            dispatch(clearAudioThunk())
        }
    }, [dispatch, sessionUser])

    // Checking to see if a different set of songs are playing.
    useEffect(() => {
        if (!songListCheck(audioPlayer.songList, songListRef.current)) {
            // TESTING FOR SHUFFLE
            if (shuffle) {
                dispatch(shuffleSongsThunk())
            }

            // TESTING FOR SHUFFLE
            setCurrentIndex(0)
            setTrackCurrentSong(audioPlayer?.songList[0])
        }
        songListRef.current = audioPlayer.songList
    }, [audioPlayer?.songList])

    // Shuffle testing



    useEffect(() => {

        if (shuffle) {
            // console.log("IN SIDE THE SHUFFLE USEEFFECT")
            dispatch(shuffleSongsThunk())
        }
        if (!shuffle) {
            dispatch(originalSongOrderThunk(currentIndex))
        }
    }, [shuffle])
    // Shuffle testing




    return (
        <div className="footer-buttons-container">
            <div className="audio-song-info-container">
                {currentSong ?
                <div className="audio-song-info">
                    <img src={currentSong?.album_cover}></img>
                    <div>
                        <p>{currentSong?.name}</p>
                        <p>{currentSong?.artist_name}</p>
                    </div>
                </div>
                :
                <div>No Song Selected</div>
                }
                {/* <div className="audio-song-info">
                    <img src={currentSong?.album_cover}></img>
                    <div>
                        <p>{currentSong?.name}</p>
                        <p>{currentSong?.artist_name}</p>
                    </div>
                </div> */}
            </div>
            <div className="middle-section">
                <div className="buttons-container">
                    <audio ref={audioRef} src={songUrl} preload="metadata"></audio>
                    <div onClick={(e) => shuffleSongs(e)}>
                        {/* <i class="fa-solid fa-shuffle">{shuffle ? "On" : "Off"}</i> */}
                        <i class={shuffle ? `fa-solid on fa-shuffle` : `fa-solid fa-shuffle`}></i>
                    </div>
                    <div onClick={(e) => prevSong(e)}>
                        <i class="fa-solid fa-backward-step"></i>
                    </div>
                    <div onClick={togglePlayPause}>
                        {isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}
                    </div>
                    <div onClick={(e) => nextSong(e)}>
                        <i class="fa-solid fa-forward-step"></i>
                    </div>
                    <div onClick={(e) => handleLoop(e)}>
                        <i class="fa-solid fa-repeat">{loopOne ? "loop 1" : loop ? "loop" : ""}</i>
                    </div>

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
