app.controller("ProductController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams, $http) {
	// Products
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List products
	if($location.path().indexOf("/product/list") >= 0) {
		loadItemsPerPageList();
		loadShoes();
		paginationInit();

		$scope.productDelete = productDelete;

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadShoes() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/product/list",
				data: json_filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.shoes = res.shoes;
					$scope.page = json_filter_inputs.page | 0;
					$scope.itemsPerPage = json_filter_inputs.itemsPerPage ? json_filter_inputs.itemsPerPage : '12';
					$scope.maxPage = res.maxPage;
					$scope.$digest();
				}
			});
		}

		function productDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/product/delete/"+id, 
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					if(res===true) {
						alert("Item deleted successfully.");
						location.reload();
					}
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
	else if($location.path().indexOf("/product/create") >= 0) {
		loadStyles();
		loadGenders();
		loadSizes();
		loadBrands();

		$("#create").click(createProduct);

		function loadSizes() {
			$scope.sizes = CONSTANTS.sizes;
		}

		function loadBrands() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-brands",
				success: function(res) {
					$scope.brands = res;
					$scope.$digest();
				}
			});
		}

		function loadStyles() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-styles",
				success: function(res) {
					$scope.styles = res;
					$scope.$digest();
				}
			});
		}

		function loadGenders() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-genders",
				success: function(res) {
					$scope.genders = res;
					$scope.$digest();
				}
			});
		}

		function createProduct() {
			var valid = validator.validateTheForm("create-product");
			if(valid) {
				$.ajax({
					method: "POST",
					url: CONSTANTS.SS_SERVER + "/api/v1/product/create",
					data: $scope.product,
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						$window.location.href = "#!/product/list";
					}
				});
			}
		}
	}
	else if($location.path().indexOf("/product/update") >= 0) {
		findShoesById();

		$("#update").click(updateProduct);		

		function findShoesById() {
			var id = $routeParams.id;

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/product/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					res.type = res.type.id+"";
					res.gender = res.gender.id+"";
					res.brand = res.brand.id+"";
					res.size = res.size+"";
					res.activated = res.activated+"";
					$scope.product = res;

					loadStyles();
					loadGenders();
					loadSizes();
					loadBrands();
				}
			});
		}

		function updateProduct() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-product");
			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/product/update/" + id,
					data: $scope.product,
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

		function loadSizes() {
			$scope.sizes = CONSTANTS.sizes;
		}

		function loadBrands() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-brands",
				success: function(res) {
					$scope.brands = res;
					$scope.$digest();
				}
			});
		}

		function loadStyles() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-styles",
				success: function(res) {
					$scope.styles = res;
					$scope.$digest();
				}
			});
		}

		function loadGenders() {
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/ajax-get-genders",
				success: function(res) {
					$scope.genders = res;
					$scope.$digest();
				}
			});
		}
	}
});