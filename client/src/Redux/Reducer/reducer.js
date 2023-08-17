import { all } from 'axios';
import { GET_DOGS, GET_TEMPERAMENTS, CREATE_IMAGE, POST_DOGS, GET_DETAIL_DOGS, CLEAR_DETAIL_DOGS, ON_SEARCH, PAGE_PAGINATED, FILTER_SELECT, ORDER_BY_NAME } from '../Action/action'


const initialState = {
    dogs: [],
    temperament: [],
    allDogs: [],
    access: true,
    dogsDetail: {},
    onSearch: {},
    page: "1",
    filter: null,

};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state, dogs: action.payload,
                allDogs: action.payload,
            };
        case GET_TEMPERAMENTS:
            return {
                ...state, temperament: action.payload
            };
        case CREATE_IMAGE:
            return {
                ...state, imageDogsRandom: action.payload
            };
        case POST_DOGS:
            return { ...state };
        case GET_DETAIL_DOGS:
            return {
                ...state, dogsDetail: action.payload
            };
        case CLEAR_DETAIL_DOGS:
            return {
                ...state, dogsDetail: action.payload
            }
        case ON_SEARCH:
            return {
                ...state, onSearch: action.payload
            }
        case PAGE_PAGINATED:
            return {
                ...state, page: action.payload
            }
            case FILTER_SELECT:
              let filterTemperament = [];
              
              if (action.payload.length === 0) {
                return { ...state, dogs: state.allDogs };
              }
            
              state.dogs.forEach((dog) => {
                if (dog.temperament) {
                  let cont = 0;
                 action.payload.forEach((e) => {
                    if (dog.temperament.includes(e)) {
                      cont++;
                    }
                  });
                  if (cont === action.payload.length) {
                    filterTemperament.push(dog); 
                  }
                }
              });
        
          return { ...state, dogs: filterTemperament };
          //  let filteredDogs = [];
          //  if(action.payload === "Todos"){
          //   filteredDogs = allDogs;
          //  }else{
          //   for (let i = 0; i < allDogs.length; i++){
          //       const temperamentArray = allDogs[i].temperament;
          //       if(Array.isArray(temperamentArray)){
          //           let found = allDogs[i].temperament.find((t)=> t === action.payload);
          //           if(found){
          //               filteredDogs.push(allDogs[i])
          //               console.log(filteredDogs)
          //           }

          //       }
          //   }
          //  }return{
          //   ...state,
          //   dogs: filteredDogs
          //  }
            case ORDER_BY_NAME:
              const sortedName =
               action.payload === "A-Z"
            ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
            return {
              ...state,
              dogs: sortedName,
            };
            
      case "ORDER_BY_WEIGHT":
        const sortedWeight = action.payload === "min_weight"
        ? [...state.allDogs].sort((a, b) => parseInt(a.weight) - parseInt(b.weight))
        : [...state.allDogs].sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
      
      return {
        ...state,
        dogs: sortedWeight,
      };

        default:
            return { ...state };
    }
};

export default rootReducer;
