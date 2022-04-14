import * as home from "./home.js";

document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/index.html" || location.pathname === "/") {
    home
      .getPopularTvMovies()
      .then((data) => {
        home.displayPopularTvMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/person.html" || location.pathname === "/person") {
    console.log("Bu person page");
  }
});

import * as topmovies from "./topmovies.js";

document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/movie.html" || location.pathname === "/") {
    topmovies
      .getTopMovies()
      .then((data) => {
        topmovies.displayTopMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // if (location.pathname === "/person.html" || location.pathname === "/person") {
  //   console.log("Bu person page");
  // }
});
import * as person from "./person.js";

document.addEventListener("DOMContentLoaded", function (e) {
  if (location.pathname === "/person.html" || location.pathname === "/") {
    person
      .getTopMovies()
      .then((data) => {
        person.displayTopMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
});