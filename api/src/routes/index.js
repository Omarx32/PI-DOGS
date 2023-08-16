const express = require('express');
const router = express.Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const login = require("../controllers/login")
const dogRoutes = require("./routeDog");
const tempRoutes = require("./routeTemp");

router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/temperaments", tempRoutes)
router.get("/login", (req,res)=>{
    login(req, res)
})
router.use("/dogs", dogRoutes)

module.exports = router;
