$(document).ready(function() {
	var x = document.getElementsByClassName("one_third first");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i+1].className = "one_third";
        x[i+1].className = "one_third";
    }
});
var prog = document.getElementsByClassName("prog");
var cl = document.getElementsByClassName("fa");
for (i = 0; i < prog.length; i++) {
console.log(prog[i].innerHTML);
	if (prog[i].innerHTML == "Лекторий")
		cl[i].className = "fa fa-ambulance";
	if (prog[i].innerHTML == "Художественная практика")
		cl[i].className = "fa fa-chain-broken";
	if (prog[i].innerHTML == "Экскурсия")
		cl[i].className = "fa fa-area-chart";		
}