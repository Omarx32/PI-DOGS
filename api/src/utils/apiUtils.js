const axios = require("axios");
require("dotenv").config();

const { API_KEY, URL} = process.env;

const cleanArray = (arr)=>
      arr.map((elem)=>{
        return{
      id: elem.id,
      name: elem.name,
      height: elem.height.metric,
      weight: elem.weight.metric,
      life_span: elem.life_span,
      image: elem.image?.url? elem.image.url :`https://cdn2.thedogapi.com/images/${elem.reference_image_id}.jpg`,
      temperament: elem.temperament?.name? elem.temperament.name : elem.temperament,
    };
  });

  
module.exports = {

    cleanArray,
}