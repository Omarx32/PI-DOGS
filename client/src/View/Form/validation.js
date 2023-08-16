const regexName = /^[a-zA-Z\s]+$/;
const regexNumber = /^[0-9]\d*(\.\d+)?$/;

const errorCompleted = "is required";
const errorJustNumber = "It must be just numbers";

const validation = ({
  name,
  lifeSpanMin,
  lifeSpanMax,
  weightMin,
  weightMax,
  heightMin,
  heightMax,
  temperament,
  image,
}) => {
  const errors = {};

  //Validacion de name
  if (!name) {
    errors.name = `Name ${errorCompleted}`;
  } else if (parseInt(name)) {
    errors.name = "Name is invalid, write a text";
  } else if (!regexName.test(name)) {
    errors.name = "Special caracters aren't supported";
  } else if (name.length > 51) {
    errors.name = "Name must have a maximum of 50 characters";
  }

  //Validation de lifeSpan
  if (!lifeSpanMin) {
    errors.lifeSpanMin = `Minimum life span ${errorCompleted}`;
  } else if (!regexNumber.test(lifeSpanMin.trim())) {
    errors.lifeSpanMin = errorJustNumber;
  } else if (parseInt(lifeSpanMin) < 5) {
    errors.lifeSpanMin = "Minimum life span should not be less than 5 years";
  } else if (parseInt(lifeSpanMin) > 15) {
    errors.lifeSpanMin = "Minimum life span cannot be greater than 15 years";
  }

  if (!lifeSpanMax) {
    errors.lifeSpanMax = `Maximum life span ${errorCompleted}`;
  } else if (!regexNumber.test(lifeSpanMax.trim())) {
    errors.lifeSpanMax = errorJustNumber;
  } else if (parseInt(lifeSpanMax) < parseInt(lifeSpanMin)) {
    errors.lifeSpanMax = "Maximum life span must be greater than the minimum";
  } else if (parseInt(lifeSpanMax) > 25) {
    errors.lifeSpanMax = "Maximum life span should not be more than 25 years";
  }

  // //Validacion de weight
  if (!weightMin) {
    errors.weightMin = `Minimum weight ${errorCompleted}`;
  } else if (!regexNumber.test(weightMin.trim())) {
    errors.weightMin = errorJustNumber;
  } else if (parseInt(weightMin) < 1) {
    errors.weightMin = "Minimum weight should not be less than 1 kg";
  } else if (parseInt(weightMin) > 75) {
    errors.weightMin = "Minimum weight cannot be greater than 75 kg";
  }

  if (!weightMax) {
    errors.weightMax = `Maximum weight ${errorCompleted}`;
  } else if (!regexNumber.test(weightMax.trim())) {
    errors.weightMax = errorJustNumber;
  } else if (parseInt(weightMax) < parseInt(weightMin)) {
    errors.weightMax = "Maximum weight must be greater than the minimum";
  } else if (weightMax > 150) {
    errors.weightMax = "Maximum weight should not be more than 150 kg";
  }

  // //Validation de height
  if (!heightMin) {
    errors.heightMin = `Minimum height ${errorCompleted}`;
  } else if (!regexNumber.test(heightMin.trim())) {
    errors.heightMin = errorJustNumber;
  } else if (parseInt(heightMin) < 10) {
    errors.heightMin = "Minimum height should not be less than 10 cm";
  } else if (parseInt(heightMin) > 75) {
    errors.heightMin = "Minimum height cannot be greater than 110 cm";
  }

  if (!heightMax) {
    errors.heightMax = `Maximum height ${errorCompleted}`;
  } else if (!regexNumber.test(heightMax.trim())) {
    errors.heightMax = errorJustNumber;
  } else if (parseInt(heightMax) < parseInt(heightMin)) {
    errors.heightMax = "Maximum height must be greater than the minimum";
  } else if (heightMax > 130) {
    errors.heightMax = "Maximum height should not be more than 130 cm";
  }

  //Validation temperaments
  if (temperament.length === 0) {
    errors.temperament = `Temperaments ${errorCompleted}`;
  } else if (temperament.length < 3) {
    errors.temperament = "Must choose at least 3 temperaments";
  }

  //Validation image
  if (!image) {
    errors.image = `Image ${errorCompleted}`;
  }

  return errors;
};

export default validation;