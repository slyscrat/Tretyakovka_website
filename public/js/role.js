$(document).ready(function() {
	var role = document.getElementById("role").innerHTML;
	if (role == "user" || role == "")
		document.getElementById("container").style = "display: none;";
});