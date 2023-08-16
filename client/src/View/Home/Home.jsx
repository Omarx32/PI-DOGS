import CardsContainer from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {OrderByName, filterSelect, getDogs, getTemperaments} from '../../Redux/Action/action'
import SearchBar from '../../components/SearchBar/SearchBar'
import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Home = ( ) => {
    const dispatch = useDispatch();
    const dogs = useSelector((state)=> state.dogs)
   
    const allTemperament = useSelector((state)=> state.temperament)
    const [orden, setOrden] = useState("");

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    },[])
    const handleOrderByName = (e) =>{
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrden(`Ordenado${e.target.value}`);     
    }
    const handleFilterByTemperament = (e) => {
        e.preventDefault();    
        dispatch(filterSelect(e.target.value));
      };
    

    return(
        <div className={style.container}>
        <h1 >Home </h1>
        <div className={`${style.container_filters}`}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <select onChange={handleFilterByTemperament}>
                  <option disabled selected defaultValue>Temperaments</option>
                  <option value="Todos">All</option>
                  {
                    allTemperament?.map(temp => (
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))
                  }
              </select>
        </div>
        <SearchBar/>
        <CardsContainer/>
        
        </div>
    )
}
export default Home;


