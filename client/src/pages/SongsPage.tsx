import React, { useEffect, useState } from "react";
import { ISong } from "../types/data";
import SearchForm from "../components/SearchForm";
import axiosClient from "../axios/axiosClient";
import SongsList from "../components/SongsList";

interface IProps {

};

const SongsPage: React.FC<IProps> = () => {
    const [ songs, setSongs ] = useState<ISong[]>([]);
    const [ searchTerm, setSearchTerm ] = useState<string>("");    
    
    
    const handleSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log("searching", searchTerm);
        //make a request;
    }

    useEffect(() => {
        //Note how to type a request
        axiosClient.get<{ songs: ISong[], message: string }>("/songs")
        .then((res) => {
            console.log(res.data);
            setSongs(res.data.songs);
        })
        .catch((err) => {
            console.log("Error when getting songs");
        })
    }, []);

    return(
        <div className="songs-page">
            <SearchForm 
                searchTerm={searchTerm}
                handleChange={handleSearchTermChange}
                handleSubmit={handleSearchSubmit}
            />
            
            <SongsList songs={songs} />
        </div>
    );
}

export default SongsPage;