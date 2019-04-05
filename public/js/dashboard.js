converse.initialize({
				bosh_service_url: 'https://conversejs.org/http-bind/',
				show_controlbox_by_default: true
			});
			$(document).ready(function() {
				console.log(1);
				if (document.getElementById("img").src == location.href)
					document.getElementById("img").src = "./images/bk.jpg";
					console.log(document.getElementById("role").innerHTML);
				if (document.getElementById("role").innerHTML == "user")
					document.getElementById("role").innerHTML = "Статус: пользователь";
				if (document.getElementById("role").innerHTML == "admin")
					document.getElementById("role").innerHTML = "Статус: администратор";
				if (document.getElementById("role").innerHTML == "guide")
					document.getElementById("role").innerHTML = "Статус: экскурсовод";
			});