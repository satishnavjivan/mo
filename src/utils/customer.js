import { createCustomers, getCustomers, updateCustomers } from "./apiFun/customer";

/* Get customer data */
export const get_customer = async(arg_user_email,setCustomerData)=>
		{
			let responseCus = {
                success: false,
                customers: null,
                error: '',
            };
			const resultCus = await getCustomers(arg_user_email);
			console.log('======resultCus=====',resultCus);
			if(resultCus.success)
			{
				responseCus.success = true;
				if(resultCus.customers != undefined)
				{
					responseCus.customers = resultCus.customers[0];
					setCustomerData(resultCus.customers[0]);
					localStorage.setItem('customerData',JSON.stringify(resultCus.customers[0]));
				}
			}else{
				responseCus.error = resultCus.error;
			}
			
			//console.log('responseCus',loginFields.userEmail);
			console.log('responseCus',responseCus);
			return responseCus.customers;
		}

export const handleCreateCustomer = async(input) => {
			let responseCus = {
				success: false,
				customers: null,
				error: '',
			};
			var randumNo = Math.random().toFixed(3)*1000;
			var usernameCreate = input.billing.email.split("@", 3)[0]+randumNo;
			const userData = {
				email: input.billing.email,
				first_name: input.billing.firstName,
				last_name: input.billing.lastName,
				username: usernameCreate,
				password: input.createAccountPassword,
				billing: input.billing,
				shipping:input.shipping 
			  };
			   console.log('userData',userData);

			   const response = await createCustomers(userData);
			   if(response.success)
			   {
				responseCus.success = true;
				responseCus.customers = response.data;
			   }else{
				responseCus.error = response.error;
			   }
			return responseCus;
}


export const handleUpdateCustomer = async(input,user_id) => {
	let responseCus = {
		success: false,
		customers: null,
		error: '',
	};
	const userData = {
		id:user_id,
		billing: {
			...input.billing,
			first_name: input.billing.firstName,
			last_name: input.billing.lastName,
			address_1: input.billing.address1,
			address_2: input.billing.address2,
		},
		shipping: {
			...input.shipping,
			first_name: input.shipping.firstName,
			last_name: input.shipping.lastName,
			address_1: input.shipping.address1,
			address_2: input.shipping.address2,
		},
	  };
	   console.log('userData',userData);

	   const response = await updateCustomers(userData);
	   if(response.success)
	   {
		responseCus.success = true;
		responseCus.customers = response.data;
	   }else{
		responseCus.error = response.error;
	   }
	return responseCus;
}