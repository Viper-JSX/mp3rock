import React, { useEffect, useState } from "react";
import { redirect, useLocation, useParams } from "react-router";
import { IPlayList, ISong } from "../types/data";
import axiosClient from "../axios/axiosClient";
import SongItem from "../components/SongItem";
import SongsList from "../components/SongsList";
import PlaylistActions from "../components/PlaylistActions";
import Loader from "../components/Loader";
import DynamicBackground from "../components/DynamicBackground";
import BackgroundImageWrapper from "../components/BackgroundImageWrapper";

interface IProps {};

const PlaylistPage: React.FC<IProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [ playlist, setPlaylist ] = useState<IPlayList>();
    const [ songs, setSongs ] = useState<ISong[]>([]);

    const addPlaylistToSaved = async(id: string): Promise<void> => {
        try {
            console.log("add", id);
            await axiosClient.put(`/playlists/${id}/add-to-saved`);
            console.log("Playlist successfully saved");
        } catch(err) {
            console.log("Error when saving playlist");
        }
    }

    const deletePlaylist = async (id: string): Promise<void> => {
        try {
            await axiosClient.delete(`/playlists/${id}`);
            redirect("/playlists");
            console.log("Playlist deleted successfully")
        } catch(err) {
            console.log("Error when deleting playlist");
        }
    }

    useEffect(() => {
        axiosClient.get<{ playlist: IPlayList, message: string }>(`/playlists/${id}`)
        .then((res) => {
            setPlaylist(res.data.playlist);

            axiosClient.get<{ songs: ISong[], message: string }>(`./playlists/${res.data.playlist._id}/songs`)
            .then((res) => {
                setSongs(res.data.songs);
            })
            .catch((err) => {
                console.log("Error when getting songs");
            })
        })
        .catch((err) => {
            console.log("Error when getting playlist");
        });
    }, []);

    if(!playlist) {
        return <Loader />
    }

    return(
        <div className="playlist-page">
            {/* maybe remove it and do it directly on component using styling and "PlaylistPage.styles.backgroundImage" */}
            <BackgroundImageWrapper imgUrl="https://burst.shopifycdn.com/photos/a-dark-night-sky-with-a-vibrant-sun-starting-to-set.jpg?width=1000&format=pjpg&exif=0&iptc=0">
                <PlaylistActions playlist={playlist} addPlaylistToSaved={addPlaylistToSaved} deletePlaylist={deletePlaylist} />
                <h1>{playlist?.name}</h1>
                {/* <p>{playlist.description}</p> */}
                <SongsList songs={songs} />
            </BackgroundImageWrapper>
        </div>
    );
}

export default PlaylistPage;