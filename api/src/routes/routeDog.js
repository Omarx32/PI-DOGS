const express = require('express');
const dogRoutes = express.Router();
const { createdDog, } = require('../controllers/DogsControllers')
const { getDogId, getDogs } = require("../handlers/dogsHandler")
dogRoutes.use(express.json());


dogRoutes.get("/:id", getDogId)
dogRoutes.post("/", createdDog)
dogRoutes.get("/", getDogs)



module.exports = dogRoutes;