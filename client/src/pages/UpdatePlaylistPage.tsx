import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPlayList } from "../types/data";
import axiosClient from "../axios/axiosClient";
import Loader from "../components/Loader";

const UpdatePlaylistPage = () => {
    const { id } = useParams();
    const [ data, setData ] = useState<{ name: string }>();

    const handleDataChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const key: string = event.target.name;
        const value: string = event.target.value;

        setData((prev) => ({ ...prev, [key]: value }))
    };

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {
            if(!data?.name) {
                console.log("Enter name");
                return;
            }

            await axiosClient.put(`/playlists/${id}/update`, data);
            console.log("Playlist updated");
        } catch(err) {
            console.log("error when updating playlist");
        }
    }

    useEffect(() => {
        axiosClient.get<{ playlist: IPlayList, message: string }>(`/playlists/${id}`)
        .then((res) => {
            setData({ name: res.data.playlist.name });
        })
        .catch((err) => {
            //redirect to playlists
            console.log("Error when getting playlist");
        })
    }, []);

    if(!data) {
        return <Loader />
    }

    return(
        <div className="update-playlist-page">
            Update playlist {id}   
            <form method="PUT" onSubmit={handleSubmit}>
                <input type="text" name="name" value={data.name} onChange={handleDataChange} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
}

export default UpdatePlaylistPage;