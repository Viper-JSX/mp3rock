import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { redirect } from "react-router-dom";
import { IPlayList } from "../types/data";
import axiosClient from "../axios/axiosClient";
import Loader from "../components/Loader";
import { useAppSelector } from "../redux/hooks";
import GoBackButton from "../components/GoBackButton";

const UpdatePlaylistPage = () => {
    const { id } = useParams();
    const [ data, setData ] = useState<{ name: string }>();
    const userId: string | undefined = useAppSelector((state) => state.user.user?._id);
    const navigate = useNavigate();

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
        } catch(err) {
            console.log("error when updating playlist");
        }
    }

    useEffect(() => {
        axiosClient.get<{ playlist: IPlayList, message: string }>(`/playlists/${id}`)
        .then((res) => {
            const playlist = res.data.playlist;

            //if user does not have permission then redirect to "playlists";
            setData({ name: playlist.name });
        })
        .catch((err) => {
            console.log("Error when getting playlist");
            navigate("/playlists");
        })
    }, []);

    if(!data) {
        return <Loader />
    }

    return(
        <div className="update-playlist-page">
            <h1>Update playlist</h1>
            <GoBackButton to="/playlists" />
            <form method="PUT" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Enter new playlist name" value={data.name} onChange={handleDataChange} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
}

export default UpdatePlaylistPage;