const axios = require("axios");
require("dotenv").config();
const { Op } = require('sequelize');
const { Dog, Temperaments } = require("../db");
const { getDataFromApi } = require("../utils/apiUtils");


async function getDataApi(req, res) {
  try {
    const data = await getDataFromApi("/v1/breeds");

    res.status(200).json(data);
  } catch (Error) {
    console.error("error");
    res.status(400).send("Error");
  }
}

async function getDogsById(req, res) {
  const idDog = req.params.id;
  try {
    if (Number(idDog) >= 1 && Number(idDog) <= 264) {
      const dogsAllApi = await getDataFromApi("/v1/breeds");

      const dogRaceApi = dogsAllApi.find((dog) => {
        return dog.id === parseInt(idDog);
      });

      if(!dogRaceApi) throw new Error("Not matches found");
      
      return res.status(200).json(dogRaceApi)
    }else{
        const dogsRaceDb = await Dog.findByPk(idDog, {
          include: {
            model: Temperaments,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
  
        if (!dogsRaceDb) throw new Error("Not matches found");
  
        return res.status(200).json(dogsRaceDb); 
      }
    
  } catch (Error) {
    console.log("error");
    res.status(400).send("Error");
  }
}

async function getDogsByRaza(req, res) {
  
  // const idRaza  = req.params.id;
    const {raza} = req.query;
    try{
        const apiRequestRaza = await getDataFromApi(`/v1/breeds/search?q=${raza}&`);
       
        const  data  = apiRequestRaza;
      
        const { id, name, height, weight, life_span, image } = data;
    const dogger = {
    id,   
    name,    
    image, 
    weight,
    height,
    life_span,
    };
    res.status(200).json(data);
        }catch (Error){
            console.log('error');
            res.status(400).send("Error")
        }
    
}
async function createdDog(req, res) {
  try {
    const { name, height, weight, temperaments, life_span, image } = req.body;
    if (!name || !height || !weight || !life_span || !temperaments)
      throw new Error("Missing required data");

    const newDog = {
      name,
      height,
      weight,
      life_span,
      image,
    };

    const createNewDog = await Dog.create(newDog);

    const findTemp = await Temperaments.findAll({
      where: { name: temperaments },
    });
    createNewDog.addTemperament(findTemp);

    res.status(201).json(createNewDog);
  } catch (error) {
    console.error("Error, the dog cannot be created", error);
    res.status(500).json({ error: "There's a error" });
  }
}

module.exports = {
  getDataApi,
  getDogsById,
  getDogsByRaza,
  createdDog,
};
