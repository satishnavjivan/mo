/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { getPage } from '../src/utils/blog';
import Link from 'next/link';

export default function Home({ headerFooter ,pageData}) {
	return (
		<Layout headerFooter={headerFooter || {}} seo={pageData?.yoast_head_json ?? {}} >
			<section className='my-11'>
				<div className="mx-auto max-w-screen-xl px-2">
					<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border'>MATTRESS OFFERS Lay Down For Less – AFTERPAY STORE <br/> BUY NOW PAY LATER</h2>
					<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center mb-12">
						<div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
							<iframe width="100%" height="315" src="https://www.youtube.com/embed/vh4MZVRHMME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
						</div>
						<div className="space-y-4">
						<p>Proudly owned and run by Australians, exclusive online retail and wholesale business supply with many years of experience in the industry. <b>MATTRESS OFFERS</b> dedicated to offers high-quality products at reasonable prices.</p>
                			<p><b>MATTRESS OFFERS</b> offers a unique Buy Now, Pay Later experience with the help of various payment options where you can check out up to $2000 & receive delivery of your goods plus have the flexibility to pay off your purchases fortnightly, with no interest.</p>
						</div>
					</div>
					<div>
						<p>Our website has been designed to streamline the way our customers purchase their products online 24 X 7 at a flexible time and place that is convenient for them. Our website provides our customers with detail information and images with fully transparent pricing about our online products and shipping services in addition to the useful product information available as well. This, in turn, allows our customers to make fully informed purchases online without any hidden costs. We have also invested in protecting our customers’ security and privacy and have partnered with the most trustworthy and reputable financial institution to achieve this.</p>
						<p><b>MATTRESS OFFERS</b> Lay Down For Less – Leading Afterpay Online store in Australia.</p>
						<p>We provide the best range of Bed Sheet Set, Electric Blanket, Mattress Protector, Bed Frames, Mattress Topper, Quilt, Quilt Cover, Single on buy now pay later method. The team at <b>MATTRESS OFFERS</b> ensures that customers are delivered a first-grade shopping experience in every way. All are dedicated to fast, friendly reliable service with a real passion for complete customer satisfaction. Our aim at <b>MATTRESS OFFERS</b> is to create a strong relationship with all our customers and grow together with them now and into the future. We intend on achieving this by offering outstanding customer service and support, responding to enquirers in a timely manner, providing quality products at competitive online prices, and by providing a fast & reliable delivery service. We value your custom and feedback so please contact us with any comments and suggestions you may have.</p>
						<p><b>MATTRESS OFFERS</b> has a huge range of products across the website in different categories gives you a genuine feel of a departmental store at your place. Select & get your products now and pay later with no interest at your convenience.</p>
						<p>Check out more about our payment process <Link className="alink-color"  href={'/afterpay-faqs/'}>Afterpay</Link>, <Link className="alink-color"  href={ '/zippay/'}>Zippay</Link>, <Link className="alink-color"  href={ '/laybuy/'}>Lay Buy</Link>,<Link className="alink-color"  href={ '/humm-oxipay/'}>Humm</Link>, <Link className="alink-color"  href={ '/klarna/'}>Klarna</Link> and <Link className="alink-color"  href={ '/wizit/'}>Wizit</Link>.</p>
						<p><b>Mattress Offers – Lay Down For Less</b></p>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export async function getStaticProps({ params }) {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	const pageData = await getPage(params?.slug.pop() ?? 'home');
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			pageData: pageData?.[0] ?? {}
		},

		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
	};
}
