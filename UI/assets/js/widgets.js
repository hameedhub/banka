//nav toggle..
const toggle = () =>{
	document.querySelector('.sidebar').classList.toggle('active');
}
//collapsible bar..
let col = document.getElementsByClassName("collapsible");
let i;
for (i = 0; i < col.length; i++) {
  col[i].addEventListener("click", function() {
    this.classList.toggle("activeCol");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
 //filter search
 const search =()=> {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.querySelector('#myInput');
  filter = input.value.toUpperCase();
  ul = document.querySelector("#myUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
//model forget password
let modal = document.querySelector('#myModal');
let btn = document.querySelector("#myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = () => {
  modal.style.display = "block";
}
span.onclick = () => {
  modal.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
