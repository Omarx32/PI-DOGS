import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getCreateImage,
  postDogs,
} from "../../Redux/Action/action";
import validation from "./validation";
import styles from "./Form.module.css";

const Form = () => {
  const temperament = useSelector((state) => state.temperament);
  const img = useSelector((state)=> state.image)  
  const dispatch = useDispatch();

  const [createDogsForm, setCreateDogsForm] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMax: "",
    weightMin: "",
    life_spanMin: "",
    life_spanMax: "",
    temperament: [],
    image: "",
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  

  
  const [errors, setErrors] = useState({});
  
  /* Handle que evalua el value para setearlo en el estado del form */
  
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(
      validation({
        ...createDogsForm,
        [property]: value,
      })
      );
    setCreateDogsForm({
      ...createDogsForm,
      [property]: value,
    });
  };
                /* dispactch para crear img && setearlo al estado */
              
  const createImage = async (event) => {
      event.preventDefault();
      const image = await dispatch(getCreateImage());

    console.log(img)
      
    setCreateDogsForm({
      ...createDogsForm,
     image,
    });
    setErrors(
      validation({
        ...createDogsForm,
         image,
      })
      );
    };
   
    /* Handle que evalua si ya agregaste el temperamento o si has añadido de mas */
    
    const handleSelect = (event) => {
      const value = event.target.value;
      
      const alreadyAdded = createDogsForm.temperament.includes(value);
      
      if (alreadyAdded) {
        return alert("The temperament has already been added.");
      }
      if (createDogsForm.temperament.length >= 5) {
        return alert("No more temperaments can be added.");
      }
      const updatedTemperaments = [...createDogsForm.temperament, value];
      setErrors(
        validation({
          ...createDogsForm,
          temperament: updatedTemperaments,
        })
        );
        setCreateDogsForm({
          ...createDogsForm,
          temperament: updatedTemperaments
        });
      };
      const temperamentForm =[...createDogsForm.temperament  ]
      /* Handle que evalua si ya agregaste el temperamento o si has añadido de mas */
 const removeTemperaments = (temperamentToRemove) => {
    const updatedTemperaments = createDogsForm.temperament.filter(
     (temperament) => temperament !== temperamentToRemove
    );
                  
    setCreateDogsForm({
     ...createDogsForm,
      temperament: updatedTemperaments,
       });
   };
                /* Handle que valida que todo este good para ejecutar la funcion  */
  
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !errors.name &&
      !errors.weightMin &&
      !errors.weightMax &&
      !errors.heightMin &&
      !errors.heightMax &&
      !errors.life_spanMin &&
      !errors.life_spanMax &&
      !errors.temperament 
      
    ) {
      dispatch(postDogs(createDogsForm));
      setCreateDogsForm({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_spanMin: "",
        life_spanMax: "",
        temperament: [],
        image: "",
      });
      alert("Your dog has been created succesfully");
    } else {
      alert(" b ing went wrong. Please try again");
    }
  };
  console.log(createDogsForm);

  return (
    <div className={styles.containerGeneralForm}>
      <div className={styles.containerForm}>

   
    <form onSubmit={submitHandler}>
                  {/* DIV FOR NAME */}

      <div className={styles.divInput}>
        <label htmlFor="name" className={styles.labelForm}>
          Name:
        </label>
        <input
          type="text"
          value={createDogsForm.name}
          onChange={changeHandler}
          name="name"
        />
      </div>

                  {/* DIV FOR HEIGHT */}

      <div className={styles.divInput}>
        <label htmlFor="heightMin" className={styles.labelForm}>
          Height Min
        </label>
        <input
          type="Number"
          value={createDogsForm.heightMin}
          onChange={changeHandler}
          name="heightMin"
        />
      </div>

      <div className={styles.divInput}>
        <label htmlFor="heightMax" className={styles.labelForm}>
          Height Max
        </label>
        <input
          className={styles.inputForm}
          type="Number"
          value={createDogsForm.heightMax}
          onChange={changeHandler}
          name="heightMax"
        />
      </div>

                  {/* DIV FOR WEIGHT */}

      <div className={styles.divInput}>
        <label htmlFor="weightMin" className={styles.labelForm}>
          Weight Min
        </label>
        <input
          className={styles.inputForm}
          type="Number"
          value={createDogsForm.weightMin}
          onChange={changeHandler}
          name="weightMin"
        />
      </div>

      <div className={styles.divInput}>
        <label htmlFor="weightMax" className={styles.labelForm}>
          Weight Max
        </label>
        <input
          className={styles.inputForm}
          type="Number"
          value={createDogsForm.weightMax}
          onChange={changeHandler}
          name="weightMax"
        />
      </div>

                  {/* DIV FOR LIFE_SPAN */}

      <div className={styles.divInput}>
        <label htmlFor="life_spanMin" className={styles.labelForm}>
          Life Min
        </label>
        <input
          className={styles.inputForm}
          type="Number"
          value={createDogsForm.life_spanMin}
          onChange={changeHandler}
          name="life_spanMin"
        />
      </div>

      <div className={styles.divInput}>
        <label htmlFor="life_spanMax" className={styles.labelForm}>
          Life Max
        </label>
        <input
          className={styles.inputForm}
          type="Number"
          value={createDogsForm.life_spanMax}
          onChange={changeHandler}
          name="life_spanMax"
        />
      </div>

                  {/* DIV FOR SELECT TEMPERAMENTS */}

      <div className={styles.divInputSelectTemp}>
        <label htmlFor="temperaments" className={styles.labelForm}>
          Temperaments:
        </label>
        <select onChange={handleSelect} className={styles.selectTemperaments}>
          <option disabled defaultValue="-">
            -
          </option>
          {temperament && temperament.map((temp) => (
            <option key={temp.id}value={temp.name}>{temp.name}</option>
          ))}
        </select>
      </div>

                  {/* DIV FOR ADD TEMPERAMENTS */}

      <div className={styles.divTemperamentsAdd}>
        {temperamentForm.map((tempForm, index) => (
          <div key={index}>
            <button
              className={styles.divButtonTemperaments}
              value={tempForm}
              onClick={()=>removeTemperaments(tempForm)}
            >
              X
            </button>
            <p>{tempForm}</p>
          </div>
        ))}
      </div>

      <div className={styles.divInputButtonCreate}>
        <p className={styles.pCreateImage}></p>
        <button className={styles.buttonCreateImg} onClick={createImage}>
          Click here to generate a image for a dog
        </button>
      </div>
      <input type="submit" value="Create" className={styles.buttonSubmit}  />
    </form>
    </div>
 
    </div>
  );
};

export default Form;
