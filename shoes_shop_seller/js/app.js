var app = angular.module("ShoesShop", ["ngRoute", "ngSessionStorage", "ngCookies"]);

app.constant("CONSTANTS", {
    SS_SERVER: "http://localhost:8080",
    sizes: [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15],
    SS_VALIDATOR: NT_VALIDATOR,
    itemsPerPageList: [10,15,20,25]
});

app.config(function($routeProvider) {
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
    .when("/login", {
        templateUrl: "views/login.html",
        controller: "AuthenticationController"
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
