app.controller("QuestionController", function($scope, $window, $location, $cookies, Json_Helper, CONSTANTS, $routeParams) {
	// Questions
	var validator = CONSTANTS.SS_VALIDATOR;
	validator.init();

	// List questions
	if($location.path().indexOf("/question/list") >= 0) {
		loadItemsPerPageList();
		loadQuestions();
		paginationInit();

		$scope.questionDelete = questionDelete;

		function loadItemsPerPageList() {
			$scope.itemsPerPageList = CONSTANTS.itemsPerPageList;
		}

		function loadQuestions() {
			var url = $window.location.href;
			var filter_inputs = "";
			var json_filter_inputs = {};

			if(url.indexOf("?") != -1) {
				filter_inputs = url.substring(url.indexOf("?")+1);
				json_filter_inputs = Json_Helper.urlParamsToJson(url);
			}

			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/question/list",
				data: filter_inputs,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.questions = res.questions;
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

		function questionDelete(e) {
			var target = $(e.target);
			var id = target.attr("id").split("-")[1];
			
			$.ajax({
				method: "DELETE",
				url: CONSTANTS.SS_SERVER + "/api/v1/question/delete/"+id,
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
	else if($location.path().indexOf("/question/update") >= 0) {
		findQuestionById();

		$("#update").click(updateQuestion);		

		function findQuestionById() {
			var id = $routeParams.id;
			$.ajax({
				method: "GET",
				url: CONSTANTS.SS_SERVER + "/api/v1/question/update/" + id,
				headers: {
					"Authorization":$cookies.get("jwtToken")
				},
				success: function(res) {
					$scope.question = res;
					$scope.question.watched = res.watched+"";
					$scope.$digest();
				}
			});
		}

		function updateQuestion() {
			var id = $routeParams.id;
			var valid = validator.validateTheForm("update-question");
			if(valid) {
				$.ajax({
					method: "PUT",
					url: CONSTANTS.SS_SERVER + "/api/v1/question/update/" + id, 
					data: $scope.question,
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
	else if($location.path().indexOf("/question/create") >= 0) {
		$("#create").click(createQuestion);

		function createQuestion() {
			var valid = validator.validateTheForm("create-question");
			if(valid) {
				$.ajax({
					method: "POST",
					url: CONSTANTS.SS_SERVER + "/api/v1/question/create",
					data: $scope.question,
					headers: {
						"Authorization":$cookies.get("jwtToken")
					},
					success: function(res) {
						$window.location.href = "#!/question/list";
					}
				});
			}
		}
	}
});