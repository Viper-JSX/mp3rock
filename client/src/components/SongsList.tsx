import { ISong } from "../types/data";
import SongItem from "./SongItem";

interface IProps {
    songs: ISong[];
};

const SongsList: React.FC<IProps> = ({ songs }) => {
    return (
        <div className="songs-list">
            {
                songs.map((song) => <SongItem song={song} key={song._id} />)
            }
        </div>
    );
}

export default SongsList;