/**
 * External Dependencies.
 */

import Layout from '../src/components/layout';
import React from 'react'
import { useState } from 'react';
import Loaderspin from '../src/components/loaderspin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { CAPTCHA_SITE_KEY, BECOME_SUPPLIER, WEB_DEVICE,HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"
import { auth } from '../src/utils/firebase'
import { RecaptchaVerifier } from 'firebase/auth';



export default function becomeAInfluencer({ headerFooter }) {
	const seo = {
		title: 'Become a Influencer',
		description: 'Become a Influencer',
		og_image: [],
		og_site_name: 'Become a Influencer',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}
	const createMarkup = (data) => ({
		__html: data
	});

	/*************** Regis ******************************/
	const [formFields, setFormFields] = useState({
		sname: '',
		sphone: '',
		swhatsappno: '',
		semail: '',
		scompany_name: '',
		swebsite: '',
		scompany_desc: '',
		scountry_warehouse: '',
		sbrands: '',
		sdeal_price: '',
		form_loading: false,
		form_error: '',
		form_success: '',
		captcha: '',
	});

	
	// form validation rules 
	const validationSchema = Yup.object().shape({
		semail: Yup.string()
			.required('Email is required')
			.matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Please enter valid email id.')
			.email('Email is invalid'),
		sname: Yup.string()
			.required('Name is required'),
		scompany_name: Yup.string()
			.required('Company name is required'),
		swebsite: Yup.string()
			.required('website is required'),
		scompany_desc: Yup.string()
			.required('Company description  is required'),
		scountry_warehouse: Yup.string()
			.required('Warehouse located is required'),
		sbrands: Yup.string()
			.required('Supply products / brands is required'),
		sphone:Yup.string()
			.test('len', 'Contact number must be exactly 10 digit', val => (val.length === 10 || val.length === 0) ),
		swhatsappno:Yup.string()
			.test('len', 'Contact number must be exactly 10 digit', val => (val.length === 10 || val.length === 0) )
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	const onFormSubmitform = (event) => {
		
		const formData = {
			sname: event.sname,
			sphone: event?.sphone,
			swhatsappno: event?.swhatsappno,
			semail: event.semail,
			scompany_name: event.scompany_name,
			swebsite: event.swebsite,
			scompany_desc: event.scompany_desc,
			scountry_warehouse: event.scountry_warehouse,
			sbrands: event.sbrands,
			sdeal_price: event.sdeal_price,
		};

		setFormFields({ ...formFields, form_loading: true, form_error: '', form_success: '' });

		axios.post(BECOME_SUPPLIER, formData)
			.then(res => {

				console.log('res', res);
				setFormFields({
					...formFields,
					form_error: '',
					form_success: 'Successfully Send',
					form_loading: false
				})
				reset();
			})
			.catch(err => {
				setFormFields({ ...formFields, form_error: err.response.data, form_loading: false });
			})
	};

	const regishandleOnChange = (event) => {
		setFormFields({ ...formFields, [event.target.name]: event.target.value });
	};

	const {form_error, form_success, form_loading } = formFields;
	// ReCaptcha 
	const onReCAPTCHAChange = async (captchaCode) => {
		if (!captchaCode) {
			return;
		}
		setFormFields({ ...formFields, captcha: captchaCode });
	};
	console.log('formFields', formFields);
	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
	}

	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
				<React.Fragment>
					<div className='max-w-4xl mx-auto border border-gray-200 p-3 rounded'>
							<form onSubmit={handleSubmit(onFormSubmitform)}>
							<div class="grid grid-cols-2 gap-2">	
									<label className="block mb-4">
										<span className='block text-base mb-1'>Name: <span className='text-red-500'>*</span></span>
										<input name="sname" type="text" {...register('sname')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.sname?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>Contact Number: </span>
										<input name="sphone"   type="number" {...register('sphone')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.sphone?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>WhatsApp Number: </span>
										<input name="swhatsappno" type="number" {...register('swhatsappno')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.swhatsappno?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>Email: <span className='text-red-500'>*</span></span>
										<input name="semail" type="text" {...register('semail')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.semail?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>Company Name: <span className='text-red-500'>*</span></span>
										<input name="scompany_name" type="text" {...register('scompany_name')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.scompany_name?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>Website: <span className='text-red-500'>*</span></span>
										<input name="swebsite" type="text" {...register('swebsite')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.swebsite?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>Brief description of your company <span className='text-red-500'>*</span></span>
										<textarea name="scompany_desc" type="text" {...register('scompany_desc')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.scompany_desc?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>In what country is your warehouse located? <span className='text-red-500'>*</span></span>
										<textarea name="scountry_warehouse" type="text" {...register('scountry_warehouse')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.scountry_warehouse?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>What products / brands do you supply? <span className='text-red-500'>*</span></span>
										<textarea name="sbrands" type="text" {...register('sbrands')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.sbrands?.message}</div>
									</label>
									<label className="block mb-4">
										<span className='block text-base mb-1'>If you are offering a particular deal, please include the pricing and availability of stock.</span>
										<textarea name="sdeal_price" type="text" {...register('sdeal_price')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
										<div className="d-block text-red-500">{errors.sdeal_price?.message}</div>
									</label>
									<ReCAPTCHA
										sitekey={CAPTCHA_SITE_KEY}
										onChange={onReCAPTCHAChange}
										theme="dark"
									/>
									<div className='text-center mt-5 mb-2'>
										<button className={`bg-victoria-800 inline-block px-2 py-3 text-white text-center w-60 text-lg cursor-pointer ${formFields.captcha === "" ? 'opacity-50' : ''}`} type="submit" disabled={formFields.captcha === ""}>
											{form_loading ? <div className='py-[3px]'><Loaderspin /></div> : 'Send Email'}
										</button>
									</div>
							  </div>
							</form>
							{form_error && <p className="bg-red-200 border border-red-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(form_error)} />}
							{form_success && <p className="bg-green-200 border border-green-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(form_success)} />}
						</div>
					</React.Fragment>
		</Layout>
	)
}
export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
	};
}