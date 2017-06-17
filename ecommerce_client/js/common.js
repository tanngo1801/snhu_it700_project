$(document).ready(function() {
	// Navbar
	$(".ss-navbar #menu-dropdown").click(navbarCollapse);


	function navbarCollapse(e) {
		var list = $(e.target).parent().parent().find("ul");
		if(list.hasClass("hidden")) {
			list.removeClass("hidden");
		}
		else {
			list.addClass("hidden");
		}
	}
});