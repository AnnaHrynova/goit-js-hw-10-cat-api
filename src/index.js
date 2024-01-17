import axios from "axios";
import { fetchBreeds } from "./cat-api.js";
import { fetchCatByBreed } from "./cat-api.js";

axios.defaults.headers.common["x-api-key"] = "live_6am62qmOc1ekjEnzcixEYlTnoA8IBSgQPoeTMvG1Hbr9FUMj5ybP4s7ZNK4Q0O9v";

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

refs.breedSelect.addEventListener("change", handleBreedChange);

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => response.json())
  .then(data => {
      console.log(data);
      data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            refs.breedSelect.appendChild(option);
        });
  })
  .catch(error => {
    alert ('Error:', error);
  });

function handleBreedChange (event) {
    event.preventDefault();
    const selectedBreedId = refs.breedSelect.value;
    refs.catInfo.innerHTML = "";

    if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then((response) => {
        const cat = response.data[0];
        displayCatInfo(cat);
      })
      .catch((error) => {
        alert ("Error fetching cat:", error);
      });
  }
}

function displayCatInfo(cat) {
  // Create elements to display cat info
  const catImage = document.createElement("img");
  catImage.src = cat.url;
  catImage.alt = "Cat Image";

  const breedName = document.createElement("h3");
  breedName.textContent = cat.breeds[0].name;

  const description = document.createElement("p");
  description.textContent = cat.breeds[0].description;

  const temperament = document.createElement("p");
  temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  // Append elements to catInfo div
  refs.catInfo.appendChild(catImage);
  refs.catInfo.appendChild(breedName);
  refs.catInfo.appendChild(description);
  refs.catInfo.appendChild(temperament);
}
