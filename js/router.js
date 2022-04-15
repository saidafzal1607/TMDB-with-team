import * as home from "./home.js";
import * as card from "./card.js";
let { switchOn } = card;


 

document.addEventListener("DOMContentLoaded", function (e) {
  switchOn(document);
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
    console.log("Bu person page");
  }
});

