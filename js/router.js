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


