import * as home from "./home.js";
import * as card from "./card.js";
import { displayMovie, getMovie } from "./movie.js";
let { circleBtn, cardList, body, switchOn } = card;

document.addEventListener("DOMContentLoaded", function (e) {
  // switchOn()
  if (location.pathname === "/index.html" || location.pathname === "/") {
    home
      .getPopularMovies()
      .then((data) => {
        home.displayPopularMovies(data);
        const cardList = document.querySelectorAll(".card");
        cardList.forEach((card) => {
          card.addEventListener("click", (e) => {
            const id = card.dataset.id;
            history.pushState({ id }, null, `/detailsmovie.html`);
            location.reload();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (location.pathname === "/person.html" || location.pathname === "/person") {
    console.log("Bu person page");
  }
  if (
    location.pathname === "/detailsmovie.html" ||
    location.pathname === "/movie"
  ) {
    // let searchParams = new URLSearchParams(location.search);
    // searchParams.get("id")
    const id = history.state.id;
    console.log(history.state);
    getMovie(id).then((data) => {
      displayMovie(data);
      console.log(data);
    });
  }
});
