import Janre from "../models/janre.model.js";

const getJanreNames = async (req, res, next) => {
    try {
        const janreDocuments = await Janre.find().select("name -_id");
        const janres = janreDocuments.map((doc) => doc.name);

        req.janres = janres;
        next();
    } catch(err) {
        res.status(500).json({ error: "Error when getting janres" });
    }
}

export default getJanreNames;