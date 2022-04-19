import configs from "../config.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export async function getPersonOfMovies(person_id) {
  try {
    const url = `${BASE_URL}person/${person_id}/tv_credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function displayPersonOfMovies(data) {
  const { cast } = data;
    const personOfMovies = document.querySelector(".personOfMovies");
  let html = "";
    cast.forEach((person) => {
        const { poster_path, name, id } = person;
        const poster = poster_path
            ? `${BASE_IMG_URL}${poster_path}`
            : DEFAULT_IMG_URL;
        html += `
    <div class="col">
    <div class="card"  data-id=${id}>
      <a href="" class="card-img">
        <img class="card-img-top"
          src="${poster}"
          alt="Card image cap">
      </a>
      <div class="card-body py-3">
        <a class="card-text text-capitalize">
            ${name}
        </a>
      </div>
    </div>
  </div>   
    `;
    });
    personOfMovies.innerHTML = html;
   
}
