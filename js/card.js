let circleBtn = document.getElementsByClassName("threedot-btn");
let cardList = document.getElementsByClassName("card-click");
let body = document.body;

circleBtn[0].addEventListener("click", function () {
  cardList[0].classList.toggle("on");
});

body.addEventListener("click", function (e) {
  e.target.classList.remove("on");
});
