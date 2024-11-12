import Janre from "../models/janre.model.js";

const getJanres = async (req, res) => {
    try {
        const janres = await Janre.find();
        res.status(200).json({ janres, message: "Janres received successfully" });
    } catch(err) {
        res.status(500).json({ error: "Internal server error when getting janres" });
    }
}


const createJanre = async (req, res) => {
    try {
        const janre = req.body?.janre?.toLowerCase()?.trim();

        //check if user has permission to create janre

        if(!janre) {
            return res.status(409).json({ error: "Janre not provided" });
        }   

        const existingJanre = await Janre.findOne({ name: janre });

        console.log(existingJanre);
        if(existingJanre) {
            return res.status(409).json({ error: "Janre already exists" });
        }

        const newJanre = await Janre.create({ name: janre });

        res.status(200).json({ janre: newJanre, message: "Janres received successfully" });
    } catch(err) {
        res.status(500).json({ error: "Internal server error when getting janres" });
    }
}


const deleteJanre = async (req, res) => {
    try {
        const { id } = req.params;

        //check user permissions

        const janre = await Janre.findById(id);

        if (!janre) {
            return res.status(404).json({ error: "Janre not found" });
        }

        await Janre.deleteOne({ _id: id });
    
        res.status(200).json({ message: "Janre successfully deleted" });
    } catch(err) {
        res.status(500).json({ error: "Internal server error when deleting janre" });
    }
}

export { getJanres, createJanre, deleteJanre };