import { NavLink } from "react-router-dom";
import { IPlayList } from "../types/data";
import React from "react";

interface IProps {
    playlist: IPlayList;
};

const PlaylistItem: React.FC<IProps> = ({ playlist }) => {
    return (
        <div className="playlist-item">
            <NavLink to={`/playlists/${playlist._id}`}>{playlist.name}</NavLink>
        </div>
    );
}

export default PlaylistItem;