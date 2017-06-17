app.controller("ListController", function($scope, CONSTANTS) {
	loadBrands();
	loadStyles();
	loadSizes();
	loadShoes();
	loadGenders();

	// Functions
	function loadSizes() {
		$scope.sizes = CONSTANTS.sizes;
	}

	function loadBrands() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-brands", function(res) {
			$scope.brands = res;
		});
	}

	function loadStyles() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-styles", function(res) {
			$scope.styles = res;
		});
	}

	function loadGenders() {
		$.get(CONSTANTS.SS_SERVER + "/ajax-get-genders", function(res) {
			$scope.genders = res;
		});
	}

	function loadShoes() {
		$.get(CONSTANTS.SS_SERVER + "/filter-shoes", filterShoes);
	}

	function filterShoes(res) {
		
	}
});