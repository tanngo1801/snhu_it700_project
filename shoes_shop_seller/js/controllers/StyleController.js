app.controller("StyleController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Styles
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List styles
	if($location.path().indexOf("/style/list") >= 0) {
		loadItemsPerPageList();
		loadStyles();
		paginationInit();

		$scope.styleDelete = styleDelete;

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadStyles() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}
			
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/type/list",
				data: filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.styles = res.types;
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

		function styleDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/type/delete/"+id, 
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
	else if($location.path().indexOf("/style/update") >= 0) {
		findStyleById();

		$("#update").click(updateStyle);		

		function findStyleById() {
			var id = $routeParams.id;
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/type/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.style = res;
					$scope.$digest();
				}
			});
		}

		function updateStyle() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-style");
			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/type/update/" + id, 
					data: $scope.style, 
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
	else if($location.path().indexOf("/style/create") >= 0) {
		$("#create").click(createStyle);

		function createStyle() {
			var valid = validator.validateTheForm("create-style");
			if(valid) {
				$.ajax({
					method: "POST",
					url: CONSTANTS.SS_SERVER + "/api/v1/type/create", 
					data: $scope.style, 
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						$window.location.href = "#!/style/list";
					}
				});
			}
		}
	}
});