import { useEffect, useState } from "react";
import { useParams,  } from "react-router-dom";
import {getDetailDogs, clearDetailDogs} from '../../Redux/Action/action'
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";


const Detail = () => {
  const { idRace } = useParams();
const dispatch = useDispatch();
// const history = useHistory();
useEffect(()=>{

   dispatch(getDetailDogs(idRace));  
   
},[])
const dogsDetail = useSelector((state)=> state.dogsDetail);

if(!dogsDetail) {
  return <div>loading...</div>
}

const {
  id ,
  name,
  image,
  temperament,
  life_span,
  height,
    weight,
}= dogsDetail;

// const clearDetailHandler = () =>{
//     dispatch(clearDetailDogs())
// }
// const handleGoBack = () =>{
//     history.goBack();
// }

  return (
    <div className={style.detailAll}>
     <div className={style.containerDetailInfo}>
              <div className={style.divInfoDetail}>
                <h3 key={id} className={style.nameDetail}>
                  {name}
                </h3>

                <div className={style.divInfoWHLS}>
                  <div className={style.divWeight}>
                    <h3 className={style.titleWeight}>Weight</h3>
                    <p className={style.textWeight}>
                     {weight} kg
                    </p>
                  </div>
                  <div className={style.divHeight}>
                    <h3 className={style.titleHeight}>Height</h3>
                    <p className={style.textHeight}>
                      {height} cm
                    </p>
                  </div>
                  <div className={style.divLifeSpan}>
                    <h3 className={style.titleLifeSpan}>Life Span</h3>
                    <p className={style.textLifeSpan}>{life_span}</p>
                  </div>
                </div>

                <div className={style.divTemperaments}>
                  <h3 className={style.titleTemperaments}>Temperaments</h3>
                  {Array.isArray(temperament) ? (
                    <div className={style.divItemsTemperaments}>
                      {temperament.map((temp) => (
                        <p className={style.itemTemperament}>{temp.name}</p>
                      ))}
                    </div>
                  ) : (
                    <div className={style.divItemsTemperaments}>
                      <p className={style.itemTemperament}>{temperament}</p>                   
                    </div>
                  )}
                </div>
              </div>
              <div className={style.divImageDetail}>
                <img src={image} alt={name} />
              </div>
            </div>
    </div>
  );
};

export default Detail;