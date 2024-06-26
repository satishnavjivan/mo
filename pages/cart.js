import Layout from '../src/components/layout';
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import axios from 'axios';
import CartItemsContainer from '../src/components/cart/cart-items-container';

export default function Cart({ headerFooter }) {
	const options = headerFooter?.footer?.options;
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Cart</h1>
			<CartItemsContainer options={options} />
		</Layout>
	);
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
