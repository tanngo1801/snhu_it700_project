app.controller("HomeController", function($scope, $window, $location, Json_Helper, CONSTANTS, $cookies) {
	var validator = CONSTANTS.SS_VALIDATOR;
	$scope.filter = {};

	loadGenders();
	loadStyles();
	loadSizes();
	$("#send").click(sendQuestion);
	$("#search").click(searchShoes);

	// Functions
	function sendQuestion() {
		var valid = validator.validateTheForm("question");
		if(valid) {
			var question = $scope.form;
			$.ajax({
				url: CONSTANTS.SS_SERVER + "/send-question",
				method: "POST",
				data: JSON.stringify(question),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(res) {
					$scope.question = res;
					$scope.$digest();
					$(".ss-popup").show().delay(3000).fadeOut();
				}
			})
		}
	}

	function loadStyles() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-styles", function(res) {
			$scope.styles = res;
			$scope.$digest();
		});
	}

	function loadGenders() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-genders", function(res) {
			$scope.genders = res;
			$scope.$digest();
		});
	}

	function loadSizes() {
		$scope.sizes = CONSTANTS.sizes;
	}

	function searchShoes() {
		var filter_inputs = $scope.filter;
		filter_inputs = Json_Helper.jsonToUrlParams(filter_inputs);

		$window.location.href = "#!/list?" + filter_inputs;
	}
});