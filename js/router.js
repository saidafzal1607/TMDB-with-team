import * as home from "./home.js";
import * as movie from "./movie.js";
import * as person from "./person.js";
import * as favpersons from "./people.js";
import * as topmovies from "./popularmovie.js";
import {
  displaySearchResults,
  fetchSearchMovie,
} from "./search.js";
import * as profile from "./profile.js"
// import * as modalVideo from "../node_modules/modal-video/js/modal-video";
// var popoverTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="popover"]')
// );
// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new bootstrap.Popover(popoverTriggerEl);
// });

window.addEventListener("popstate", (e) => {
  location.reload();
});
document.addEventListener("DOMContentLoaded", function (e) {
  // card.switchOn(document);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 10000,
    background: "#5FB662",
    iconColor: "#ffffff",
    color: "#ffffff",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  if (location.pathname === "/people.html" || location.pathname === "/people") {
    favpersons
      .getFavPerson()
      .then((data) => {
        favpersons.displayFavPerson(data);
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);
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
    person
    .getPerson(personid?personid:actorId)
    .then((data) => {
      person.displayPerson(data);
      const loading = document.querySelector(".lds-dual-ring");
      document.body.removeChild(loading);
     })
     .catch((err) => {
      const loading = document.querySelector(".lds-dual-ring");
      document.body.removeChild(loading);
      Toast.fire({
        icon: "error",
        title: `${err.message}`,
      });
    });
    // get Person of movies
    person.getPersonOfMovies(personid?personid:actorId).then((data) => {
      person.displayPersonOfMovies(data);
    });
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    home
      .getPopularTVMovies()
      .then((data) => {
        home.displayPopularTVMovies(data);
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);

        home.displayPopularMovies(data);
        home.searchMovieHandler(location, history);

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
      .getPopularTheatres()
        .then((data) => {
        home.displayPopularTheatres(data);
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
      .getTopRated()
      .then((data) => {
        home.displayTopRated(data);
        const topRated = document.querySelectorAll(".card");
        topRated.forEach((card) => {
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
  if (location.pathname === "/movie.html" || location.pathname === "/movie") {
    const id = history.state.id;
    movie
      .getMovie(id)
      .then((data) => {
        movie.displayMovie(data);
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);
        const favBtn = document.querySelector(".favbtn");
        const watchBtn = document.querySelector(".watchbtn");
        const rateBtn = document.querySelector(".ratebtn");
        const starRating = document.querySelector(".star-rating");
        let Stars = document.querySelectorAll(".star");
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
        let {
          rated: { value },
        } = data;
        let StarsArr = Array.from(Stars);
        let StarsArrSort = StarsArr.reverse();
        for (let i = 0; i < value; i++) {
          StarsArrSort[i].classList.add("checked");
        }
        rateBtn.addEventListener("click", (e) => {
          starRating.classList.toggle("onRating");
          if (starRating.classList.contains("onRating")) {
            starRating.addEventListener("change", (e) => {
              const rating = e.target.value;
              Toast.fire({
                icon: "success",
                title: `SUCCESS!
              Your rating is ${rating} has been saved `,
              });
              console.log(rating, "rating value");
              movie.AddRate(id, rating).then((data) => {
                if (data.success) {
                  value = rating;
                }
              });
            });
            removeBtn.addEventListener("click", function (e) {
              starRating.querySelector(
                "input[type=radio]:checked"
              ).checked = false;
            });
          }
        });
      })
      .catch((err) => {
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);
        Toast.fire({
          icon: "error",
          title: `${err.message}`,
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
  }
  if (
    location.pathname === "/profile.html" ||
    location.pathname === "profile"
  ) {
    profile
      .getDetailAccount()
      .then((data) => {
        profile.displayDetailAccount(data);
        //   const cardList = document.querySelectorAll(".card");
        // cardList.forEach((card) => {
        //   card.addEventListener("click", (e) => {
        //     const id = card.dataset.id;
        //     history.pushState({ id }, null, `/movie.html`);
        //     location.reload();
        //   });
        // });
      })
      .catch((err) => {
        console.log(err);
      });
    profile
      .getFavMovieAccount()
      .then((data) => {
        profile.displayFavMovieAccount(data);
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
    profile
      .getRating()
      .then((data) => {
        profile.displayRating(data);
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);
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

    // topmovies
    //   .getTopMovies()
    //   .then((data) => {
    //     topmovies.displayTopMovies(data);
    //     const cardList = document.querySelectorAll(".card");
    //     cardList.forEach((card) => {
    //       card.addEventListener("click", (e) => {
    //         const popid = card.dataset.id;
    //         history.pushState({ popid }, null, `/movie.html`);
    //         location.reload();
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    topmovies
      .getPopularFavMovies()
      .then((data) => {
        topmovies.searchHandler();

        topmovies.displayPopularFavMovies(data);
        const loading = document.querySelector(".lds-dual-ring");
        document.body.removeChild(loading);
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
  if (location.pathname === "/search.html") {
    const loading = document.querySelector(".lds-dual-ring");
    document.body.removeChild(loading);
    console.log(history.state, "salom");
    fetchSearchMovie(history.state.query, history.state?.page).then((data) => {
      console.log(data, "Search");
      displaySearchResults(data);
    });



  }
});

