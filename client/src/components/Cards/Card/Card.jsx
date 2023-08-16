import { getDogs } from "../../../Redux/Action/action";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
const Card = (props) => {
 
  return ( 
    <div className={style.Card}>
      <article key={props.id}>
        <div className={style.divImg}>
        <NavLink to={`/detail/${props.id}`}><img className={style.img} src={props.image} alt={props.name}/></NavLink>
        </div>
        <h3>Name: {props.name}</h3>
        <p>Weight: {props.weight}</p>
        <p>Temperaments: {props.temperament}</p>
       
        
      </article>
    </div>
  );
 ;
};

export default Card;
