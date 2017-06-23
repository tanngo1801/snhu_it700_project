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
