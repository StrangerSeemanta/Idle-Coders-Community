import { Button, Slider, SliderValue, Spinner } from "@nextui-org/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import getVideoDuration from "../modules/getVideoDuration";
interface Props {
    poster?: string;
    src: string;

}
function Player({ poster, src }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [volume, setVolume] = useState<SliderValue>(50);
    const [muted, setMuted] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false)
    const [duration, setDuration] = useState(0);
    const [length, setLength] = useState(0);
    const [hideControls, setHideControls] = useState(true)
    const [fullScr, setFullScr] = useState(false);
    const [isVideoLoading, setVideoLoading] = useState(true)
    const showControlsAutoHide = useCallback(() => {
        setHideControls(false)

        const autoHideTimer = setTimeout(handleHideControls, 1000)
        return () => clearTimeout(autoHideTimer)
    }, [])
    const handleHideControls = () => {
        setHideControls(true)
    }
    useEffect(() => {
        if (videoRef.current) {
            if (typeof volume === 'number') {
                videoRef.current.volume = volume / 100;
            }
        }

    }, [volume])
    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play()
            } else if (!isPlaying) {
                videoRef.current.pause();
            }
            showControlsAutoHide()
        }
    }, [isPlaying, videoRef, showControlsAutoHide])
    const handleLengthChange = (value: SliderValue) => {
        if (typeof value === 'number') {
            setLength(value);
            if (videoRef.current) {
                videoRef.current.currentTime = value
            }
        }

        setIsSeeking(true)

    }
    useEffect(() => {
        videoRef.current?.addEventListener('loadedmetadata', () => {
            if (videoRef.current) {
                setDuration(videoRef.current.duration)
            }
        })
        videoRef.current?.addEventListener('timeupdate', () => {
            if (videoRef.current) {
                setLength(videoRef.current.currentTime)
            }

        })
    }, [videoRef])
    useEffect(() => {
        if (videoRef.current) {
            if (fullScr) {
                videoRef.current.parentElement?.requestFullscreen();
                videoRef.current.classList?.toggle('video_nonFullScr');
            } else if (!fullScr) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                    videoRef.current.classList?.toggle('video_nonFullScr');

                }
            }
        }
    }, [fullScr])
    return (
        <Fragment>
            <div className="relative w-auto h-auto " >
                <div onMouseEnter={() => { setHideControls(false) }} onMouseLeave={handleHideControls} style={{ opacity: hideControls ? 0 : 1, transitionDelay: hideControls ? "2500ms" : "0ms", transitionDuration: hideControls ? "450ms" : "50ms" }} className="video_controls transition-all ease-soft-spring   absolute z-30 bottom-0 left-0 w-full h-[10vh] max-h-[10vh] bg-gradient-to-t  to-00% from-primary  to-foreground/0 backdrop-blur-sm">
                    <div className="w-full h-full flex justify-between items-end py-1 px-2">
                        {/* Play Pause BTN */}
                        <div className="w-2/3 h-full flex items-end gap-1">
                            <Button isIconOnly onPress={() => { setPlaying(!isPlaying) }} variant="solid" className="bg-transparent" radius="full" >
                                {
                                    isPlaying ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-background">
                                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-background">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                        </svg>
                                }


                            </Button>
                            {
                                fullScr &&
                                <>
                                    <Button title="backward 10sec" onPress={() => { videoRef.current && (videoRef.current.currentTime > 10 && (videoRef.current.currentTime -= 10)) }} isIconOnly className="bg-transparent cursor-pointer" variant="solid" radius="full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-background">
                                            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                        </svg>


                                    </Button>
                                    <Button title="forward 10sec" onPress={() => { videoRef.current && (videoRef.current.currentTime + 10 < duration && (videoRef.current.currentTime += 10)) }} isIconOnly className="bg-transparent cursor-pointer" variant="solid" radius="full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-background">
                                            <path fillRule="evenodd" d="M14.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H9a5.25 5.25 0 1 0 0 10.5h3a.75.75 0 0 1 0 1.5H9a6.75 6.75 0 0 1 0-13.5h10.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>

                                    </Button></>
                            }
                            {/*Length Seeker */}
                            <div className=" w-2/3 h-10 flex justify-center items-center">
                                <Slider
                                    aria-label="Volume"
                                    size="md"
                                    color="danger"
                                    hideValue
                                    step={0.1}
                                    maxValue={duration}
                                    minValue={0}
                                    value={length}
                                    onChange={handleLengthChange}
                                    defaultValue={0}
                                    showTooltip={true}
                                    onChangeEnd={() => setIsSeeking(false)}
                                    className="w-full "
                                    tooltipProps={{ content: getVideoDuration(length) }}
                                    endContent={
                                        <div className="w-10">
                                            <p className="flex justify-between gap-1 text-background text-tiny">

                                                <span>{getVideoDuration(length)}</span>
                                                <span>/</span>
                                                <span >{getVideoDuration(duration)}</span></p>

                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-1/3 h-full flex items-end justify-end gap-2">
                            {/*Volume Seeker */}
                            <div className="w-44 h-10 flex justify-center items-center">
                                <Slider
                                    aria-label="Volume"
                                    size="sm"
                                    color="danger"
                                    hideValue
                                    step={1}
                                    maxValue={100}
                                    minValue={0}
                                    value={volume}
                                    onChange={setVolume}
                                    defaultValue={volume}
                                    showTooltip={true}

                                    className="w-full max-w-md"
                                    startContent={
                                        <Fragment>
                                            <Button isIconOnly onPress={() => { setMuted(!muted) }} className="cursor-pointer bg-transparent">
                                                {muted ?

                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-background">
                                                        <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-background">
                                                        <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
                                                        <path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
                                                    </svg>}
                                            </Button>



                                        </Fragment>
                                    }


                                />
                            </div>

                            {/* Full Scr */}
                            <Button onPress={() => setFullScr(!fullScr)} isIconOnly variant="solid" className="bg-transparent" radius="full" >
                                {document.fullscreenElement ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-background">
                                        <path fillRule="evenodd" d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z" clipRule="evenodd" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-background stroke-background" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>}

                            </Button>
                        </div>
                    </div>
                </div>
                <video onLoadedData={() => { setVideoLoading(false) }} onPlaying={() => { setVideoLoading(false) }} onWaiting={() => { setVideoLoading(true) }} onContextMenu={(event) => { event.preventDefault(); }} onDoubleClick={() => setFullScr(!fullScr)} onClick={() => { setPlaying(!isPlaying) }} ref={videoRef} muted={muted} poster={poster} src={src} contextMenu="false" controlsList="nodownload" className="h-full w-full video_nonFullScr"></video>

                <div className={" absolute z-40 top-10 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all ease-soft-spring duration-500 " + (isSeeking ? "opacity-100 scale-100 visible" : "opacity-0 scale-150 invisible")}>
                    <h3 className="text-2xl rounded-full bg-primary/40 backdrop-blur-sm px-2 py-1 font-bold text-background  ">{getVideoDuration(length)}</h3>
                </div>

                {isVideoLoading && <div className={" bg-default-300/40 backdrop-blur-sm px-2 py-2 w-20 h-20 flex justify-center items-center absolute z-40 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all ease-soft-spring duration-500 "}>
                    <h3 className="text-2xl  font-bold text-background  ">
                        <Spinner aria-label="loader" color="danger" />
                    </h3>
                </div>}

            </div>

        </Fragment >
    )
}

export default Player