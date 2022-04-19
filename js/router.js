import * as home from "./home.js";
import * as card from "./card.js";
import { displayMovie, getMovie } from "./movie.js";
import {displayPerson, getPerson} from "./person.js";
import {displayPersonOfMovies, getPersonOfMovies} from "./personofmovies.js";
import {displayFavMovie, getFavMovie} from "./favmovies.js";
import * as person from "./person.js";
import * as movie from "./movie.js";
import * as favpersons from "./favperson.js";
import * as topmovies from "./favmovies.js";
import * as personofmovies from "./personofmovies.js";
let { switchOn } = card;
// switchOn(document);


document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/people.html" || location.pathname === "/people"){
    favpersons
    .getFavPerson()
    .then((data)=>{
      favpersons.displayFavPerson(data)
      const cardPersons = document.querySelectorAll(".card");
      cardPersons.forEach((card) => {
        card.addEventListener("click", (e) => {
          const personid = card.dataset.id;
          history.pushState({ personid }, null, `/person.html`);
          location.reload();
        });
      });
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  if (location.pathname === "/person.html" ||  location.pathname === "/person") { 
    const personid = history.state.personid;
    person.
    getPerson(personid).then((data) => {
      displayPerson(data);
    });
    // get Person of movies
    personofmovies.
    getPersonOfMovies(personid).then((data) => {
      displayPersonOfMovies(data);
    });
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
    const id = history.state.id;
    const popid = history.state.popid;
    getMovie(id).then((data) => {
      displayMovie(data);
     
    });
    getFavMovie(popid).then((data) => {
      displayFavMovie(data);
     
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
            const popid = card.dataset.id;
            history.pushState({ popid }, null, `/movie.html`);
            location.reload();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/movie.html" || location.pathname === "/movie") {

    getFavMovie(popid).then((data) => {
      displayFavMovie(data);
      console.log(data);
    });
  }
});


