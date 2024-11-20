import React from "react";
import { IPlayList } from "../types/data";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { Link } from "react-router-dom";
 
interface IProps {
    playlist: IPlayList;
    addPlaylistToSaved: (id: string) => Promise<void>;
    deletePlaylist: (id: string) => Promise<void>;
};

const PlaylistActions: React.FC<IProps> = ({ playlist, addPlaylistToSaved, deletePlaylist }) => {
    const user = useAppSelector((state) => state.user.user);
    const isPlaylistAlreadySaved: boolean = user?.savedPlaylists?.some((item) => item._id === playlist._id) || false;
    const isUserCreatorOfThePlaylist: boolean = user?._id === playlist.creator;

    return (
        <div className="song-and-playlist-actions">
            <button onClick={() => addPlaylistToSaved(playlist._id)}>{isPlaylistAlreadySaved ? "Remove from saved" : "Save"}</button>
            {
                isUserCreatorOfThePlaylist ? 
                <>
                    <button>
                        <Link to={`/songs/${playlist._id}/update`}>Update</Link>
                    </button>
                    <button onClick={() => deletePlaylist(playlist._id)}>Delete</button>
                </>
                :
                null
            }
        </div>
    );
}

export default PlaylistActions;