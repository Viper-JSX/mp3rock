import { janres } from "../../lib/constants/janres.js";

const getJanres = async (req, res, next) => {
    try {
        //get janres
        //set req.janres
        req.janres = janres;
        next();
    } catch(err) {
        res.status(500).json({ error: "Error when getting janres" });
    }
}

export default getJanres;