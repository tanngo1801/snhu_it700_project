$(document).ready(function() {
	init();

	function init() {
		navbarCollapse();
		updateCartStatus();
		popUpMessage();
	}

	function popUpMessage() {
		$("#pop-up-message").hide();
	}

	function navbarCollapse() {
		var menu_dropdown = $(".ss-navbar #menu-dropdown");
		var list = menu_dropdown.parent().find("ul");
	}

	function updateCartStatus() {
		var cart = getCookie("cart");

		if(!cart) {
			$("#cart-status").text(0);
		}
		else {
			$("#cart-status").text(JSON.parse(cart).length);
		}
	}

	function getCookie(cname) {
    	var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}
});