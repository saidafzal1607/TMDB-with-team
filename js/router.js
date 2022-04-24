import * as home from "./home.js";
import * as movie from "./movie.js";
import * as person from "./person.js";
import * as favpersons from "./people.js";
import * as topmovies from "./popularmovie.js";
// var popoverTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="popover"]')
// );
// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new bootstrap.Popover(popoverTriggerEl);
// });

// switchOn(document);
window.addEventListener("popstate", (e) => {
  location.reload();
});
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
    movie.getMovie(id).then((data) => {
      movie.displayMovie(data);
      const favBtn = document.querySelector(".favbtn");
      const watchBtn = document.querySelector(".watchbtn");
      const rateBtn = document.querySelector(".ratebtn");
      const starRating = document.querySelector(".star-rating");
      const removeBtn = document.querySelector(".removebtn");
      // favourite, watchlist and rating
      // favourite
      favBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const favoriteBtn = e.target.closest(".favbtn").dataset.favlist;
        const favorite = favoriteBtn == "true" ? true : false;
        movie.AddFavourite(id, favorite).then((data) => {
          if (data.success) {
            e.target.closest(".favbtn").dataset.favlist = !favorite;
          }
        });
      });
      // Watchlist
      watchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const watchlistBtn = e.target.closest(".watchbtn").dataset.watchlist;
        const watchlist = watchlistBtn == "true" ? true : false;
        movie.AddWatchlist(id, watchlist).then((data) => {
          if (data.success) {
            e.target.closest(".watchbtn").dataset.watchlist = !watchlist;
          }
        });
      });
      // Rating
      rateBtn.addEventListener("click", (e) => {
        const ratingBtn = e.target.closest(".ratebtn").dataset.rating;
        starRating.classList.toggle("onRating");
        if (starRating.classList.contains("onRating")) {
          starRating.addEventListener('change', (e) => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              background: '#5FB662',
              iconColor: '#ffffff',
              color: '#ffffff',
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: `SUCCESS!
              Your rating is ${e.target.value} has been saved `
            })
            const rating = e.target.value;
            console.log(rating);
            movie.AddRate(id, rating).then((data) => {
              if (data.success) {
                ratingBtn = rating;
              }
            });
          })
          removeBtn.addEventListener("click", function (e) {
            starRating.querySelector("input[type=radio]:checked").checked = false;
          });
        }
      });
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

    // watchBtn.addEventListener("click", (e) => {
    //   movie.AddWatchlist((data) => {});
    // });
  }
  if (
    location.pathname === "/popularmovie.html" ||
    location.pathname === "/popularmovie"
  ) {
    topmovies.getGenres().then((data) => {
      topmovies.displayGenres(data, document);
      const popMovForm = document.querySelector(".popularMovieSort");
      const genres = document.querySelectorAll(`[name="with_genres"]`);
      popMovForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(popMovForm);
        const with_genres = [];
        genres.forEach((genre) => {
          if (genre.checked) {
            with_genres.push(genre.value);
          }
        });
        formData.append("with_genres", with_genres);
        const query = Object.fromEntries(formData);

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
