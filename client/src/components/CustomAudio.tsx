import React from "react";
import { useState, useRef } from "react";


interface IProps {
    // isPlaying: boolean;
    audioUrl: string | undefined;
    // ref: React.LegacyRef<HTMLAudioElement>; //note this
    // handlePlay: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomAudio: React.FC<IProps> = ({
    // isPlaying,
    audioUrl,
    // ref,
    // handlePlay
}) => {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    const handlePlay: React.MouseEventHandler<HTMLButtonElement>  = () => {
        
        if(audioRef.current?.paused) {
            audioRef.current?.play();
            setIsPlaying(true);
        } else {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    }
    return (
        <div className="custom-audio">
            <button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <audio className="hidden-audio-element" src={audioUrl} hidden ref={audioRef}></audio>
        </div>
    );
}

export default CustomAudio;