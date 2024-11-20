import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../axios/axiosClient";
import { ISong } from "../types/data";
import CustomAudio from "../components/CustomAudio";
import Loader from "../components/Loader";

interface IProps {};

const SongPage = () => {
    const { id } = useParams();
    const [ song, setSong ] = useState<ISong>();
    //const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    // const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        axiosClient.get<{ song: ISong, message: string }>(`/songs/${id}`)
        .then((res) => {
            setSong(res.data.song);
        })
        .catch((err) => {
            console.log("Error when getting song");
        })
    }, []);

    const deleteSong = async (id: string): Promise<void> => {
        try {
            await axiosClient.delete(`/songs/${id}`)
            .then((res) => {
                console.log("Song successfully deleted");
            })
            .catch((err) => {
                console.log("Erorr when deleting song");
            })
        } catch(err) {
            console.log("Error when deleting a song");
        }
    }

    console.log(song);

    if(!song) {
        return <Loader />
    }

    return(
        <div>
            
            <h2>{song?.name}</h2>
            <p>By: <b>{song?.artist}</b></p>
            <CustomAudio 
                // isPlaying={isPlaying}
                audioUrl={song?.file} 
                // ref={audioRef}
                // handlePlay={handlePlay}
            />
            {/* <audio src={song?.file} controls ref={audioRef}></audio> */}
        </div>
    );
}

export default SongPage;