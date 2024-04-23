/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT, WCAPI_QUERY_PRM, WEB_DEVICE } from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';
import SingleProduct from '../src/components/single-product';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from "./../public/loader.gif";
import { serialize } from '../src/utils/customjs/custome';
import { isEmpty } from 'lodash';

export default function Product( { headerFooter, product,reviews } ) {
	console.log('product',product);
	//console.log('reviews',reviews);
	const router = useRouter();
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	const [productTMP,setProductTMP] = useState({});
	const [reviewsTMP,setReviewsTMP] = useState({});
    const slug = process.browser ? Router.query.sname : null;
    const [loading, SetLoading] = useState(true);
    const [dataMsg , setDataMsg] = useState('');
    useEffect(()=>{
		(async () => {
			if (slug != undefined) 
			{ 
				var srData = WCAPI_QUERY_PRM + serialize({ slug: slug,prodict_single: 1});
				var productID = 0;
				let config = {
					method: 'get',
					maxBodyLength: Infinity,
					url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/products/'+srData,
				};
				await axios.request(config)	
				.then((response) => {
					setProductTMP(response.data[0]);
					productID = response.data[0].id;
				})
				.catch((error) => {
					console.log(error.response.data);
				});
				if (productID != 0) { 
					var srData = WCAPI_QUERY_PRM + serialize({ product: productID });
					let config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/products/reviews/'+srData,
					  };
				  await axios.request(config)	
							.then((response) => {
								setReviewsTMP(response.data)
							  })
							  .catch((error) => {
								console.log(error.response.data);
							  });
				}
			SetLoading(false);
			setTimeout(function(){
				if(isEmpty(productTMP))
				{
					setDataMsg('Data Not found');
				}
			},500)
			}
			
    })();
	}, [slug])
	
	if(loading)
    {
         return(
            <Layout headerFooter={headerFooter || {}}>
                { loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
            </Layout>
        )
    }
    else if(isEmpty(productTMP))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
               {dataMsg}
            </Layout>
        )
	} else {
		var p_slug = '/p/' +productTMP?.slug;
		if(!WEB_DEVICE)
			{
				p_slug = '/product/?prodict_single=1&sname='+productTMP?.slug;
			}
		return (
			<Layout
				headerFooter={ headerFooter || {} }
				seo={ productTMP?.yoast_head_json ?? {} }
				uri={ `${ p_slug ?? '' }` }
				pageData = {productTMP}
			>
				<SingleProduct singleProduct={ productTMP } reviews={reviewsTMP} options={headerFooter?.footer?.options ?? ''}/>
			</Layout>
		);
	}
	
}
// getStaticProps // getServerSideProps
export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
	};
}

/*export async function getStaticPaths() {
	const { data: products } = await getProductsData();
	
	// Expected Data Shape: [{ params: { slug: 'pendant' } }, { params: { slug: 'shirt' } }],
	const pathsData = [];
	
	products.length && products.map( ( product ) => {
		if ( product.slug ) {
			pathsData.push( { params: { slug: product.slug ?? '' } } );
		}
	} );
	
	return {
		paths: pathsData,
		fallback: true,
	};
}*/
