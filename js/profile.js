import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export async function getPopularTVMovies(page = 1) {
  try {
    const url = `${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export function displayPopularTVMovies(data) {
  const { results } = data;
  const popularONTvMovies = document.querySelector(".popular-onTV-movies");
  let html = "";
  results.forEach((OnTVmovie) => {
    const { title, poster_path, release_date, vote_average, id } = OnTVmovie;
    const poster = poster_path
      ? `${BASE_IMG_URL}${poster_path}`
      : DEFAULT_IMG_URL;

    html += `
    <div class="col">
      <card data-id=${id} class="card">
      <a href="#" class="card-img-btn">
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
        <a href="/detailsmovie.html?id=${id}" class="card-title">${title}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
      </div>
      </card>
    </div>
    `;
    popularONTvMovies.innerHTML = html;
  });
}

export async function getLatestMovies(page = 1) {
  try {
    const url = `${BASE_URL}tv/latest?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export function displayLatestMovies(data) {
  const { results } = data;
  const latestMovies = document.querySelector(".popular-onTv-movies");
  let html = "";
  results.forEach((latTVMovie) => {
    const { title, poster_path, release_date, vote_average, id } = latTVMovie;
    const poster = poster_path
      ? `${BASE_IMG_URL}${poster_path}`
      : DEFAULT_IMG_URL;

    html += `
    <div class="col">
      <card data-id=${id} class="card">
      <a href="#" class="card-img-btn">
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
        <a href="/index.html?id=${id}" class="card-title">${title}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
      </div>
      </card>
    </div>
    `;
    latestMovies.innerHTML = html;
  });
}