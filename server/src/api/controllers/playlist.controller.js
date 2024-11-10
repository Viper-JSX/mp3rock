import Playlist from "../models/playlist.model.js";
import Song from "../models/song.model.js";

const getPlaylist = async (req, res) => {
    try {  
        const playlistId = req.params?.id;
        const playlist = await Playlist.findById(playlistId);

        if(!playlist) {
            return res.status(404).json({ message: "Playlist not found" })
        }

        res.status(200).json({ playlist, message: "Playlist received successfully" });

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error when getting playlist" });
    }
}


const getPlaylistSongs = async (req, res) => {
    try {  
        const playlistId = req.params?.id;
        const playlist = await Playlist.findById(playlistId).populate({
            path: "songs"
        });
        console.log(playlist);

        if(!playlist) {
            return res.status(404).json({ message: "Playlist not found" })
        }

        const songs = playlist.songs;

        res.status(200).json({ songs, message: "Songs received successfully" });

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error when getting playlist" });
    }
}


const createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user._id;

        if(!userId) {
            return res.status(401).json({ error: "No user id provided" });
        }

        if(!name) {
            return res.status(401).json({ error: "Provide playlist name" });
        }

        const existingPlaylist = await Playlist.findOne({name}); //replace with case-insensitive match and trimming

        if(existingPlaylist) {
            return res.status(401).json({ error: "Playlist with such name already exists. Please provide another name" });
        }


        const newPlaylist = await Playlist.create({ name, creator: userId });

        res.status(200).json({ playlist: newPlaylist, message: "Playlist created successfully" })
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Server error when creating playlist" });
    }
}


const updatePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user._id.toString();
        const { name = newPlaylistName } = req.body;

        const playlist = await Playlist.findById(playlistId);

        if(!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }


        if(userId !== playlist.creator.toString()) {
            return res.status(403).json({ error: "You're not a creator of this playlist" });
        }

        if(!name) {
            return res.status(401).json({ error: "Provide playlist name" });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { name }, { returnDocument: "after" });

        res.status(200).json({ playlist: updatedPlaylist, message: "Playlist updated successfully" });

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Server error when updating playlist" });
    }
}
 

const addSongToPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const songId = req.body.songId;
        const userId = req.user._id.toString();

        const playlist = await Playlist.findById(playlistId);

        if(!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        const song = await Song.findById(songId);
        console.log(song, songId)

        if(!songId) {
            return res.status(401).json({ error: "Song id not provided" });
        }

        if(!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        if(userId !== playlist.creator.toString()) {
            return res.status(403).json({ error: "You're not a creator of this playlist" });
        }

        const isAlreadyInPlaylist = playlist.songs.find((item => item.toString() === songId));

        if(isAlreadyInPlaylist) {
            return res.status(401).json({ error: "Song is already in playlist" });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { $push: { songs: songId } }, { returnDocument: "after" });

        res.status(200).json({ playlist: updatedPlaylist, message: "Song added successfully" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when adding song" });
    }
}


const removeSongFromPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const songId = req.body.songId;
        const userId = req.user._id.toString();

        const playlist = await Playlist.findById(playlistId);

        if(!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        const song = await Song.findById(songId);

        if(!song || !songId) {
            return res.status(404).json({ error: "Song not found" });
        }

        if(userId !== playlist.creator.toString()) {
            return res.status(403).json({ error: "You're not a creator of this playlist" });
        }

        const isAlreadyInPlaylist = playlist.songs.find((item => item.toString() === songId));

        if(!isAlreadyInPlaylist) {
            return res.status(401).json({ error: "Song is not in a playlist" });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { $pull: { songs: songId } }, { returnDocument: "after" });

        res.status(200).json({ playlist: updatedPlaylist, message: "Song removed successfully" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error when removing song" });
    }
}


const deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user._id.toString();

        const playlist = await Playlist.findById(playlistId);

        if(!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        if(userId !== playlist.creator.toString()) {
            return res.status(403).json({ error: "You're not a creator of this playlist" });
        }

        const deletedPlaylist = await Playlist.deleteOne({ _id: playlist });

        res.status(200).json({ playlist: deletedPlaylist, message: "Song deleted successfully" });
    } catch(err) {

    }
}

export { getPlaylist, getPlaylistSongs, createPlaylist, updatePlaylist, addSongToPlaylist, removeSongFromPlaylist, deletePlaylist };