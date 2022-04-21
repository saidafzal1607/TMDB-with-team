import * as home from "./home.js";
import * as card from "./card.js";
import * as profile from "./profile.js";
import { displayMovie, getMovie } from "./movie.js";
import { displayPerson } from "./person.js";
import { displayPersonOfMovies } from "./personofmovies.js";
import * as person from "./person.js";
import * as favpersons from "./people.js";
import * as topmovies from "./popularmovie.js";
import * as personofmovies from "./personofmovies.js";
let { switchOn } = card;
// var popoverTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="popover"]')
// );
// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new bootstrap.Popover(popoverTriggerEl);
// });

// switchOn(document);

document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/people.html" || location.pathname === "/people") {
    favpersons
      .getFavPerson()
      .then((data) => {
        favpersons.displayFavPerson(data);
        const cardPersons = document.querySelectorAll(".card");
        cardPersons.forEach((card) => {
          card.addEventListener("click", (e) => {
            const personid = card.dataset.id;
            history.pushState({ personid }, null, `/person.html`);
            location.reload();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/person.html" || location.pathname === "/person") {
    const personid = history.state.personid;
    person.getPerson(personid).then((data) => {
      displayPerson(data);
    });
    // get Person of movies
    personofmovies.getPersonOfMovies(personid).then((data) => {
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
    home
      .getPopularTVMovies()
      .then((data) => {
        home.displayPopularTVMovies(data);
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
    // home
    // .getLatestMovies()
    // .then((data) => {
    //   console.log("salom");
    //   home.displayLatestMovies(data);
    //   const cardList = document.querySelectorAll(".card");
    //   console.log(cardList, "topilmadi");
    //   cardList.forEach((card) => {
    //     card.addEventListener("click", (e) => {
    //       const id = card.dataset.id;
    //       history.pushState({ id }, null, `/movie.html`);
    //       location.reload();
    //     });
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
  if (location.pathname === "/movie.html" || location.pathname === "/movie") {
    const id = history.state.id;
    const popid = history.state.popid;
    getMovie(id).then((data) => {
      displayMovie(data);
    });
    topmovies.getFavMovie(popid).then((data) => {
      topmovies.displayFavMovie(data);
    });
  }
  if (
    location.pathname === "/popularmovie.html" ||
    location.pathname === "/popularmovie"
  ) {
    const popMovForm = document.querySelector(".popularMovieSort");
    popMovForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = Object.fromEntries(new FormData(popMovForm));

      topmovies
        .discoverPopularMovie(query)
        .then((data) => {
          
            topmovies.sortMovies(data);
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
    });
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
});
