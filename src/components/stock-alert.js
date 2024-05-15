import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { ALERT_EMAIL } from '../utils/constants/endpoints';

function stock_alert({product_id,variation_id}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const createMarkup = (data) => ({
        __html: data
    });
    // Email validation 
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    // Submit email Id 
    const submitAlertEmail = async () => {
        setError('');
        setSuccess('');
        setLoading(true);
        const alertData = {
            email: email,
            product_id: product_id,
            variation_id: variation_id,
        };
        console.log('alertData',alertData);
        if (validateEmail(email)) {
            await axios.post(ALERT_EMAIL, alertData)
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.result == true) {
                        setSuccess('You have been added to the waiting list of this product.');
                        setEmail('');
                    } else {
                        setError('Already registered.');
                    }
                })
                .catch(err => {
                    console.log('err', err);
                })

        } else {
            if (email == '') {
                setError('Email id required.');
                var  el =  document.getElementById("alert_email");
				if(el){el.focus();}
            } else {
                setError(email +' is invalid.');
                var  el =  document.getElementById("alert_email");
				if(el){el.focus();}
            }
        }
        setLoading(false);
    }

    // Add input value
    const inputChangeEvent = (e) => {
        setEmail(e.target.value);
        //if (error != '') {
        if (!validateEmail(e.target.value)) {
                if (e.target.value == '')
                {
                setError('Email id required.'); 
                } else {
                setError(e.target.value +' is invalid.');
                    }
                var  el =  document.getElementById("alert_email");
                if (el) { el.focus(); }
                setSuccess('');
            } else {
                setError('');
                setSuccess(e.target.value +' is valid.');
            }
        //}
    }

    return (
        <div>
			<p className='text-red-600 mb-3'>Get an alert when the product is in stock:</p>
			<div className='relative mb-3'>
				<input
					type="text"
                    onChange={inputChangeEvent}
                    value={email}
					placeholder={'Enter your email'}
                    id='alert_email'
                    name="email"
					className='outline-none block w-full py-2 px-3 pr-28 text-base text-gray-900 border border-gray-300  focus:border-victoria-400'
				/>
                {error && <div className="absolute bg-white px-3 text-red-500" dangerouslySetInnerHTML={createMarkup(error)} />}
                    {success && <div className="absolute bg-white px-3  text-green-500" dangerouslySetInnerHTML={createMarkup(success)} />}
                    <button
                        onClick={submitAlertEmail}
                        disabled={loading}
                        className="bg-red-600 text-base text-white p-2 text-center cursor-pointer absolute top-0 right-0 h-[42px]" >
                        {loading ?
                            <span className='size-10 sm:size-full bg-white sm:bg-transparent grid place-content-center'>
                                <span className='wishloader mx-auto'></span>
                            </span>
                            :
                            'Add to waiting list'
                        }
                    </button>
			</div>
		</div>
    )
}
export default stock_alert