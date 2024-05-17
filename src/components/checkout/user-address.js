import PropTypes from 'prop-types';
import CountrySelection from "./country-selection";
import StateSelection from "./states-selection";
import InputField from "./form-elements/input-field";
import SuburbSelection from './suburb-selection';

const Address = ({ suburbs, input, countries, states, handleOnChange, isFetchingStates, isShipping, isFetchingSuburb }) => {

	const { errors } = input || {};
	if (!suburbs.length && input?.postcode) {
		if (isShipping) {
			document.getElementById("postcode_shipping").focus();
		} else {
			document.getElementById("postcode_billing").focus();
		}
	}
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<InputField
					name="firstName"
					inputValue={input?.firstName}
					required
					handleOnChange={handleOnChange}
					label="First name"
					errors={errors}
					isShipping={isShipping}
				/>
				<InputField
					name="lastName"
					inputValue={input?.lastName}
					required
					handleOnChange={handleOnChange}
					label="Last name"
					errors={errors}
					isShipping={isShipping}
				/>
			</div>
			<InputField
				name="company"
				inputValue={input?.company}
				handleOnChange={handleOnChange}
				label="Company Name (Optional)"
				errors={errors}
				isShipping={isShipping}
			/>
			{/* Country Selection*/}
			<CountrySelection
				input={input}
				handleOnChange={handleOnChange}
				countries={countries}
				isShipping={isShipping}
			/>
			<InputField
				name="address1"
				inputValue={input?.address1}
				required
				handleOnChange={handleOnChange}
				label="Street address"
				placeholder="House number and street name"
				errors={errors}
				isShipping={isShipping}
			/>
			<InputField
				name="address2"
				inputValue={input?.address2}
				handleOnChange={handleOnChange}
				label="Street address line two"
				placeholder="Apartment floor unit building floor etc(optional)"
				errors={errors}
				isShipping={isShipping}
			/>
			<InputField
				name="postcode"
				inputValue={input?.postcode}
				required
				handleOnChange={handleOnChange}
				label="Post code"
				placeholder="enter valid postcode in. 4 digits"
				errors={!suburbs.length && input?.postcode ? {
					"postcode": "Enter valide postcode ",
				} : errors}
				isShipping={isShipping}
			/>
			{/* Suburb */}
			<SuburbSelection
				input={input}
				handleOnChange={handleOnChange}
				suburbs={suburbs}
				isShipping={isShipping}
				isFetchingSuburb={isFetchingSuburb}
			/>
			{/* State */}
			<StateSelection
				input={input}
				handleOnChange={handleOnChange}
				states={states}
				isShipping={isShipping}
				isFetchingStates={isFetchingStates}
			/>
			<InputField
				name="phone"
				inputValue={input?.phone}
				required
				handleOnChange={handleOnChange}
				label="Phone"
				errors={errors}
				isShipping={isShipping}
			/>
			{!isShipping ?
				<InputField
					name="email"
					type="email"
					inputValue={input?.email}
					required
					handleOnChange={handleOnChange}
					label="Email"
					errors={errors}
					isShipping={isShipping}
				/> : null}
			{/*	@TODO Create an Account */}
			{/*<div className="form-check">*/}
			{/*	<label className="leading-7 text-sm text-gray-600" className="form-check-label">*/}
			{/*		<input onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>*/}
			{/*			Create an account?*/}
			{/*	</label>*/}
			{/*</div>*/}
			{/*<h2 className="mt-4 mb-4">Additional Information</h2>*/}
			{/* @TODO Order Notes */}
			{/*<div className="form-group mb-3">*/}
			{/*	<label className="leading-7 text-sm text-gray-600" htmlFor="order-notes">Order Notes</label>*/}
			{/*	<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4"/>*/}
			{/*	<Error errors={ input.errors } fieldName={ 'orderNotes' }/>*/}
			{/*</div>*/}
		</>
	);
};

Address.propTypes = {
	input: PropTypes.object,
	countries: PropTypes.array,
	handleOnChange: PropTypes.func,
	isFetchingStates: PropTypes.bool,
	isShipping: PropTypes.bool
}

Address.defaultProps = {
	input: {},
	countries: [],
	handleOnChange: () => null,
	isFetchingStates: false,
	isShipping: false
}

export default Address;
