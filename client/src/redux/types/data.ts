import { IPlayList, ISong } from "../../types/data";

export type User = {
    _id: string;
    username: string;
    email: string;
    img: string;
    songs: ISong[];
    savedPlaylists: IPlayList[]; // OR string[ObjectID]
};

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
};