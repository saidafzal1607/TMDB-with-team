import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";

const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export async function getTopMovies(page = 1) {
  try {
    const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(url);
    return data;
  } catch (error) {
    throw error;
  }
}

export function displayTopMovies(data) {
  const { results } = data;
  const topMovies = document.querySelector(".top__movies");
  let html = "";
  results.forEach((movie) => {
    const { title, poster_path, release_date, vote_average, id } = movie;
    const poster = poster_path
      ? `${BASE_IMG_URL}${poster_path}`
      : DEFAULT_IMG_URL;

    html += `
    <div class="col col-md-6 col-lg-4 col-xl-3">
      <card data-id=${id} class="card ">
      <a href="detailsmovie.html" class="card-img-btn">
        <img
          class="card-img img-fluid"
          src="${poster}"
          alt="something movie"
        />
      </a>
      <div class="card-img-overlay">
        <a class="threedot-btn">
          <i class="fa-solid fa-ellipsis"></i>
        </a>
      </div>
      <div class="card-body">
        <div class="card-click">
          <ul>
            <li>
              <a href="#">
                <i class="fa-solid fa-list"></i>
                Add to list</a
              >
            </li>
            <li>
              <a href="#">
                <i class="fa-solid fa-heart"></i>
                Favourite</a
              >
            </li>
            <li>
              <a href="#">
                <i class="fa-solid fa-clipboard-list"></i>
                Watchlist
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-solid fa-star"></i>
                Your rating</a
              >
            </li>
          </ul>
        </div>
        <div class="circle-progressbar">
          <div
            role="progressbar"
            style="--value: ${vote_average * 10}"
          ></div>
        </div>
        <a href="detailsmovie.html" class="card-title">${title}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
      </div>
      </card>
      
      </div>
    `;
    topMovies.innerHTML = html;
    // const movieEl = document.createElement("div");
    // movieEl.classList.add("movie");
    // movieEl.innerHTML = `
    //   <img src="${poster}" alt="${title}" />
    //   <div class="movie-info">
    //     <h2>${title}</h2>
    //     <p>${vote_average}</p>
    //     <button class="btn" data-movie-id="${id}">More Info</button>
    //   </div>
    // `;
    // popularTvMovies.appendChild(movieEl);
  });
}
