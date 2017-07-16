var app = angular.module("ShoesShop", ["ngRoute", "ngSessionStorage", "ngCookies"]);

app.constant("CONSTANTS", {
    SS_SERVER: "http://10.0.0.178:8080",
    sizes: ["5.0","5.5","6.0","6.5","7.0","7.5","8.0","8.5","9.0","9.5","10.0","10.5","11.0","11.5","12.0","12.5","13.0","13.5","14.0","14.5","15.0"],
    SS_VALIDATOR: NT_VALIDATOR,
    itemsPerPageList: [12,16,20,24]
});

app.run(function($rootScope, $cookies, $window, $location, CONSTANTS) {
    $rootScope.$on("$routeChangeStart", function() {
        if($window.location.href.indexOf("/login.html") === -1 && !$cookies.get("jwtToken")) {
            $window.location.href = "/login.html";
        }
        else if($window.location.href.indexOf("/login.html") === -1 && $cookies.get("jwtToken")) {
            var token = $cookies.get("jwtToken");
            var data = {token: token};
            $.ajax({
                method: "POST",
                url: CONSTANTS.SS_SERVER + "/auth/validate",
                data: data,
                success: function(res) {
                    
                },
                error: function(res) {
                    $window.location.href = "/login.html";
                }
            });
        }
    });
});

app.config(function($routeProvider, $httpProvider) {
	$routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: "HomeController"
    })
    .when("/product/list", {
        templateUrl : "views/product_list.html",
        controller: "ProductController"
    })
    .when("/product/create", {
        templateUrl: "views/product_create.html",
        controller: "ProductController"
    })
    .when("/product/update/:id", {
        templateUrl: "views/product_update.html",
        controller: "ProductController"
    })
    .when("/brand/list", {
        templateUrl : "views/brand_list.html",
        controller: "BrandController"
    })
    .when("/brand/create", {
        templateUrl: "views/brand_create.html",
        controller: "BrandController"
    })
    .when("/brand/update/:id", {
        templateUrl: "views/brand_update.html",
        controller: "BrandController"
    })
    .when("/gender/list", {
        templateUrl : "views/gender_list.html",
        controller: "GenderController"
    })
    .when("/gender/create", {
        templateUrl: "views/gender_create.html",
        controller: "GenderController"
    })
    .when("/gender/update/:id", {
        templateUrl: "views/gender_update.html",
        controller: "GenderController"
    })
    .when("/style/list", {
        templateUrl : "views/style_list.html",
        controller: "StyleController"
    })
    .when("/style/create", {
        templateUrl: "views/style_create.html",
        controller: "StyleController"
    })
    .when("/style/update/:id", {
        templateUrl: "views/style_update.html",
        controller: "StyleController"
    })
    .when("/order/list", {
        templateUrl : "views/order_list.html",
        controller: "OrderController"
    })
    .when("/order/create", {
        templateUrl: "views/order_create.html",
        controller: "OrderController"
    })
    .when("/order/update/:id", {
        templateUrl: "views/order_update.html",
        controller: "OrderController"
    })
    .when("/customer/update/:id", {
        templateUrl: "views/customer_update.html",
        controller: "CustomerController"
    })
    .when("/address/update/:id", {
        templateUrl: "views/address_update.html",
        controller: "AddressController"
    })
    .when("/question/list", {
        templateUrl : "views/question_list.html",
        controller: "QuestionController"
    })
    .when("/question/create", {
        templateUrl: "views/question_create.html",
        controller: "QuestionController"
    })
    .when("/question/update/:id", {
        templateUrl: "views/question_update.html",
        controller: "QuestionController"
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
		popUpMessage();
	}

	function popUpMessage() {
		$("#pop-up-message").hide();
	}

	function navbarCollapse() {
		var menu_dropdown = $(".ss-navbar #menu-dropdown");
		var list = menu_dropdown.parent().find("ul");
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
		
		