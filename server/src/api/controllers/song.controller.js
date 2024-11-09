import Song from "../models/song.model.js";

const getSong = async (req, res) => {
    
}


const getSongAudio = async (req, res) => {

}

const getSongsByJanre = async (req, res) => {

}

const createSong = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, artist, file } = req.body;   

        const existingSong = await Song.findOne({ name }); //make the search lowercase

        if(existingSong) {
            return res.status(401).json({ error: "Song already exists, select another name" });
        }

        if(!artist) {
            return res.status(401).json({ error: "Provide the artist" });
        }

        if(!file) {
            return res.status(401).json({ error: "Provide song file" });
        }

        const song = await Song.create({ name, creator: userId, artist, file });

        res.status(200).json({ song, message: "Song created successfully" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when creating a song" });
    }
}


const deleteSong = async (req, res) => {

}

export { getSong, getSongAudio, getSongsByJanre, createSong, deleteSong };