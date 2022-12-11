// Get the modal
var modal = document.getElementById("myModal");
var modal__profile = document.getElementById("profile__myModal");
// var modal__editNFT = document.getElementById("profile__editNFT");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn__profile = document.getElementById("edit__btn");
// var btn__editNFT = document.getElementsByClassName("edit__btnNFT")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span__profile = document.getElementsByClassName("close__profile")[0];
// var span__editNFT = document.getElementsByClassName("close__profile")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
btn__profile.onclick = function() {
  modal__profile.style.display = "block";
}
// btn__editNFT.onclick = function() {
//   modal__editNFT.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span__profile.onclick = function() {
  modal__profile.style.display = "none";
}
// span__profile.onclick = function() {
//   modal__editNFT.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    call();
  
  }
  else if ( event.target == modal__profile){
    modal__profile.style.display = "none";
    callApiAddress();
  }
  // else if ( event.target == modal__editNFT){
  //   modal__editNFT.style.display = "none";
  //   call2();
  // }
}
