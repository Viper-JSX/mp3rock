import React, { useEffect, useState } from "react";
import { redirect, useLocation, useParams } from "react-router";
import { IPlayList, ISong } from "../types/data";
import axiosClient from "../axios/axiosClient";
import SongItem from "../components/SongItem";
import SongsList from "../components/SongsList";
import PlaylistActions from "../components/PlaylistActions";
import Loader from "../components/Loader";

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
        <div>
            <PlaylistActions playlist={playlist} addPlaylistToSaved={addPlaylistToSaved} deletePlaylist={deletePlaylist} />
            <h1>{playlist?.name}</h1>
            {/* <p>{playlist.description}</p> */}
            <SongsList songs={songs} />
        </div>
    );
}

export default PlaylistPage;