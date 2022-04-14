export let circleBtn = document.getElementsByClassName("threedot-btn");
export let cardList = document.getElementsByClassName("card-click");
export let body = document.body;


export default function switchOn() { 
    
  circleBtn[0].addEventListener("click", function () {
    cardList[0].classList.toggle("on");
  });
   
   body.addEventListener("click", function (e) {
    e.target.classList.remove("on");
  });

}