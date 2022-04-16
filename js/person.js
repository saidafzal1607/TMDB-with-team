import configs from "../config.js";
import moment from "../node_modules/moment/dist/moment.js";
const { API_KEY, BASE_URL, DEFAULT_IMG_URL, BASE_IMG_URL } = configs;

export async function getPerson(person_id) {
  try {
    const url = `${BASE_URL}person/${person_id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}



export function displayPerson(data) {
  const movieContent = document.querySelector(".main-person");
  let html = "";
  const { biography, profile_path, name, place_of_birth, birthday, gender, } = data;
  const poster = profile_path
    ? `${BASE_IMG_URL}${profile_path}`
    : DEFAULT_IMG_URL;
 const gen = gender =  1 ? 'Female': 'Male'
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
   ${birthday} 
  </p>
  <p class="py-1">
    <strong class="fw-bold">Place of Birth</strong> <br />
    ${place_of_birth}
  </p>
  <p class="py-1">
    <strong class="fw-bold">Also Known As</strong> <br />
    Ethan Green Hawke
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
  <div class="card-person mt-1">
 <div class="row overflow-scroll">
  <div class="col">
      <div class="card">
        <a href="" class="card-img">
          <img class="card-img-top"
            src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/ai40gM7SUaGA6fthvsd87o8IQq4.jpg"
            alt="Card image cap">
        </a>
        <div class="card-body py-3">
          <a class="card-text text-capitalize">
              Dead Poets Society
          </a>
        </div>
      </div>
    </div>      
 </div>
  </div>
</div>
    `;
  movieContent.innerHTML = html;
}
