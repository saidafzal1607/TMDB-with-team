import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL, SESSION_ID, USER_IMG_URL } = configs;

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
    const { avatar,username, name,   } = data;
    const detailAccount = document.querySelector( ".account-img");
      const poster = avatar?.tmdb?.avatar_path
        ? `${BASE_IMG_URL}${avatar?.tmdb?.avatar_path}`
        : USER_IMG_URL;
  
        detailAccount.innerHTML = `
        <div class="row ">
          <div class="col col-6" style="width: 200px; height: 200px; border-radius: 50%;">
          <img  style="width: 200px; height: 200px; border-radius: 50%;" src="${poster}" alt=""></div>
          <div class="col col-6">
  
            <div class="row  detail-account" style="padding-left: 20px;">
              <div class="col " style="display: flex; margin-top: 50px;">
                <a class="h3" style="text-decoration: none; color: white;" href="#">${username}</a>
                <p class="h6" style="margin-top: 15px; padding-left: 10px; color:darkslategray;">Member since April 2022
                </p>
              </div>
            </div>
            <div class="row" style="padding-left: 20px;">
             <div class="col">
               <h5 style="color:darkslategray;">${name}</h5>
             </div>
            </div>
          </div>
        </div>

          
              
            
      `;
      
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