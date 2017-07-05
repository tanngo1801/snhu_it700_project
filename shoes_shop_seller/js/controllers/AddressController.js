app.controller("AddressController", function($scope, $window, $location, $sessionStorage, Json_Helper, CONSTANTS, $routeParams) {
	// Addresss
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	loadAddress();
	$("#update").click(updateAddress);

	function loadAddress() {
		var id = $routeParams.id;
		$.get(CONSTANTS.SS_SERVER + "/api/v1/address/update/" + id, function(res) {
			console.log(res);
			$scope.address = res;
			$scope.$digest();
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
				success: function(res) {
					alert("Item updated suscessfully.");
					location.reload();
				}
			});
		}
	}
});