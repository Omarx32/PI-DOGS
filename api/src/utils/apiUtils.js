const axios = require("axios");
require("dotenv").config();

const { API_KEY, URL} = process.env;


async function getDataFromApi(prop){
    try{
        const response = await axios(`${URL}${prop}?api_key=${API_KEY}`);
        return response.data;
    }catch(error){
        throw new Error('Error get data from API')
    }
}

module.exports = {
    getDataFromApi,
}