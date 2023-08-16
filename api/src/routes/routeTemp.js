const express = require('express');
const tempRoutes = express.Router();


const { getAllTemperaments } = require('../controllers/TempControllers')

tempRoutes.get("/", getAllTemperaments)


module.exports = tempRoutes