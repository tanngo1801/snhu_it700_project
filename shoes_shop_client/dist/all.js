var app = angular.module("ShoesShop", ["ngRoute"]);

app.constant("CONSTANTS", {
    SS_SERVER: "http://localhost:8080",
    sizes: [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15]
});

app.config(function($routeProvider) {
	$routeProvider
    .when("/", {
        templateUrl : "views/home.html"
    })
    .when("/list", {
        templateUrl : "views/list.html",
        controller: "ListController"
    })
    .when("/item", {
    	templateUrl : "views/item.html"
    })
    .when("/cart", {
        templateUrl : "views/cart.html"
    })
    .otherwise({
    	redirectTo : "/"
    });
});

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