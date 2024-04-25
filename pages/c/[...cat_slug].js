/**
 * Internal Dependencies.
 */
//import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT, SHOP_CATEGORIES_CAT_SLUG, SHOP_CATEGORIES_CAT_SLUG_CACHE, } from '../../src/utils/constants/endpoints';
import isEmpty from 'is-empty';
/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../../src/components/layout';
import Products from '../../src/components/products';
import Category from '../../src/components/categories/category';
import Image from 'next/image';
import Link from 'next/link';
import Loader from "../../src/components/loaderspin";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FALLBACK } from '../../src/utils/slug';

export default function cat_slug({ headerFooter}) {
    //console.log('products',products);
    const [categories,setCategories]=useState({products:{},cat_list:{},cat_data:{}});
	const [loading, SetLoading] = useState(true);
    const router = useRouter();

   
    
    const { products } = categories;
    const { cat_list } = categories;
    const { cat_data } = categories;
    const { single_category_image, single_category_image_url } = headerFooter?.footer?.options ?? '';
    // Banner 
    const { category_image_select_category_section } = headerFooter?.footer?.options ?? '';
    
    let cacheValid = 0;

    /*useEffect(()=>{
        (async () => {
                    const { cat_slug } = router?.query || {};
                    var lastSlug = cat_slug[Object.keys(cat_slug)[Object.keys(cat_slug).length - 1]];
                    let rsCat = null;
                    await axios.get(SHOP_CATEGORIES_CAT_SLUG_CACHE + 'product_cat_' + lastSlug + '.js')
                    .then((response) => {
                        console.log('response',response.data);
                          if (response.data?.products != undefined) {
                            cacheValid = 1;
                            setCategories(response.data);
                            }
                        SetLoading(false);
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        });

                    if(cacheValid == 0)  
                    {
                        await axios.get(SHOP_CATEGORIES_CAT_SLUG+'?cat_slug='+lastSlug)
                        .then((response) => {
                            console.log('response 2222',response.data);
                              if (response.data?.products != undefined) {
                                cacheValid = 0;
                                setCategories(response.data);
                                }
                            SetLoading(false);
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                            });
                    }
                    

                
        })();
    }, [router?.query?.cat_slug])*/


    console.log('categories', categories);
    console.log('cacheValid', cacheValid);
    console.log('headerFooter', single_category_image);
    console.log('category_image_select_category_section', category_image_select_category_section);
    //console.log('headerFooter',headerFooter?.footer?.options?.single_category_image_url);

    return (
            <Layout headerFooter={headerFooter || {}}
            seo={cat_data?.yoast_head_json ?? {}}
            uri={`/categories/${cat_data?.term_link ?? ''}`}>
                
                    {(() => {
                        if (loading) 
                        {
                        return (
                            <Loader />
                        )
                        } else if (isEmpty(products) && isEmpty(cat_data)) {
                        return (
                            <div> Data Not found</div>
                        )
                        } else {
                        return (
                            <div>
                            <div key={'cat_' + cat_list.length} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                                                {cat_list.length ? cat_list.map(category => {
                                                    return (
                                                        <Category key={category?.id} category={category} />
                                                    )
                                                }) : null}
                                            </div>
                                            <div key='cat-banner' className='text-center my-5'>
                                                {single_category_image !== undefined ?
                                                    <Link href={single_category_image_url}>
                                                        <Image
                                                            src={single_category_image}
                                                            alt="Category Banner"
                                                            width={1320}
                                                            height={300}
                                                            className='mx-auto'
                                                        />
                                                    </Link>
                                                    : null}
                                                {(() => {
                                                    //console.log('index', category_image_select_category_section);
                                                    if (category_image_select_category_section?.length) {
                                                    return  category_image_select_category_section.map((val, index) => {
                                                            const toDay = new Date();
                                                            var start_date = new Date(val?.start_date);
                                                            var end_date = new Date(val?.end_date);
                                                            if (start_date <= toDay && toDay <= end_date) {
                                                                const found = val?.select_category.find((element) => element == cat_data?.id);
                                                                if (found) { 
                                                                    return (val?.category_image != '' ?
                                                                    <Link href={val?.category_url}>
                                                                        <Image
                                                                            src={val?.category_image}
                                                                            alt="Category Banner"
                                                                            width={1320}
                                                                            height={300}
                                                                            className='mx-auto'
                                                                        />
                                                                    </Link>
                                                                    : null)
                                                                }
                                                                
                                                            }
                                                        });
                                                        
                                                        
                                                    }
                                                })()}
                                            </div>
                                            <Products products={products} />
                         </div>
                        )
                        }
                    })()}  
            </Layout>
        )
}

// getStaticProps // getServerSideProps
export async function getStaticProps() {
    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },
    };
};

export async function getStaticPaths() {
	const pathsData = [];
    return {
		paths: pathsData,
		fallback: FALLBACK,
	};
}


