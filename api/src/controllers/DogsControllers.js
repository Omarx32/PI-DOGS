const axios = require("axios");
require("dotenv").config();
const { Op } = require('sequelize');
const { Dog, Temperament } = require("../db");
const { cleanArray } = require("../utils/apiUtils");
const { API_KEY, URL } = process.env;



async function getDogsBId(id, source) {
  const dog = source === "api" 
    ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`))
    : await Dog.findByPk(id, {
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  return dog;
}

async function getAllDogs() {
  // get all from api & db
  const dbDogs = await Dog.findAll();

  const apiDogsRaw = (
    await axios.get(`${URL}?api_key=${API_KEY}`)
  ).data

  const apiDogs = cleanArray(apiDogsRaw);

  return [...dbDogs, ...apiDogs];
}

async function searchDog(name) {
  const dbDogs = await Dog.findAll({
    where: { name }
  })

  const apiDogsRaw = (
    await axios.get(`${URL}search?q=${name}&api_key=${API_KEY}`)
  ).data
  const apiDogs = cleanArray(apiDogsRaw);

  return [...dbDogs, ...apiDogs];
}

async function createdDog(req, res) {
  try {
    const { name, heightMin, heightMax, weightMin, weightMax, temperament, life_spanMin,life_spanMax, image  } = req.body;
    if (!name || !heightMin||!heightMax ||!weightMin|| !weightMax || !life_spanMin || !life_spanMax || !temperament)
      throw new Error("Missing required data");

    const newDog = {
      name,
      height:`${heightMin}-${heightMax} cm`,
      weight:`${weightMin}-${weightMax} kg`,
      life_span:`${life_spanMin}-${life_spanMax} years`,
      temperament,
      image,
    };

    const createNewDog = await Dog.create(newDog);

    const findTemp = await Temperament.findAll({
      where: { name: temperament },
    });
    createNewDog.addTemperament(findTemp);

    res.status(201).json("Created Succes");
  } catch (error) {
    console.error("Error, the dog cannot be created", error);
    res.status(500).json({ error: "There's a error" });
  }
}

module.exports = {
  getDogsBId,
  createdDog,
  searchDog,
  getAllDogs,
};
