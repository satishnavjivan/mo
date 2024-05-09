/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_PRODUCTLIST_BY_PARAMETER} from '../../src/utils/constants/endpoints';
 import isEmpty from 'is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../../src/components/layout';
import ProductsFilter from '../../src/components/products/products-filter';
import { useEffect, useState } from 'react';


 export default function tag_slug({ headerFooter, products }) {
    //console.log('params',params);
    //console.log('products web',products);
    const options = headerFooter?.footer?.options;
	const [tokenValid,setTokenValid]=useState(0);
    useEffect(() => {
		if(localStorage.getItem('token')) {
			setTokenValid(1);
        }
	}, []);
    if(isEmpty(products))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    }else{
        return (
            <Layout headerFooter={headerFooter || {}}>
                <ProductsFilter products={products} options={options} tokenValid={tokenValid}/>
            </Layout>
        )
    }
    
 }


export async function getServerSideProps(context){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
   
    const {data : res} = await axios.get(SHOP_PRODUCTLIST_BY_PARAMETER,context);
	
    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
            products: res,
        },
    };
  };
  
 

