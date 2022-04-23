import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, SESSION_ID, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } =
  configs;

export async function getMovie(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    const accountStateUrl = `${BASE_URL}movie/${movie_id}/account_states?api_key=${API_KEY}&session_id=${SESSION_ID}`;
    const res = await fetch(url);
    const resAccountState = await fetch(accountStateUrl);
    const data = await res.json();
    const accountStateData = await resAccountState.json();
    console.log(accountStateData, "isFav");
    return { ...data, ...accountStateData };
  } catch (error) {
    throw error;
  }
}

export async function getMovieActors(movie_id) {
  console.log(movie_id, "salom");
  try {
    const url = `${BASE_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieRecommendations(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function displayMovie(data) {
  const movieContent = document.querySelector(".main-movie");
  let html = "";
  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    runtime,
    tagline,
    favorite,
    rated,
    watchlist,
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
              <button class="addlistbtn"  data-addlist="false" title="Add to list">
              <i class="fa-solid fa-list"></i>
              </button>
              </li>
              <li>
              <button class="favbtn" data-favlist=${favorite} title="Mark as favorite">
              <i class="fa-solid fa-heart"></i>
              </button>
              </li>
              <li>
              <button  class="watchbtn"  data-watchlist=${watchlist} title="Add to your wathclist">
              <i class="fa-solid fa-clipboard-list"></i>
              </button>
              </li>
              <li  class="Rating">
              <button href="#" class="ratebtn" title="Rate It">
              <i class="fa-solid fa-star"></i>
              </button>
              <div class="star-box">
              <div class="star_rating">
                <i class="fa-solid fa-circle-minus removeallbtn"></i>
                <span class="star" data-rate=1>&#9734;</span>
                <span class="star"data-rate=2>&#9734;</span>
                <span class="star" data-rate=3>&#9734;</span>
                <span class="star" data-rate=4>&#9734;</span>
                <span class="star" data-rate=5>&#9734;</span>
              </div>
            </div>
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

export function displayMovieActors(data) {
  const { cast } = data;
  const personOfMovies = document.querySelector(".movie-actors");
  let html = "";
  cast.forEach((actors) => {
    const { profile_path, name, id, character } = actors;
    const poster = profile_path
      ? `${BASE_IMG_URL}${profile_path}`
      : DEFAULT_IMG_URL;
    html += `
    <div class="col">
    <div class="card card-actor"  data-id=${id}>
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

export function displayMovieRecommendations(data) {
  const { results } = data;
  const personOfMovies = document.querySelector(".movie-recommendations");
  let html = "";
  results.forEach((actors) => {
    const { poster_path, title, id, vote_average, release_date } = actors;
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
                <i class="fa-solid fa-calendar-days"></i>  ${moment(
                  release_date
                ).format("l")}
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

// adit person.html

export async function getMoviePerson(person_id) {
  try {
    const url = `${BASE_URL}person/${person_id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMoviePersonOfMovies(person_id) {
  try {
    const url = `${BASE_URL}person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function displayMoviePerson(data) {
  const personContent = document.querySelector(".main-person");
  let html = "";
  const {
    biography,
    profile_path,
    name,
    place_of_birth,
    also_known_as,
    birthday,
    gender,
  } = data;
  const poster = profile_path
    ? `${BASE_IMG_URL}${profile_path}`
    : DEFAULT_IMG_URL;
  const gen = gender == 1 ? "Female" : "Male";
  const nowDate = new Date();
  html += `
  <div class="col-sm-7 col-md-4">
  <a href="" class="movie-posterimg">
    <img
      class="img-fluid"
      src="${poster}"
      alt="brand"
    />
  </a>
  <ul class="person-social-links my-4">
    <li>
      <a href="" title="Visit Facebook">
        <i class="fa-brands fa-facebook-square"></i>
      </a>
    </li>
    <li>
      <a href="" title="Visit Insgagram">
          <i class="fa-brands fa-instagram"></i>
      </a>
    </li>
  </ul>

  <h3>Personal Info</h3>
  <p class="py-1">
    <strong class="fw-bold">Known For</strong> <br />
    Acting
  </p>
  <p class="py-1">
    <strong class="fw-bold"> Known Credits</strong> <br />
    128
  </p>
  <p class="py-1">
    <strong class="fw-bold">Gender</strong> <br />
   ${gen}
  </p>
  <p class="py-1">
    <strong class="fw-bold">Birthday</strong> <br />
   ${birthday} (${Math.floor(
    nowDate.getFullYear() - birthday.split("-")[0]
  )} years old)
  </p>
  <p class="py-1">
    <strong class="fw-bold">Place of Birth</strong> <br />
    ${place_of_birth}
  </p>
  <p class="py-1">
    <strong class="fw-bold">Also Known As</strong> <br />
    ${also_known_as.map((item) => `${item}<br /> `)}
  </p>
</div>
<div class="col-sm-5 col-md-8 py-1">
  <h1>
    <strong class="fw-bold">${name}</strong>
  </h1>
  <h5 class="py-4">
    <strong class="fw-bold">Biography</strong>
  </h5>
  <p class="text-dark fw-normal">
    ${biography}
  </p>
  <h5 class="py-4">
      <strong class="fw-bold">Known For</strong>
  </h5>
  <div class="personOfMovies row overflow-scroll">
  </div>
  </div>
</div>
    `;
  personContent.innerHTML = html;
}
export function displayMoviePersonOfMovies(data) {
  const { cast } = data;
  const personOfMovies = document.querySelector(".personOfMovies");
  let html = "";
  cast.forEach((person) => {
    const { poster_path, title, id } = person;
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
            ${title}
        </a>
      </div>
    </div>
  </div>   
    `;
  });
  personOfMovies.innerHTML = html;
}

// Favorite List

export async function AddFavourite(id, favorite) {
  const FavouriteUrl = `${BASE_URL}account/${id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    favorite: !favorite,
  };
  const response = await fetch(FavouriteUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await response.json();
  return data;
}

export async function AddWatchlist(id, watchlist) {
  const addToWatchlistUrl = `${BASE_URL}account/${id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    watchlist: !watchlist,
  };
  const response = await fetch(addToWatchlistUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await response.json();
  return data;
}

export async function AddRate(id, rated) {
  const addToRatedUrl = `${BASE_URL}account/${id}/rated/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    rated: !rated,
  };
  const response = await fetch(addToRatedUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await response.json();
  return data;
}

// RateStar
export let RateStars = new Promise((resolve, reject) => {
  resolve(function RateStar(stars, removeallbtn) {
    let curStarLevel;
    stars.forEach((star, i) => {
      star.onclick = (e) => {
        curStarLevel = i + 1;
        stars.forEach((star, j) => {
          if (curStarLevel >= j + 1) {
            star.innerHTML = "&#9733";
          } else {
            star.innerHTML = "&#9734";
          }
        });
      };
    });
    removeallbtn.onclick = (e) => {
      stars.forEach((star, i) => {
        star.innerHTML = "&#9734";
      });
    };
    return curStarLevel;
  });
  reject("Something wrong");
});
