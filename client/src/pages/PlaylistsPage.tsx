import React from "react";
import { PlaylistViewOptions } from "../types/propsTypes";

type Props = {
    show: PlaylistViewOptions
};


const PlaylistsPage: React.FC<Props> = () => {
    return(
        <div>
            Playlists page
        </div>
    );
}

export default PlaylistsPage;