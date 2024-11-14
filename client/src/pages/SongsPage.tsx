import React, { useEffect, useState } from "react";
import { IJanre, ISong } from "../types/data";
import SearchForm from "../components/SearchForm";
import axiosClient from "../axios/axiosClient";
import SongsList from "../components/SongsList";
import JanresList from "../components/JanresList";
import { useSearchParams } from "react-router-dom";

interface IProps {

};

const SongsPage: React.FC<IProps> = () => {
    const [ songs, setSongs ] = useState<ISong[]>([]);
    const [ currentJanre, setCurrentJanre ] = useState<IJanre>({ _id: "", name: "" });
    const [ janres, setJanres ] = useState<IJanre[]>([]);
    const [ searchTerm, setSearchTerm ] = useState<string>("");    
    
    const handleSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const changeJanre = async (janre: IJanre ): Promise<void> => {
        setCurrentJanre(janre);

        const params = {} as { 
            search: string, 
            janre: string 
        };

        if(searchTerm) {
            params.search = searchTerm;
        }

        if(janre._id) {
            params.janre = janre._id;
        }

        const res = await axiosClient.get<{ songs: ISong[], message: string }>("/songs", { params });
        setSongs(res.data.songs);
    };

    const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (event): Promise<void> => {
        event.preventDefault();

        const params = {} as { 
            search: string, 
            janre: string 
        };

        if(searchTerm) {
            params.search = searchTerm;
        }

        if(currentJanre._id) {
            params.janre = currentJanre._id;
        }

        const res = await axiosClient.get<{ songs: ISong[], message: string }>("/songs", { params });
        setSongs(res.data.songs);
    }

    useEffect(() => {
        //Note how to type a request
        axiosClient.get<{ songs: ISong[], message: string }>("/songs")
        .then((res) => {
            setSongs(res.data.songs);
        })
        .catch((err) => {
            console.log("Error when getting songs");
        })


        axiosClient.get<{ janres: IJanre[], message: string }>("/janres")
        .then((res) => {
            setJanres(res.data.janres);
        })
        .catch((err) => {
            console.log("Error when getting janres");
        })
    }, []);

    return(
        <div className="songs-page">
            <SearchForm 
                searchTerm={searchTerm}
                handleChange={handleSearchTermChange}
                handleSubmit={handleSearchSubmit}
            />
            
            <JanresList janres={janres} changeJanre={changeJanre} />

            <SongsList songs={songs} />
        </div>
    );
}

export default SongsPage;