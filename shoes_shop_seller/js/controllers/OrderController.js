app.controller("OrderController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Orders
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List orders
	if($location.path().indexOf("/order/list") >= 0) {
		loadItemsPerPageList();
		loadOrders();
		paginationInit();

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadOrders() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/order/list",
				data: filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.orders = res.orders;
					$scope.page = json_filter_inputs.page | 0;
					$scope.itemsPerPage = json_filter_inputs.itemsPerPage ? json_filter_inputs.itemsPerPage : '12';
					$scope.maxPage = res.maxPage;
					$scope.$digest();
				}
			});
		}


		function paginationInit() {
			$(".ss-pagination #page-button").click(paginationUpdated);
			$(".ss-pagination #itemsPerPage").change(paginationUpdated);
			$(".ss-pagination #next").click(function() {
				var page = parseInt($("#page").val())+1;
				$("#page").val(page);
				paginationUpdated();
			});
			$(".ss-pagination #back").click(function() {
				var page = parseInt($("#page").val())-1;
				$("#page").val(page);
				paginationUpdated();
			});
		}

		function paginationUpdated() {
			if($("#page").val() <= $scope.maxPage && $("#page").val() >= 0) {
				var path = $location.path();
				$window.location.href = "#!" + path + "?page=" + $("#page").val() + "&itemsPerPage=" + $("#itemsPerPage").val();
			}
			else if($("#page").val() < 0) {
				$("#page").val(0);
			}
			else {
				$("#page").val($scope.maxPage);
			}
		}
	}
	else if($location.path().indexOf("/order/update") >= 0) {
		findOrderById();
		loadStatuses();

		$("#update").click(updateOrder);		

		function findOrderById() {
			var id = $routeParams.id;
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/order/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.order = {};
					$scope.order.id = res.id;
					$scope.order.paypal_id = res.paypalId;
					$scope.order.amount = res.amount;
					$scope.order.status_id = res.status.id + "";
					$scope.order.customer_id = res.customer.id;
					$scope.$digest();
				}
			});
		}

		function loadStatuses() {
			$.get(CONSTANTS.SS_SERVER + "/ajax-get-statuses", function(res) {
				$scope.statuses = res;
				$scope.$digest();
			});
		}

		function updateOrder() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-order");

			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/order/update/" + id, 
					data: $scope.order,
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						alert("Item updated suscessfully.");
						location.reload();
					}
				});
			}
		}
	}
})