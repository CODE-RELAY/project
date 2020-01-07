var uid = 0;

$(document).ready(function(){	
	$("#btn-signup").click(function(){
		const url = "/register";

		var register_data = {
			birthdate: $("#birthDate").val()
		}
		
		if(validate(register_data)){
			
			$.post(url, register_data, function(res, status){
				if(res.code == "error"){
					swal('Aww snap!', res.msg, res.code);
				}
				else{
					swal('Thank You!', uid, res.code);
					uid++;
				}
				clear_form();
			});
		}
	});


	function validate(register_data) {
		if(register_data.birthdate === ""){
			swal("Missing Details", "Please fill Birthdate field", "error");
			return false;
		}
		
		return true;
	}
	
	function clear_form() {
		$("#birthDate").val('');
	}

});