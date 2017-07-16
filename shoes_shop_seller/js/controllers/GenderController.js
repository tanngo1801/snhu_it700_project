app.controller("GenderController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Genders
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List gender
	if($location.path().indexOf("/gender/list") >= 0) {
		loadItemsPerPageList();
		loadGenders();
		paginationInit();

		$scope.genderDelete = genderDelete;

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadGenders() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/gender/list",
				data: filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.genders = res.genders;
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

		function genderDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/gender/delete/"+id, 
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
	else if($location.path().indexOf("/gender/update") >= 0) {
		findGenderById();

		$("#update").click(updateGender);		

		function findGenderById() {
			var id = $routeParams.id;
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/gender/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.gender = res;
					$scope.$digest();
				}
			});
		}

		function updateGender() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-gender");
			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/gender/update/" + id, 
					data: $scope.gender, 
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
	else if($location.path().indexOf("/gender/create") >= 0) {
		$("#create").click(createGender);

		function createGender() {
			var valid = validator.validateTheForm("create-gender");
			if(valid) {
				$.ajax({
					method: "POST",
					url: CONSTANTS.SS_SERVER + "/api/v1/gender/create", 
					data: $scope.gender, 
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						$window.location.href = "#!/gender/list";
					}
				});
			}
		}
	}
});