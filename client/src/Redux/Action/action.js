import axios from 'axios'

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CREATE_IMAGE = "CREATE_IMAGE";
export const POST_DOGS = "POST_DOGS"
export const GET_DETAIL_DOGS = "GET_DETAIL_DOGS"
export const CLEAR_DETAIL_DOGS = "CLEAR_DETAIL_DOGS"
export const ON_SEARCH = "ON_SEARCH"
export const PAGE_PAGINATED = "PAGE_PAGINATED"
export const  FILTER_SELECT = "FILTER_SELECT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const getDogs = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/dogs`
        );
        const dogs = apiData.data;
      
        dispatch({ type: GET_DOGS, payload: dogs })
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {
       try {
           const response = await axios.get(
               `http://localhost:3001/temperaments`
           );
           
           const temperament = response.data
          
           return dispatch({ type: GET_TEMPERAMENTS, payload: temperament });
       } catch (error) {
        console.log(error.message)
       }

    }
}

export const postDogs = (createDog) =>{
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/dogs`, createDog)
        return dispatch ({type: POST_DOGS,})
    }
}

export const getCreateImage = () => {
  return async (dispatch) => {
     
    const response = await axios("https://api.thedogapi.com/v1/images/search");

    const data = response.data;
    const image = data[0].url;
    return image
  }

 
};


  export const getDetailDogs = (idRace) => {
    return async (dispatch) => {
      try {
        //Aquí estoy haciendo el pedido al back para que me traiga el perro del id correspondiente.
        const response = await axios(`http://localhost:3001/dogs/${idRace}`);
        const data = response.data;
        return dispatch({
          type: GET_DETAIL_DOGS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const clearDetailDogs = () => {
    return {
      type: CLEAR_DETAIL_DOGS,
      payload: {},
    };
  };
  
  export const onSearch = (name) =>{
    return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`)
      const onSearch = response.data;
      return dispatch({
        type: ON_SEARCH,
        payload: onSearch ,
      })
    }

  }


  export const pagePaginated = (page) =>{
    return{
      type: PAGE_PAGINATED,
      payload: page,
    }

  }

  export const filterSelect = (payload) =>{
    return { 
      type: FILTER_SELECT,
      payload,
    }
  }
  
  export const OrderByName = (payload) => {
    return{
      type: ORDER_BY_NAME,
      payload
    }
  }
  export const OrderByWeight = (payload) => {
    return{
      type: ORDER_BY_WEIGHT,
      payload
    }
  }