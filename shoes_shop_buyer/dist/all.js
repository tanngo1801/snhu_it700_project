var app = angular.module("ShoesShop", ["ngRoute", "ngSessionStorage", "ngCookies"]);

app.constant("CONSTANTS", {
    SS_SERVER: "http://localhost:8080",
    sizes: [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15],
    SS_VALIDATOR: NT_VALIDATOR
});

app.config(function($routeProvider) {
	$routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: "HomeController"
    })
    .when("/list", {
        templateUrl : "views/list.html",
        controller: "ListController"
    })
    .when("/item", {
    	templateUrl : "views/item.html",
        controller: "ItemController"
    })
    .when("/cart", {
        templateUrl : "views/cart.html",
        controller: "CartController"
    })
    .when("/payment-succeeded", {
        templateUrl: "views/payment_succeeded.html"
    })
    .otherwise({
    	redirectTo : "/"
    });
});

app.service("Json_Helper", function() {
    this.urlParamsToJson = function(url) {
        if(url.indexOf("?")==-1) {
            return {};
        }
        else {
            var url_params = url.substring(url.indexOf("?")+1);
            var url_json_params = '{"' + url_params.replace(/=/g, '":"').replace(/&/g, '","') + '"}';
            url_json_params = JSON.parse(url_json_params);
            return url_json_params;
        }
        
    }

    this.jsonToUrlParams = function(json) {
        var temp = json;

        // Removed unselected options
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var val = json[key];
                if(!val) {
                    delete temp[key];
                }
            }
        }


        var json_string = JSON.stringify(temp);
        var url_string = json_string.replace(/{/g, "")
                                    .replace(/}/g, "")
                                    .replace(/"/g, "")
                                    .replace(/:/g, "=")
                                    .replace(/,/g, "&");
        return url_string;
    }
});

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
var NT_VALIDATOR = {
	init: function() {
		$(".nt-validation-error").hide();
	},
	validateTheForm: function(form_id) {
		var form = $("#" + form_id);

		var requiredInputs = form.find(".nt-input-required");
		for(i = 0; i < requiredInputs.length; i++) {
			var item = $(requiredInputs[i]);
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);

			if(!item.val()) {
				err_mess_obj.text("Input required!");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		var rangeInputs = form.find(".nt-input-range");
		for(i = 0; i < rangeInputs.length; i++) {
			var item = $(rangeInputs[i]);
			var min = item.attr("nt-min");
			var max = item.attr("nt-max");
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);

			if(parseInt(item.val()) < min || parseInt(item.val()) > max) {
				err_mess_obj.text("Input must be between " + min + " and " + max + "!");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		var numberInputs = form.find(".nt-input-number");
		for(i = 0; i < numberInputs.length; i++) {
			var item = $(numberInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			if(isNaN(value)) {
				err_mess_obj.text("Input must be a number");
				err_mess_obj.show();
				return false;
			}
			else {
				
			}
		}

		var emailInputs = form.find(".nt-input-email");
		for(i = 0; i < emailInputs.length; i++) {
			var item = $(emailInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			var pattern = /(.+)@(.+){2,}\.(.+){2,}/;
			if( !pattern.test(value) ) {
				err_mess_obj.text("Input must be an email");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		return true;
	}
};	
		
		