/**
 * Internal Dependencies.
 */
//import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';

export default function cat_slug({ headerFooter}) {
   
    return  ('ok');
    
}

// getStaticProps // getServerSideProps
export async function getServerSideProps() {
    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },
    };
};



