import React, { useEffect, useState } from "react";
import { ISong } from "../types/data";
import SearchForm from "../components/SearchForm";
import axiosClient from "../axios/axiosClient";

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
        axiosClient.get("/songs")
        .then((res) => {
            console.log(res.data);
            setSongs(res.data);
        })
        .catch((err) => {
            console.log("Error when getting songs");
        })
    }, []);

    return(
        <div>
            <SearchForm 
                searchTerm={searchTerm}
                handleChange={handleSearchTermChange}
                handleSubmit={handleSearchSubmit}
            />
            Songs
        </div>
    );
}

export default SongsPage;