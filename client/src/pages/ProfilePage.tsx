import { useEffect, useState } from "react";
import ProfileImg from "../components/ProfileImg";
import { User } from "../redux/types/data";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import { defaultAvatarImage } from "../lib/data";
import SongsList from "../components/SongsList";
import PlaylistsList from "../components/PlaylistsList";
import { IPlayList, ISong } from "../types/data";

const ProfilePage = () => {
    const user = useAppSelector((state) => state.user.user);
    const [ songs, setSongs ] = useState<ISong[]>([]);
    const [ playLists, setPlaylists ] = useState<IPlayList[]>([]);

    return (
        <div>
            { user ?
                <ProfileImg img={ user.img || defaultAvatarImage } name={user?.username} />
                :
                null
            }
            
            {/* Make a separate component MySongsAndPlaylists */}
            <div className="my-songs-and-playlists">
                <div className="my-songs">
                    <SongsList songs={songs} />
                </div>

                <div className="my-playlists">
                    <PlaylistsList playlists={playLists} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;