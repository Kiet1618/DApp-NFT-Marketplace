// Get the modal
var modal = document.getElementById("myModal");
var modal__profile = document.getElementById("profile__myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn__profile = document.getElementById("edit__btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span__profile = document.getElementsByClassName("close__profile")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
btn__profile.onclick = function() {
  modal__profile.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span__profile.onclick = function() {
  modal__profile.style.display = "none";
  

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal__profile) {
    modal.style.display = "none";
    modal__profile.style.display = "none";
    callApiAddress();
  }
}
// window.onclick = function(event) {
//   if (event.target == modal__profile) {
//     modal__profile.style.display = "none";

//   }
// }