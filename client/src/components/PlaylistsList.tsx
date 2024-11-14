import React from "react";
import { IPlayList } from "../types/data";
import PlaylistItem from "./PlaylistItem";

interface IProps {
    playlists: IPlayList[];
};

const PlaylistsList: React.FC<IProps> = ({ playlists }) => {
    return (
        <div className="playlists-list">
            {
                playlists.map((playlist: IPlayList) => (
                    <PlaylistItem playlist={playlist} key={playlist._id} />
                ))
            }
        </div>
    )
}

export default PlaylistsList;