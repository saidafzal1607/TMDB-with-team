import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";

const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export function discoveryFilterHandler(query) {
  let url = `${BASE_URL}discover/movie?api_key=${API_KEY}`;
  for (const key in query) {
    if (query[key]) {
      url += `&${key}=${query[key]}`;
    }
  }
  return url;
}
export async function discoverPopularMovie(query) {
  const url = this.discoveryFilterHandler(query);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

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


export function sortMovies(data) {
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
      <a href="movie.html" class="card-img-btn">
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
    topMovies.innerHTML = html;
  });
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
      <a href="movie.html" class="card-img-btn">
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
    topMovies.innerHTML = html;
  });
}

export async function getFavMovie(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function displayFavMovie(data) {
  const movieContent = document.querySelector(".main-movie");
  let html = "";
  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    runtime,
    tagline,
    genres,
    release_date,
    vote_average,
  } = data;
  const poster = poster_path
    ? `${BASE_IMG_URL}${poster_path}`
    : DEFAULT_IMG_URL;
  const backdrop = backdrop_path
    ? `${BASE_IMG_URL}${backdrop_path}`
    : DEFAULT_IMG_URL;

  html += `
  <div class="header-movie" style="background-image: url(${backdrop});">
   <div class="custom-bg">
     <div class="container">
        <div class="row movie-item">
  <div class="col-4">
  <a href="" class="movie-posterimg">
  <img class="img-fluid "
  src="${poster}" alt="brand" />
  </a>
  </div>
  <div class="col-8">
  <a href="#" class="movie-title my-2">
  <h1>
  
  ${title}(${release_date.split("-")[0]})
              </h1>
              </a>
              <p class="my-2">
              ${moment(release_date).format("L")}
              ${genres.map((genre) => genre.name).join(", ")}
              ${Math.floor(runtime / 60)}h ${runtime % 60}min
              
              </p>
              <div class="rating mt-5">
              <div class="circle-progressbar">
              <div role="progressbar" style="--value: ${vote_average * 10}">
              </div>
              </div>
              <h6 class="pb-4 mx-2">User Score</h6>
              <ul>
              <li>
              <a href="#" title="Add to list">
              <i class="fa-solid fa-list"></i>
              </a>
              </li>
              <li>
              <a href="#" title="Mark as favorite">
              <i class="fa-solid fa-heart"></i>
              </a>
              </li>
              <li>
              <a href="#" title="Mark as favorite">
              <i class="fa-solid fa-clipboard-list"></i>
              </a>
              </li>
              <li>
              <a href="#" title="Rate It">
              <i class="fa-solid fa-star"></i>
              </a>
              </li>
              </ul>
              
              </div>
              <div class="movie-overview my-2">
              <p class="tagline-text">
              ${tagline}
            
            </p>
            <h3 class="py-2">
            Overview
            </h3>
            <p> ${overview}
            </p>
            </div>
            <div class="row">
            <div class="col-4">
            <a href="" class="movie-character">
            steve ditko
            </a>
            <p>
            characters
            </p>
            </div>
            <div class="col-4">
            <a href="" class="movie-character ">
            stan lee
            </a>
            <p>
            characters
            </div>
            <div class="col-4">
            <a href="" class="movie-character">
            jon watts
            </a>
            <p>
            directors
            </div>
            <div class="col-4">
            <a href="" class="movie-character">
            erik sommers
            </a>
            <p>
            writer
            </div>
            <div class="col-4">
            <a href="" class="movie-character">
            chris mckenna
            </a>
            <p>
            writer
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            
            </div>
            `;

  movieContent.innerHTML = html;
}

export async function getFavMovieActors(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export  function displayFavMovieActors(data) {
  const { cast } = data;
    const personOfMovies = document.querySelector(".movie-actors");
  let html = "";
    cast.forEach((actors) => {
        const { profile_path, name, id ,character} = actors;
        const poster = profile_path
            ? `${BASE_IMG_URL}${profile_path}`
            : DEFAULT_IMG_URL;
        html += `
    <div class="col">
    <div class="card"  data-id=${id}>
    <a href="" class="card-img">
    <img class="card-img-top"
      src="${poster}" alt="${name}" />
  </a>
  <div class="card-body py-3">
    <h5 class="card-title text-black"> ${name} </h5>
    <p class="card-text text-capitalize">${character}</p>
  </div>
    </div>
  </div>   
    `;
    });
    personOfMovies.innerHTML = html;
   
}
export async function getFavMovieRecommendations(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export  function displayFavMovieRecommendations(data) {
  const { results } = data;
    const personOfMovies = document.querySelector(".movie-recommendations");
  let html = "";
    results.forEach((actors) => {
        const { poster_path, title, id,vote_average,release_date} = actors;
        const poster = poster_path
            ? `${BASE_IMG_URL}${poster_path}`
            : DEFAULT_IMG_URL;
        html += `
        <div class="col">
        <div class="card" data-id="${id}" >
          <a href="" class="card-img">
            <img class="card-img-top"
              src="${poster}" alt="${title}" />
          </a>
          <div class="card-img-overlay">
            <div class="card-overlay">
              <div class="movie-data">
                <i class="fa-solid fa-calendar-days"></i>  ${moment(release_date).format('l')}
              </div>
              <div class="lists">
                <a href="#" class="text-decoration-none pe-2">
                  <i class="fa-solid fa-heart"></i>
                </a>
                <a href="#" class="text-decoration-none pe-2">
                  <i class="fa-solid fa-list-ol"></i>
                </a>
                <a href="#" class="text-decoration-none">
                  <i class="fa-solid fa-star"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title text-black text-capitalize">${title}</h5>
            <p class="card-text">${Math.floor(vote_average * 10)} %</p>
          </div>
        </div>
      </div>
    `;
    });
    personOfMovies.innerHTML = html;
   
}