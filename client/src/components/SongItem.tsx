import { NavLink } from "react-router-dom";
import { ISong } from "../types/data";

interface IProps {
    song: ISong;
};

const SongItem: React.FC<IProps> = ({
    song
}) => {
    return (
        <div className="song-item">
            <NavLink to={`/songs/${song._id}`}>
                { song.name }
            </NavLink>
        </div>
    );
}   

export default SongItem;