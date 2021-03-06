app.controller("ItemController", function($scope, $window, $location, Json_Helper, CONSTANTS, $cookies) {
	var validator = CONSTANTS.SS_VALIDATOR;
	var url = $window.location.href;
	var params = Json_Helper.urlParamsToJson(url);

	init();
	validator.init();
	loadSizes();
	loadTheShoes(params.id);
	$("#submit").click(addToCart);
	$("#continue-shopping").click(function() {
		$(".ss-popup").fadeOut();
		$window.location.href = "/#gender";
	});
	$("#checkout").click(function() {
		$window.location.href = "#!/cart";
	});

	// Functions
	function init() {
		$("#ss-navbar-collapse-trigger").prop("checked", false);
	}
	
	function loadTheShoes(id) {
		$.get(CONSTANTS.SS_SERVER + "/find-the-shoes?id="+id, function(res) {
			$scope.shoes = res;
			$scope.$digest();
		});
	}

	function loadSizes() {
		$scope.sizes = CONSTANTS.sizes;
	}

	function addToCart() {
		var valid = validator.validateTheForm("order");

		if(valid) {
			var cart = $cookies.get("cart");
			var order_details, order_detail;

			if(!cart) {
				order_details = [];
				order_detail = $scope.order;
				order_detail.product = $scope.shoes;
				order_details.push(order_detail);

				var now = new Date();
				var nowTime = now.getTime();
				var nextHour = nowTime + 60*60*1000;
				var expire = new Date(nextHour);
				// document.cookie = "cart.tans.com=" + JSON.stringify(order_details) + "; expires=" + nextHour + "; path=/";
				$cookies.put("cart", JSON.stringify(order_details), {'expires': expire});
			}
			else {
				order_details = JSON.parse(cart);

				order_detail = $scope.order;
				order_detail.product = $scope.shoes;

				order_details.push(order_detail);

				var now = new Date();
				var nowTime = now.getTime();
				var nextHour = nowTime + 60*60*1000;
				var expire = new Date(nextHour);
				// document.cookie = "cart.tans.com=" + JSON.stringify(order_details) + "; expires=" + nextHour + "; path=/";
				$cookies.put("cart", JSON.stringify(order_details), {'expires': expire});
			}

			$("#cart-status").text(order_details.length);
			$("body").animate({
				scrollTop: $("#cart").offset().top + $("#card").height()
			});

			$(".ss-popup").show();
		}
	}
});