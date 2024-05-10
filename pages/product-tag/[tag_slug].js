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
import { useRouter } from 'next/router';
import Loader from "../../src/components/loaderspin";


 export default function tag_slug({ headerFooter }) {
    //console.log('params',params);
    //console.log('products web',products);
    const options = headerFooter?.footer?.options;
	const [tokenValid,setTokenValid]=useState(0);
    const [productsTMP,setProductsTMP] = useState({});
    const router = useRouter();
    const [loading, SetLoading] = useState(true);
    
    useEffect(()=>{
        (async () => {
            const { tag_slug } = router?.query || {};
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: SHOP_PRODUCTLIST_BY_PARAMETER+'?tag_slug='+tag_slug,
                };
            await axios.request(config)
            .then((response) => {
            const {data } = response;
            setProductsTMP(data);
            })
            .catch((error) => {
            console.log( 'error', error );
            });
            SetLoading(false);
            
        })();
    },[router?.query?.tag_slug])

    useEffect(() => {
		if(localStorage.getItem('token')) {
			setTokenValid(1);
        }
	}, []);

    
    return (
        <Layout headerFooter={headerFooter || {}}>
          {(() => {
                    if (loading) 
                    {
                    return (
                        <Loader />
                    )
                    } else if (isEmpty(productsTMP)) {
                    return (
                        <div> Data Not found</div>
                    )
                    } else {
                        return(<ProductsFilter products={productsTMP} options={options} tokenValid={tokenValid}/>);
                    }
            })()} 
            
        </Layout>
    )
  
    
 }


export async function getServerSideProps(context){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },
    };
  };
  
 

