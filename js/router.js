import * as home from "./home.js";
import * as card from "./card.js";
import { displayMovie, getMovie } from "./movie.js";
import {displayFavMovie, getFavMovie} from "./favmovies.js";
import * as favpersons from "./favperson.js";
import * as topmovies from "./favmovies.js";
let { switchOn } = card;
// switchOn(document);


document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/people.html" || location.pathname === "/people"){
    // console.log(data);
    favpersons
    .getFavPerson()
    .then((data)=>{
      favpersons.displayFavPerson(data)
      console.log(data);
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    home
      .getPopularMovies()
      .then((data) => {
        home.displayPopularMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/person.html" || location.pathname === "/person") {
    
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    home
      .getPopularMovies()
      .then((data) => {
        home.displayPopularMovies(data);
        const cardList = document.querySelectorAll(".card");
        cardList.forEach((card) => {
          card.addEventListener("click", (e) => {
            const id = card.dataset.id;
            history.pushState({ id }, null, `/movie.html`);
            location.reload();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/movie.html" ||  location.pathname === "/movie") {
    // let searchParams = new URLSearchParams(location.search);
    // searchParams.get("id")
    const id = history.state.id;
    console.log(history.state);
    getMovie(id).then((data) => {
      displayMovie(data);
      console.log(data);
    });
  }
  if (location.pathname === "/popularmovie.html" || location.pathname === "/popularmovie") {
    topmovies
      .getTopMovies()
      .then((data) => {
        topmovies.displayTopMovies(data);
        const cardList = document.querySelectorAll(".card");
        cardList.forEach((card) => {
          card.addEventListener("click", (e) => {
            const id = card.dataset.id;
            history.pushState({ id }, null, `/movie.html`);
            location.reload();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/movie.html" || location.pathname === "/movie") {
    // let searchParams = new URLSearchParams(location.search);
    // searchParams.get("id")
    const id = history.state.id;
    console.log(history.state);
    getFavMovie(id).then((data) => {
      displayFavMovie(data);
      console.log(data);
    });
  }
});


