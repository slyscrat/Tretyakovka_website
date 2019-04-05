$(document).ready(function() {
	if (document.getElementById("hid").innerHTML != "")
	{
		document.getElementById("exch").innerHTML = "Выход";
		document.getElementById("exch").href = "./logout";
	}
});