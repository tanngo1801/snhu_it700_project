app.controller("CustomerController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Customers
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	loadCustomer();
	$("#update").click(updateCustomer);

	function loadCustomer() {
		var id = $routeParams.id;
		$.ajax({
			method: "GET",
			url: CONSTANTS.SS_SERVER + "/api/v1/customer/update/" + id, 
			headers: {
				"Authorization":$cookies.get("jwtToken")
			},
			success: function(res) {
				$scope.customer = res;
				$scope.$digest();
			}
		});
	}

	function updateCustomer() {
		var id = $routeParams.id;
		var valid = validator.validateTheForm("update-customer");
		if(valid) {
			$.ajax({
				method: "PUT",
				url: CONSTANTS.SS_SERVER + "/api/v1/customer/update/" + id, 
				data: $scope.customer,
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
});