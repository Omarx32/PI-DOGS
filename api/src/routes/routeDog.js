const  express  = require('express');
const dogRoutes = express.Router();
const { getDataApi,  getDogsByRaza, getDogsById, createdDog, } = require('../controllers/DogsControllers')

dogRoutes.use(express.json());


dogRoutes.get("/name", getDogsByRaza)
dogRoutes.post("/", createdDog)
dogRoutes.get("/", getDataApi)
dogRoutes.get("/:id", getDogsById)


module.exports = dogRoutes;