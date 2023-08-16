import { useSelector } from "react-redux";
import Card from "./Card/Card";
import style from "./Cards.module.css";
import { Paginated } from "../Paginated/Paginated";
import { useEffect, useState } from "react";


const CardsContainer = () => {
  const dogs = useSelector((state) => state.dogs);
  const [cardsPerPage, setCardsPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex  = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage
  const searchResults = useSelector((state) => state.onSearch);
  let displayedDogs = searchResults && searchResults.length > 0 ? searchResults : dogs;

  const dogsToRender = displayedDogs.slice(firstIndex, lastIndex);
  useEffect(() => {
    if (searchResults.length === 0) {
      setCurrentPage(); 
    }
  }, [searchResults]);



  return (
    <div>
      <div className={style.Container}>
        {dogsToRender.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            life_span={dog.life_span}
            temperament={dog.temperament}
            image={dog.image?.url ? dog.image.url : dog.image}
          />
        ))}
      </div>
      <div>
        <Paginated
          cardsPerPage={cardsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalDogs={displayedDogs.length}
        />
      </div>
    </div>
  );
};
// crear un estado local 
export default CardsContainer;
