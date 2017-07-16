app.controller("AuthenticationController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	var validator = CONSTANTS.SS_VALIDATOR;
	logout();
	validator.init();
	$("#signin").click(login);

	// Functions
	function logout() {
		$cookies.remove("jwtToken");
	}

	function login() {
		var u = $scope.user;
		var valid = validator.validateTheForm("login-form");

		if(valid) {
			$.ajax({
				method: "POST",
				url: CONSTANTS.SS_SERVER + "/auth/login",
				data: u
			}).done(
				function(res) {
					$cookies.put("jwtToken", res);
					$window.location.href="/";
				}
			).fail(function(res) {
				var message = JSON.parse(res.responseText).message;
				alert(message);
			});
		}
	}	
});