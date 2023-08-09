const  express  = require('express');
const dogRoutes = express.Router();
const { getDataApi, getDogsById, createdDog, } = require('../controllers/DogsControllers')

dogRoutes.use(express.json());



dogRoutes.post("/", createdDog)
dogRoutes.get("/", getDataApi)
dogRoutes.get("/:id", getDogsById)


module.exports = dogRoutes;