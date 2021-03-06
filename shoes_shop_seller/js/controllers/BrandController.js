app.controller("BrandController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Brands
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List brands
	if($location.path().indexOf("/brand/list") >= 0) {
		loadItemsPerPageList();
		loadBrands();
		paginationInit();

		$scope.brandDelete = brandDelete;

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadBrands() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/brand/list",
				data: filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.brands = res.brands;
					$scope.page = json_filter_inputs.page | 0;
					$scope.itemsPerPage = json_filter_inputs.itemsPerPage ? json_filter_inputs.itemsPerPage : '12';
					$scope.maxPage = res.maxPage;
					$scope.$digest();
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

		function brandDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/brand/delete/"+id, 
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
	}
	else if($location.path().indexOf("/brand/update") >= 0) {
		findBrandById();

		$("#update").click(updateBrand);		

		function findBrandById() {
			var id = $routeParams.id;
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/brand/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.brand = res;
					$scope.$digest();
				}
			});
		}

		function updateBrand() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-brand");
			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/brand/update/" + id, 
					data: $scope.brand, 
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
	}
	else if($location.path().indexOf("/brand/create") >= 0) {
		$("#create").click(createBrand);

		function createBrand() {
			var valid = validator.validateTheForm("create-brand");
			if(valid) {
				$.ajax({
					method: "POST",
					url: CONSTANTS.SS_SERVER + "/api/v1/brand/create", 
					data: $scope.brand, 
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						$window.location.href = "#!/brand/list";
					}
				});
			}
		}
	}
});