// 84/125
var app = angular.module("ShoesShop", ["ngRoute", "ngSessionStorage", "ngCookies"]);

app.constant("CONSTANTS", {
    SS_SERVER: "http://10.0.0.178:8080",
    sizes: ["5.0","5.5","6.0","6.5","7.0","7.5","8.0","8.5","9.0","9.5","10.0","10.5","11.0","11.5","12.0","12.5","13.0","13.5","14.0","14.5","15.0"],
    SS_VALIDATOR: NT_VALIDATOR,
    itemsPerPageList: [12,16,20,24]
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
		}

		var integerInputs = form.find(".nt-input-integer");
		for(i = 0; i < integerInputs.length; i++) {
			var item = $(integerInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			if(isNaN(value)) {
				err_mess_obj.text("Input must be an integer");
				err_mess_obj.show();
				return false;
			}
			else {
				if(value.indexOf(".")>=0) {
					err_mess_obj.text("Input must be an integer");
					err_mess_obj.show();
					return false;
				}
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
		
		