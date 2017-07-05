app.controller("ListController", function($scope, $window, $location, Json_Helper, CONSTANTS) {
	var filter_json_params = loadParamsFromURL();
	$scope.filter = {};

	loadBrands();
	loadStyles();
	loadSizes();
	loadShoes();
	loadGenders();
	loadPrices();

	$("#gender, #brand, #style, #size").change(filterUpdated);
	$("#pmin, #pmax").blur(function() {
		if($scope.filter.pmin && $scope.filter.pmin.indexOf(".") == -1) {
			$scope.filter.pmin += ".0";
		}
		if($scope.filter.pmax  && $scope.filter.pmax.indexOf(".") == -1) {
			$scope.filter.pmax += ".0";
		}
		$scope.$digest();
		filterUpdated();
	});

	// Functions
	function loadSizes() {
		$scope.sizes = CONSTANTS.sizes;
		$scope.filter.size = filter_json_params.size;
	}

	function loadBrands() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-brands", function(res) {
			$scope.brands = res;
			$scope.filter.brand_id = filter_json_params.brand_id;
			$scope.$digest();
		});
	}

	function loadStyles() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-styles", function(res) {
			$scope.styles = res;
			$scope.filter.type_id = filter_json_params.type_id;
			$scope.$digest();
		});
	}

	function loadGenders() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-genders", function(res) {
			$scope.genders = res;
			$scope.filter.gender_id = filter_json_params.gender_id;
			$scope.$digest();
		});
	}

	function loadPrices() {
		$scope.filter.pmin = filter_json_params.pmin;
		$scope.filter.pmax = filter_json_params.pmax;	
	}

	function loadParamsFromURL() {
		var url = $window.location.href;
		var res = Json_Helper.urlParamsToJson(url); 

		return res;
	}

	function filterUpdated(e) {
		var filter_inputs = $scope.filter;
		filter_inputs = Json_Helper.jsonToUrlParams(filter_inputs);
		$window.location.href = "#!/list?" + filter_inputs;
	}

	function loadShoes() {
		var url = $window.location.href;
		var filter_inputs = "";

		if(url.indexOf("?") != -1) {
			filter_inputs = url.substring(url.indexOf("?")+1);
		}
		$.get(CONSTANTS.SS_SERVER + "/filter-shoes?" + filter_inputs, function(res) {
			$scope.shoes = res.shoes;
			$scope.$digest();
		});
	}
});