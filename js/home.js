import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

//  ===================================     SEARCH     ================================



// https://api.themoviedb.org/3/search/company?api_key=a585ab7667d107d8a1091777c0f7eba2&query=hard&page=1

export async function getSearchMovies( query = [] , page = 1) {
  try {
    const url = `${BASE_URL}search/company?api_key=${API_KEY}&query=${query}&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    const { results } = data;
    console.log(data);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}












//  ===================================     SEARCH     ================================



export async function getPopularTVMovies(page = 1) {
  try {
    const url = `${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPopularTheatres(page = 3) {
  try {
    const url = `${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTopRated(page = 1) {
  try {
    const url = `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPopularMovies(page = 1) {
  try {
    const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function displayPopularTVMovies(data) {
  const { results } = data;
  console.log(results, 'salom bu results ontv movies');
  const popularONTvMovies = document.querySelector(".popular-ontv-movies");
  let html = "";
  results.forEach((OnTVmovie) => {
    const { name, poster_path, first_air_date, vote_average, id } = OnTVmovie;
    const poster = poster_path
      ? `${BASE_IMG_URL}${poster_path}`
      : DEFAULT_IMG_URL;

    html += `
    <div class="col">
      <card data-id=${id} class="card">
      <a href="" class="card-img-btn">
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
        <a href="movie.html" class="card-title">${name}</a>
        <p class="card-text">${moment(first_air_date).format("ll")}</p>
      </div>
      </card>
    </div>
    `;
    popularONTvMovies.innerHTML = html;
  });
}

export function displayPopularTheatres(data) {
  const { results } = data;
  const popularONTvMovies = document.querySelector(".popular-intheatres");
  let html = "";
  results.forEach((OnTVmovie) => {
    const { original_name, poster_path, release_date, vote_average, id } = OnTVmovie;
    const poster = poster_path
      ? `${BASE_IMG_URL}${poster_path}`
      : DEFAULT_IMG_URL;

    html += `
    <div class="col" style="height: 395px;">
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
        <a href="movie.html" class="card-title">${original_name}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
      </div>
      </card>
    </div>
    `;
    popularONTvMovies.innerHTML = html;
  });
}

export function displayTopRated(data) {
  const { results } = data;
  console.log(results, 'salom bu results Top rated');
  const topRated = document.querySelector(".top-rated");
  let html = "";
  results.forEach((LatestTrailer) => {
    const { title, poster_path, release_date ,vote_average, id } = LatestTrailer;
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
        <a href="movie.html" class="card-title">${title}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
        </div>
      </card>
    </div>
    `;
    topRated.innerHTML = html;
  });
}

export function displayPopularMovies(data) {
  const { results } = data;
  const popularTvMovies = document.querySelector(".popular-tv-movies");
  let html = "";
  results.forEach((movie) => {
    const { title, poster_path, release_date, vote_average, id } = movie;
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
        <a href="movie.html" class="card-title">${title}</a>
        <p class="card-text">${moment(release_date).format("ll")}</p>
      </div>
      </card>
    </div>
    `;
    popularTvMovies.innerHTML = html;
  });
}

