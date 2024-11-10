import Janre from "../models/janre.model.js";
import Song from "../models/song.model.js";

const getSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await Song.findById(songId, { projection: { file: 0 } }); //note this

        if(!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        res.status(200).json({ song, message: "Song successfully received" });
    } catch(err) {
        res.status(500).json({ error: "Internal server error when getting song" });
    }
}


const getSongAudio = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await Song.findById(songId);
        const audio = song?.file;
    
        if(!audio) {
            return res.status(404).json({ error: "Song audio not found" });
        }

        res.status(200).json({ audio, message: "Song audio successfully received" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when receiving song audio" });
    }
}


const getSongs = async (req, res) => { //do this up
    try {
        const { janre, search } = req.query;
        const query = {}; //note (dynamically constructed query)

        if(janre) {
            //verify janre's id correctness (24 long);
            query.janre = janre; //note
        }

        if(search) {
            query.name = { $regex: search, $options: "i" }; //note
        }

        const songs = await Song.find(query);
                
        res.status(200).json({ songs, message: "Songs successfully found" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Error when getting songs" });
    }
}


const getSongsByJanre = async (req, res) => {

}

const createSong = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, artist, janreId, file } = req.body;   

        const existingSong = await Song.findOne({ name }); //make the search lowercase

        if(existingSong) {
            return res.status(401).json({ error: "Song already exists, select another name" });
        }

        if(!artist) {
            return res.status(401).json({ error: "Provide the artist" });
        }

        if(!janreId) {
            return res.status(401).json({ error: "Provide janreId for song" });
        }

        const janre = await Janre.findById(janreId);

        if(!janre) {
            return res.status(404).json({ error: "Janre not found" });
        }

        if(!file) {
            return res.status(401).json({ error: "Provide song file" });
        }

        const song = await Song.create({ name, creator: userId, artist, janre: janreId, file });

        res.status(200).json({ song, message: "Song created successfully" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when creating a song" });
    }
}


const deleteSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const userId = req.user._id.toString();
        const song = await Song.findById(songId);

        if(!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        if(song.creator.toString() !== userId) {
            return res.status(403).json({ error: "You do not have permssion to delete this song" });
        }

        await Song.deleteOne({ _id: songId });
            
        res.status(200).json({ message: "Song successfully deleted" });
    } catch(err) {
        return res.status(500).json({ error: "Internal server error when deleting a song" });
    }
}

export { getSong, getSongAudio, getSongs, getSongsByJanre, createSong, deleteSong };