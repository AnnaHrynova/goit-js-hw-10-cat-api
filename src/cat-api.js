import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_6am62qmOc1ekjEnzcixEYlTnoA8IBSgQPoeTMvG1Hbr9FUMj5ybP4s7ZNK4Q0O9v";

const BASE_URL = "https://api.thecatapi.com/v1";
const CAT_ENDPOINT = "images/search";

export function fetchBreeds(selectedBreedId) {
    const BASE_URL = "https://api.thecatapi.com/v1";
    const ENDPOINT = "breeds";
    const API_KEY = "live_6am62qmOc1ekjEnzcixEYlTnoA8IBSgQPoeTMvG1Hbr9FUMj5ybP4s7ZNK4Q0O9v";

    const params = new URLSearchParams({
        key: API_KEY,
    });
    return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then((response) => {
        if (!response.ok) {
            throw new Error("404 not found!");
        }
        return response.json();
    });
}

export function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}/${CAT_ENDPOINT}?${params}`);
}
