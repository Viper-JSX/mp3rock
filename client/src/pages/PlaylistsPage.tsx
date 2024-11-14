import React, { useEffect, useState } from "react";
import { PlaylistViewOptions } from "../types/propsTypes";
import { IPlayList } from "../types/data";
import axiosClient from "../axios/axiosClient";
import PlaylistsList from "../components/PlaylistsList";
import SearchForm from "../components/SearchForm";

type Props = {
    show: PlaylistViewOptions
};


const PlaylistsPage: React.FC<Props> = ({ show }) => {
    const [ playlists, setPlaylists ] = useState<IPlayList[]>([]);
    const [ searchTerm, setSearchTerm ] = useState<string>("");

    const handleSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (event): Promise<void> => {
        event.preventDefault();
        let url = show === "MY_PLAYLISTS" ? "/my-playlists" : "/playlists";
    
        const foundPlaylists = (await axiosClient.get<{ playlists: IPlayList[], message: string }>(url, {
            params: {
                search: searchTerm
            }
        })).data.playlists;

        setPlaylists(foundPlaylists);
    }

    useEffect(() => {
        let url = "";

        if(show === "ALL_PLAYLISTS") {
            url = "/playlists";
        } else if(show = "MY_PLAYLISTS") {
            url = "/my-playlists";
        } else {
            url = "/playlists";
        }
        console.log(url)

        axiosClient.get<{ playlists: IPlayList[], message: string }>(url)
        .then((res) => {
            setPlaylists(res.data.playlists);
        }). catch((err) => {
            console.log("Error when getting playlists", err);
        })
    }, []);

    return(
        <div className="playlists-page">
            <SearchForm searchTerm={searchTerm} handleChange={handleSearchTermChange} handleSubmit={handleSearchSubmit} />
            <PlaylistsList playlists={playlists} />
        </div>
    );
}

export default PlaylistsPage;