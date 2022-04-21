import * as home from "./home.js";
import * as card from "./card.js";
import * as profile from "./profile.js";
import * as movie from "./movie.js";
import * as person from "./person.js";
import * as favpersons from "./people.js";
import * as topmovies from "./popularmovie.js";
import { data } from "autoprefixer";
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
    const actorId = history.state.actorId;
    person.getPerson(personid).then((data) => {
      person.displayPerson(data);
      const cardListMovies = document.querySelectorAll(".card");
      cardListMovies.forEach((card) => {
        card.addEventListener("click", (e) => {
          const personMovieId = card.dataset.id;
          history.pushState({ personMovieId }, null, `/movie.html`);
          location.reload();
        });
      });
    });
    // get Person of movies
    person.getPersonOfMovies(personid).then((data) => {
      person.displayPersonOfMovies(data);
    });

    movie.getMoviePerson(actorId).then((data) => {
      movie.displayMoviePerson(data);
    });
      // get Person of movies
    movie.getMoviePersonOfMovies(actorId).then((data) => {
      movie.displayMoviePersonOfMovies(data);
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
    const personMovieId = history.state.personMovieId;
    const favBtn = document.querySelector(".favbtn");
    const watchBtn = document.querySelector(".watchbtn");
    movie.getMovie(id).then((data) => {
      movie.displayMovie(data);
    });
    movie.getMovieActors(id).then((data) => {
      movie.displayMovieActors(data);
      const cardListActors = document.querySelectorAll(".card-actor");
      cardListActors.forEach((card) => {
        card.addEventListener("click", (e) => {
          const actorId = card.dataset.id;
          history.pushState({ actorId }, null, `/person.html`);
          location.reload();
        });
      });
    });
    movie.getMovieRecommendations(id).then((data) => {
      movie.displayMovieRecommendations(data);
    });

    // favourite and watchlist 
    favBtn.addEventListener("click", (e) => {
      movie.AddFavourite((data)=>{
          
      })
    });
    watchBtn.addEventListener("click", (e) => {
      movie.AddWatchlist((data)=>{

      })
    });
         

    //  adit from popular movie  
    topmovies.getFavMovie(popid).then((data) => {
      topmovies.displayFavMovie(data);
    });
    topmovies.getFavMovieActors(popid).then((data) => {
      topmovies.displayFavMovieActors(data);
    });
    topmovies.getFavMovieRecommendations(popid).then((data) => {
      topmovies.displayFavMovieRecommendations(data);
    });
    //  adit from person
    person.getMoviePerson(personMovieId).then((data) => {
      person.displayMoviePerson(data);
    });
    person.getMovieActorsPerson(personMovieId).then((data) => {
      person.displayMovieActorsPerson(data);
    });
    person.getMoviePersonRecommendations(personMovieId).then((data) => {
      person.displayMoviePersonRecommendations(data);
    });

  }
  if ( location.pathname === "/popularmovie.html" || location.pathname === "/popularmovie") {
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
