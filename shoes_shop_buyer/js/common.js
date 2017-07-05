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
		var cart = document.cookie;

		if(!cart) {
			$("#cart-status").text(0);
		}
		else {
			cart = cart.split("=")[1];
			var order_details = JSON.parse(cart);
			$("#cart-status").text(order_details.length);
		}
	}
});