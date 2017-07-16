app.controller("AddressController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Addresss
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	loadAddress();
	$("#update").click(updateAddress);

	function loadAddress() {
		var id = $routeParams.id;
		$.ajax({
			method: "GET",
			url: CONSTANTS.SS_SERVER + "/api/v1/address/update/" + id, 
			headers: {
				"Authorization":$cookies.get("jwtToken")
			},
			success: function(res) {
				$scope.address = res;
				$scope.$digest();
			}
		});
	}

	function updateAddress() {
		var id = $routeParams.id;
		var valid = validator.validateTheForm("update-address");
		if(valid) {
			$.ajax({
				method: "PUT",
				url: CONSTANTS.SS_SERVER + "/api/v1/address/update/" + id, 
				data: $scope.address,
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