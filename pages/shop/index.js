/**
 * Internal Dependencies.
 */
import ProductsFilter from '../../src/components/products/products-filter';
import { HEADER_FOOTER_ENDPOINT, SHOP_PRODUCTLIST } from '../../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
//import { getProductsData } from '../../src/utils/products'; // api default
import Layout from '../../src/components/layout';
import { useEffect, useState } from 'react';
import Loader from "../../src/components/loaderspin";

export default function Home({ headerFooter }) {
	const options = headerFooter?.footer?.options;
	const [tokenValid,setTokenValid]=useState(0);
	const [products,setProducts]=useState({});
	const [loading, SetLoading] = useState(true);
	//debugger;
	const seo = {
		title: 'Shop',
		description: 'dis shop',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}
	useEffect(() => {
		if(localStorage.getItem('token')) {
			setTokenValid(1);
        }
	}, []);
	useEffect(()=>{
				(async () => {
					
					await axios.request(SHOP_PRODUCTLIST)	
					.then((response) => {
						console.log('response',response.data);
						setProducts(response.data);
						SetLoading(false);
					})
					.catch((error) => {
						console.log(error.response.data);
						});
					
			})();
		}, [])
console.log('products',products);
	return (
		<Layout headerFooter={ headerFooter || {} } seo={ seo }>
			{loading ?
						<div className='my-3 p-5'>
							<Loader />
						</div>
						:
						<ProductsFilter products={products} options={options} tokenValid={tokenValid}/>
						}
		</Layout>
	)
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	//const res = await fetch('https://pooltableoffers.com.au/snv/api_json/product/products_data.js');
	//const res = await fetch(SHOP_PRODUCTLIST);
	//let products = await res.json();
	//const {data : res} = await axios.get(SHOP_PRODUCTLIST);

  
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			//products: products,
			//products: res,
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		
	};
}
