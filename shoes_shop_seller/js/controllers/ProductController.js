app.controller("ProductController", function($scope, $window, $location, $sessionStorage, Json_Helper, CONSTANTS, $routeParams) {
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

			$.get(CONSTANTS.SS_SERVER + "/api/v1/product/list?" + filter_inputs, function(res) {
				$scope.shoes = res.shoes;
				$scope.page = json_filter_inputs.page | 0;
				$scope.itemsPerPage = json_filter_inputs.itemsPerPage ? json_filter_inputs.itemsPerPage : '10';
				$scope.maxPage = res.maxPage;
				$scope.$digest();
			});
		}

		function productDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/product/delete/"+id, 
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
			$.get(CONSTANTS.SS_SERVER + "/ajax-get-brands", function(res) {
				$scope.brands = res;
				$scope.$digest();
			});
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

		function createProduct() {
			var valid = validator.validateTheForm("create-product");
			if(valid) {
				$.post(CONSTANTS.SS_SERVER + "/api/v1/product/create", $scope.product, function(res) {
					$window.location.href = "#!/products";
				});
			}
		}
	}
	else if($location.path().indexOf("/product/update") >= 0) {
		findShoesById();

		$("#update").click(updateProduct);		

		function findShoesById() {
			var id = $routeParams.id;
			$.get(CONSTANTS.SS_SERVER + "/api/v1/product/update/" + id, function(res) {
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
			$.get(CONSTANTS.SS_SERVER + "/ajax-get-brands", function(res) {
				$scope.brands = res;
				$scope.$digest();
			});
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
	}
});