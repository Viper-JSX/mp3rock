import { ISong } from "../types/data";
import SongItem from "./SongItem";

interface IProps {
    songs: ISong[];
};

const SongsList: React.FC<IProps> = ({ songs }) => {
    console.log(songs)

    return (
        <div className="songs-list">
            {
                songs.map((song) => <SongItem song={song} />)
            }
        </div>
    );
}

export default SongsList;