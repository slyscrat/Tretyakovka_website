$(document).ready(function() {
	var x = document.getElementsByClassName("bg-pic");
    var i;
    for (i = 0; i < x.length; i= i+3) {
        x[i+1].src = "./images/b2.jpg";
        x[i+2].src = "./images/b3.jpg";
    }
	
});
var z = document.getElementsByClassName("itemLinks");
var f_width = document.documentElement.clientWidth;
  for (var i = 0; i < z.length; i++) {
	var f_size = 500;
	if (f_width >= 550 && f_width <= 900)
		f_size = 300;
	var f_num = 0 - i*f_size;
	var f_pos = f_num.toString() + "px";
	z[i].setAttribute("data-pos", f_pos);
}
window.addEventListener('resize', function(event){
  var width = document.documentElement.clientWidth;
  for (var i = 0; i < z.length; i++) {
	var size = 500;
	if (width >= 550 && width <= 900)
		size = 300;
	var num = 0 - i*size;
	var pos = num.toString() + "px";
	z[i].setAttribute("data-pos", pos);
}
});



var links = document.querySelectorAll(".itemLinks");
var wrapper = document.getElementById("slide");
 
// activeLink обеспечивает метку для активного элемента
var activeLink = 0;
 
// устанавливаем отслеживание событий
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);
 
    // определяем элемент для activeLink
    link.itemID = i;
}
 
// устанавливаем первый элемент в качестве активного
links[activeLink].classList.add("active");
 
function setClickedItem(e) {
    removeActiveLinks();
 
    var clickedLink = e.target;
    activeLink = clickedLink.itemID;
 
    changePosition(clickedLink);
}
 
function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}
 
// Обработчик изменяет позицию слайдера, после того, как мы убедились,
// что в качестве активной обозначена нужная нам ссылка.
function changePosition(link) {
    link.classList.add("active");
 
    var position = link.getAttribute("data-pos");
    wrapper.style.top = position;
}

function up() {
    var arr = document.getElementsByClassName("pic-info");
	for (var i = 0; i < arr.length; i++) {
		arr[i].style = "display: block;"
	}
}
function down() {
    var arr = document.getElementsByClassName("pic-info");
	for (var i = 0; i < arr.length; i++) {
		arr[i].style = "display: none;"
	}
}