app.controller("CartController", function($scope, $window, $location, $sessionStorage, Json_Helper, CONSTANTS, $cookies) {
	var order_details = [];

	init();
	loadOrderDetails();
	deleteItem();
	cancelOrder();
	setupPayment();

	// Functions
	function init() {
		$("#try-again").click(function() {
			$(".ss-popup").hide();
		});
	}

	function loadOrderDetails() {
		if(document.cookie) {
			order_details = document.cookie;
			order_details = order_details.split("=")[1];
			order_details = JSON.parse(order_details);

			$scope.order_details = order_details;

			// Calculate total
			var sum = 0;
			for(i = 0; i < order_details.length; i++) {
				var item = order_details[i];
				sum += item.product.price*item.quantity;
			}
			$scope.total = parseFloat(sum).toFixed(2);
		}
	}

	function deleteItem() {
		$scope.deleteItem = function(index) {
			order_details.splice(index, 1);

			if(order_details.length <= 0) {
				$cookies.remove("cart.tans.com");
				delete $scope.order_details;
			}
			else {
				var now = new Date();
				var nowTime = now.getTime();
				var nextHour = nowTime + 60*60*1000;
				document.cookie = "cart.tans.com=" + JSON.stringify(order_details) + "; expires=" + nextHour + "; path=/";		
			}
			location.reload();
		};
	}

	function cancelOrder() {
		$("#cancel").click(function() {
			var now = new Date();
			var nowTime = now.getTime();
			var previousHour = nowTime - 60*60*1000;
			$cookies.remove("cart.tans.com");
			location.reload();
		});
	}

	function setupPayment() {
		paypal.Button.render({

        env: 'sandbox', // Or 'production'

        client: {
            sandbox: 'AYxQiScGtmNx3HHL0R_sVADFk283SP84pgd0vo6yK-8tiKoBnvcEc7IZ2P_T7sOQtfPPPtW5lxw_tKAy',
            // production: 'xxxxxxxxx'
        },

        commit: true, // Show a 'Pay Now' button

        payment: function(data, actions) {
            return actions.payment.create({
                transactions: [
                    {
                        amount: { total: $scope.total, currency: 'USD' }
                    }
                ]
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(payment) {
            	if(payment.state === "approved") {
            		var order = {};
            		var payer_info = {};
            		var shipping_address = {};

            		order.status = payment.state;
            		order.paypal_id = payment.id;
            		order.created_at = payment.create_time;
            		order.amount = payment.transactions[0].amount.total;
            		
            		payer_info.email = payment.payer.payer_info.email;
            		payer_info.first_name = payment.payer.payer_info.first_name;
            		payer_info.last_name = payment.payer.payer_info.last_name;
            		payer_info.payer_id = payment.payer.payer_info.payer_id;
            		order.payer_info = JSON.stringify(payer_info);

            		shipping_address.city = payment.payer.payer_info.shipping_address.city;
            		shipping_address.country_code = payment.payer.payer_info.shipping_address.country_code;
            		shipping_address.line1 = payment.payer.payer_info.shipping_address.line1;
            		shipping_address.postal_code = payment.payer.payer_info.shipping_address.postal_code;
            		shipping_address.state = payment.payer.payer_info.shipping_address.state;
            		order.shipping_address = JSON.stringify(shipping_address);

            		var order_detail_array = [];
            		for(i = 0; i < order_details.length; i++) {
            			var jsonTemp = {};
            			var item = order_details[i];
            			jsonTemp.product_id = item.product.id;
            			jsonTemp.quantity = item.quantity;
            			order_detail_array.push(jsonTemp);
            		}
            		order.order_details = JSON.stringify(order_detail_array);

            		$.post(CONSTANTS.SS_SERVER + "/place-order", order, function(res) {
            			$cookies.remove("cart.tans.com");
            			$("#cart-status").text(0);
            			$window.location.href = "#!/payment-succeeded?email=" + payer_info.email;
            		});
            	}
            	else {
            		$(".ss-popup").show();
            	}
            });
        }

    }, '#paypal-button');
	}
});