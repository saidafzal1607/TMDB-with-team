import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export async function getMovie(movie_id) {
  try {
    const url = `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}



export function displayMovies(data) {
  const movieContent = document.querySelector(".main-movie");
  let html = "";
  const { title, poster_path,overview,backdrop_path,runtime,tagline, genres, release_date, vote_average, id } = data;
  const poster = poster_path
    ? `${BASE_IMG_URL}${poster_path}`
    : DEFAULT_IMG_URL;

  html += `
    <div class="col-4">
            <a href="" class="movie-posterimg">
              <img class="img-fluid "
                src="${poster}" alt="brand" />
            </a>
          </div>
          <div class="col-8">
            <a href="#" class="movie-title my-2">
              <h1>
              ${title}
              </h1>
            </a>
            <p class="my-2">
            sanasi
              ${genres.map((genre) => genre.name).join(", ")}
            
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
    `;

  movieContent.innerHTML = html;
}
