export interface IPlayList {
    _id: string;
    name: string;
    description: string;
    creator: string; //or User
};

export interface ISong {
    _id: string;
    name: string;
    artist: string;
    file: string;
    creator: string;
};

export interface IJanre {
    _id: string;
    name: string;
};