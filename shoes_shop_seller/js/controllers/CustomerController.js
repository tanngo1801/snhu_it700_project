app.controller("CustomerController", function($scope, $window, $location, $sessionStorage, Json_Helper, CONSTANTS, $routeParams) {
	// Customers
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	loadCustomer();
	$("#update").click(updateCustomer);

	function loadCustomer() {
		var id = $routeParams.id;
		$.get(CONSTANTS.SS_SERVER + "/api/v1/customer/update/" + id, function(res) {
			console.log(res);
			$scope.customer = res;
			$scope.$digest();
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
				success: function(res) {
					alert("Item updated suscessfully.");
					location.reload();
				}
			});
		}
	}
});