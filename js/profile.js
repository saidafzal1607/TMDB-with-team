import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL, SESSION_ID } = configs;

export async function getDetailAccount() {
    try {
      const url = `${BASE_URL}account?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  export function displayDetailAccount(data) {
    const { avatar } = data;
    const detailAccount = document.querySelector(".detail-account");
    let html = "";
     avatar.forEach((DetailAccount) => {
      const { poster_path, username } = DetailAccount;
      const poster = poster_path
        ? `${BASE_IMG_URL}${poster_path}`
        : DEFAULT_IMG_URL;
  
      html += `
              <div class="col " style="display: flex; margin-top: 50px;">
                <a class="h3" style="text-decoration: none; color: white;" href="#">${username}</a>
                <p class="h6" style="margin-top: 15px; padding-left: 10px; color:darkslategray;">Member since April 2022
                </p>
              </div>
      `;
      detailAccount.innerHTML = html;
    });
  }
  export async function getLists() {
    try {
      const url = `${BASE_URL}account/{account_id}/lists?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  export function displayLists(data) {
    const { results } = data;
    const detailLists = document.querySelector(".lists");
    let html = "";
     results.forEach((DetailAccount) => {
      const { poster_path, total_results, total_pages } = DetailAccount;
      const poster = poster_path
        ? `${BASE_IMG_URL}${poster_path}`
        : DEFAULT_IMG_URL;
  
      html += `
      div class="col">
      <p>Total Edits</p>
      <p class="h1 text-muted">${total_pages}</p>
    </div>
    <div class="col">
      <p>Total Ratings</p>
      <p class="h1 text-muted">${total_results}</p>
    </div>
      `;
      detailLists.innerHTML = html;
    });
  }

  export async function getFavMovieAccount(page = 1) {
    try {
      const url = `${BASE_URL}account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&${page}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  export function displayFavMovieAccount(data) {
    const { results } = data;
    const favMovieAccount = document.querySelector(".favMovie-account");
    let html = "";
    results.forEach((DetailAccount) => {
      const { original_title, poster_path, release_date, id } = DetailAccount;
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

          
        </card>
      </div>
      `;
      favMovieAccount.innerHTML = html;
    });
  }

  export async function getRating(page = 1) {
    try {
      const url = `${BASE_URL}account/{account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&${page}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  export function displayRating(data) {
    const { results } = data;
    const rated = document.querySelector(".Rated");
    let html = "";
    results.forEach((DetailAccount) => {
      const { original_title, poster_path, release_date, id } = DetailAccount;
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

          
            <h4> ${original_title}</h4>
        </card>
      </div>
        `;
        rated.innerHTML = html;
    });
  }