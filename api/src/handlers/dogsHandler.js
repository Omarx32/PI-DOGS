const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { getDogsBId, searchDog, getAllDogs } = require("../controllers/DogsControllers")
const { cleanArray } = require("../utils/apiUtils")

const getDogs = async (req, res) => {
    const { name } = req.query;

    const results = name ? await searchDog(name) : await getAllDogs();
    try {

        res.status(200).json(results);
    } catch (error) {
        res.status(400).send("Error")
    }
}


const getDogId = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
        const dogss = await getDogsBId(id, source);
        if (source === "api") {
            const cleanedData = cleanArray([dogss.data])
            res.status(200).json(cleanedData[0]);
        } else {
            res.status(200).json(dogss);
        }

    } catch (error) {
        res.status(500).send("error");
    }

}

module.exports = {
    getDogId,
    getDogs
}