import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const GotoLoginBtn = () => {
	const [btnText,setBtnText]=useState('Go to login');
	useEffect(() => {
        //check token
        if(localStorage.getItem('token')) {
			setBtnText('Go to Myaccount');
        }
	}, []);
  return(	
  		<button onClick={()=>{
		Router.push("/my-account/");
		}} className="bg-victoria-800 inline-block px-2 py-3 text-white text-center w-60 text-lg cursor-pointer">{btnText}</button>
  	)
};

export default GotoLoginBtn;
