var NT_VALIDATOR = {
	init: function() {
		$(".nt-validation-error").hide();
	},
	validateTheForm: function(form_id) {
		var form = $("#" + form_id);

		var requiredInputs = form.find(".nt-input-required");
		for(i = 0; i < requiredInputs.length; i++) {
			var item = $(requiredInputs[i]);
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);

			if(!item.val()) {
				err_mess_obj.text("Input required!");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		var rangeInputs = form.find(".nt-input-range");
		for(i = 0; i < rangeInputs.length; i++) {
			var item = $(rangeInputs[i]);
			var min = item.attr("nt-min");
			var max = item.attr("nt-max");
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);

			if(parseInt(item.val()) < min || parseInt(item.val()) > max) {
				err_mess_obj.text("Input must be between " + min + " and " + max + "!");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		var numberInputs = form.find(".nt-input-number");
		for(i = 0; i < numberInputs.length; i++) {
			var item = $(numberInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			if(isNaN(value)) {
				err_mess_obj.text("Input must be a number");
				err_mess_obj.show();
				return false;
			}
		}

		var integerInputs = form.find(".nt-input-integer");
		for(i = 0; i < integerInputs.length; i++) {
			var item = $(integerInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			if(isNaN(value)) {
				err_mess_obj.text("Input must be an integer");
				err_mess_obj.show();
				return false;
			}
			else {
				if(value.indexOf(".")>=0) {
					err_mess_obj.text("Input must be an integer");
					err_mess_obj.show();
					return false;
				}
			}
		}

		var emailInputs = form.find(".nt-input-email");
		for(i = 0; i < emailInputs.length; i++) {
			var item = $(emailInputs[i]);
			var value = item.val();
			var err_mess = item.attr("nt-validation-error-id");
			var err_mess_obj = $("#" + err_mess);
			var pattern = /(.+)@(.+){2,}\.(.+){2,}/;
			if( !pattern.test(value) ) {
				err_mess_obj.text("Input must be an email");
				err_mess_obj.show();
				return false;
			}
			else {
				err_mess_obj.hide();
			}
		}

		return true;
	}
};	
		
		