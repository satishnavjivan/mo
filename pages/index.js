/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT, OPTIONS_ENDPOINT, WEB_DEVICE } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { getPage } from '../src/utils/blog';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import ProductList from '../src/components/products/productlist';

import img1 from '../public/assets/img/home/sofas-sofa-bed.webp';

import img2 from '../public/assets/img/home/1.webp';
import img3 from '../public/assets/img/home/2.webp';
import img4 from '../public/assets/img/home/3.webp';
import img5 from '../public/assets/img/home/4.webp';
import img6 from '../public/assets/img/home/5.webp';
import img7 from '../public/assets/img/home/6.webp';

import moSignup from '../public/assets/img/home/mo-signup.webp';

import img8 from '../public/assets/img/home/delivery-truck.png';
import img9 from '../public/assets/img/home/return.png';
import img10 from '../public/assets/img/home/rewards.png';
import img11 from '../public/assets/img/home/bnpl.png';
import img12 from '../public/assets/img/home/7.webp';
import img13 from '../public/assets/img/home/8.webp';

import img14 from '../public/assets/img/home/9.webp';
import img15 from '../public/assets/img/home/10.webp';
import img16 from '../public/assets/img/home/11.webp';
import img17 from '../public/assets/img/home/12.webp';
import img18 from '../public/assets/img/home/13.webp';
import img19 from '../public/assets/img/home/14.webp';
import img20 from '../public/assets/img/home/15.webp';
import img21 from '../public/assets/img/home/16.webp';
import img22 from '../public/assets/img/home/17.webp';
import img23 from '../public/assets/img/home/18.webp';
import img24 from '../public/assets/img/home/19.webp';
import img25 from '../public/assets/img/home/20.webp';

import img26 from '../public/assets/img/home/21.webp';
import img27 from '../public/assets/img/home/22.webp';
import img28 from '../public/assets/img/home/23.webp';
import img29 from '../public/assets/img/home/24.webp';

import img30 from '../public/assets/img/home/30.webp';
import img31 from '../public/assets/img/home/31.webp';
import img32 from '../public/assets/img/home/32.webp';
import img33 from '../public/assets/img/home/33.webp';

import img34 from '../public/assets/img/home/34.webp';
import img35 from '../public/assets/img/home/35.webp';
import img36 from '../public/assets/img/home/36.webp';
import img37 from '../public/assets/img/home/37.webp';

import { randomIntFromInterval, replace_wordpress_url } from '../src/utils/customjs/custome';

export default function Home({ headerFooter, pageData }) {
	console.log('pageData',pageData);
	const { slider_options } = pageData?.acf;
	const options = headerFooter?.footer?.options ?? '';
	//const [options, setOptions] = useState({});

	const [sliderList, setSliderList] = useState(null);
	const [tokenValid, setTokenValid] = useState(0);
	const [customerData, setCustomerData] = useState(0);
	const [limitContent, setLimitContent] = useState(true);
	const [cat_slug, setCat_slug] = useState('/c');
	const seo = {
		title: 'Next JS WooCommerce REST API',
		description: 'Next JS WooCommerce Theme',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}

	// Slider Setting
	const PrevArrow = (props) => {
		const { onClick } = props;
		return (
			<div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10">
				<p onClick={onClick} className="size-10 bg-victoria-700 flex items-center justify-center">
					<i className="fa-light fa-arrow-left text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const NextArrow = (props) => {
		const { onClick } = props;
		return (
			<div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10">
				<p onClick={onClick} className="size-10 bg-victoria-700 flex items-center justify-center">
					<i className="fa-light fa-arrow-right text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const heroslider = {
		arrow: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	/*useEffect(()=>{
		(async () => {
	
			let config = {
				method: 'POST',
				maxBodyLength: Infinity,
				url: OPTIONS_ENDPOINT,
			  };
		  		await axios.request(config)	
					.then((response) => {
						console.log('response',response.data)
						setOptions(response?.data?.options);
					  })
					  .catch((error) => {
						console.log(error.response);
					  });
    })();
	}, [])*/

	useEffect(() => {
		var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		var d = new Date();
		var dayName = days[d.getDay()];
		if (slider_options.length > 0) {
			var slide_tmp = [];
			var i = 0;
			slider_options.map(function (slide) {
				const toDay = new Date();
				var slider_start_date = slide.slider_start_date;
				var slider_end_date = slide.slider_end_date;
				slider_start_date = new Date(slider_start_date);
				slider_end_date = new Date(slider_end_date);
				var dayValid = slide.day_select.find((element) => element == dayName);
				if (slide.slider_status == 'on' && slider_start_date <= toDay && toDay <= slider_end_date && (dayValid)) {
					slide_tmp[i] = slide;
					i++;
				}

			})
			if (!isEmpty(slide_tmp)) {
				setSliderList(slide_tmp);
			}
		}
	}, []);

	const prodslidesettings = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		centerMode: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		],
	};
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setTokenValid(1);
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				setCustomerData(customerDataTMP);
			}
		}
		if (!WEB_DEVICE) {
			setCat_slug('/cat?sname=');
		}
	}, []);
	console.log('pageData', pageData);
	return (
		<Layout headerFooter={headerFooter || {}} seo={ pageData?.yoast_head_json ?? {} } uri={''}>
			{sliderList ? <>
				<Slider {...heroslider}>
					{sliderList.map(function (slide) {
						return (
							<>
								<Image
									src={slide.slider_images_option[0]?.image_url}
									alt={slide.slider_images_option[0]?.slider_title}
									width={1920}
									height={650}
									className='mx-auto'
								/>
							</>
						);
					})}
				</Slider>
			</> : null}
			{(() => {
				/*return (slider_options.length ? <>
					<section className='top-banner w-full overflow-hidden'>
						<Slider {...heroslider}></Slider>
					</section>
				</> : null)*/
			})()}

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Most Selling</h2>
					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
						<Link href={cat_slug + '/dining/'} target='_self'>
								<Image
									src={img2}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/room-divider/'} target='_self'>
								<Image
									src={img3}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/tv-entertainment-unit/'} target='_self'>
								<Image
									src={img4}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/bathroom/'} target='_self'>
								<Image
									src={img5}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/tables/'} target='_self'>
								<Image
									src={img6}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/quilt-covers/'} target='_self'>
								<Image
									src={img7}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
					</div>
					<div className='text-center'>
						<Link href='/c' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
							View All
						</Link>
					</div>
				</div>
			</section>

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='border border-victoria-700 p-2 rounded flex gap-3 items-center group'>
							<Image
								src={img8}
								alt="Free Shipping"
								width={60}
								height={60}
								className='group-hover:rotate-360 transition-all duration-500 ease'
							/>
							<div>
								<h3 className="font-semibold">Free Shipping</h3>
								<p>For selected Products</p>
							</div>
						</div>
						<div className='border border-victoria-700 p-2 rounded'>
							<Link href='/warranty-return' className=' flex gap-3 items-center group'>
								<Image
									src={img9}
									alt="14 Days Return"
									width={60}
									height={60}
									className='group-hover:rotate-360 transition-all duration-500 ease'
								/>
								<div>
									<h3 className="font-semibold">14 Days Return</h3>
									<p>Please check our return policy</p>
								</div>
							</Link>
						</div>
						<div className='border border-victoria-700 p-2 rounded'>
							<Link href='/rewards-program' className=' flex gap-3 items-center group'>
								<Image
									src={img10}
									alt="Rewards Program"
									width={60}
									height={60}
									className='group-hover:rotate-360 transition-all duration-500 ease'
								/>
								<div>
									<h3 className="font-semibold">Rewards Program</h3>
									<p>Sign up to get Instant rewards</p>
								</div>
							</Link>
						</div>
						<div className='border border-victoria-700 p-2 rounded flex gap-3 items-center group'>
							<Image
								src={img11}
								alt="Multiple BNPL option"
								width={60}
								height={60}
								className='group-hover:rotate-360 transition-all duration-500 ease'
							/>
							<div>
								<h3 className="font-semibold">Multiple BNPL option</h3>
								<p>BNPL Payment Methods</p>
							</div>
						</div>
					</div>
				</div>
			</section>


			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Best-Sellers For This Month</h2>
					<div className='grid sm:grid-cols-2 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/room-divider/'}  target='_self'>
								<Image
									src={img12}
									alt="Category Image"
									width={660}
									height={450}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/sheet-set/'} target='_self'>
								<Image
									src={img13}
									alt="Category Image"
									width={660}
									height={450}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Elevate Your Slumber With The Perfect Mattress Fit</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-3 sm:gap-4 mt-10'>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/single-mattress/'} target='_self'>
								<Image
									src={img14}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/king-single-mattress/'} target='_self'>
								<Image
									src={img15}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/double-mattress/'} target='_self'>
								<Image
									src={img16}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/queen-mattress/'} target='_self'>
								<Image
									src={img17}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/king-mattress/'} target='_self'>
								<Image
									src={img18}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/mattress/'} target='_self'>
								<Image
									src={img19}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Choose Your Preferred Style From Our Huge Varieties Of Bikes </h2>
					<div className='grid-cols-1'>
						<div className='relative shadow-full img-boxani'>
							<Link href={'/my-account/'}  target='_self'>
								<Image
									src={moSignup}
									alt="Category Image"
									width={1296}
									height={223}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Sleep in Style: Explore Our Bed Frame Collection</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-3 sm:gap-4 mt-10'>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/single-bed-frame/'} target='_self'>
								<Image
									src={img20}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/king-single-bed-frames/'} target='_self'>
								<Image
									src={img21}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/double-bed-frame/'} target='_self'>
								<Image
									src={img22}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/queen-bed-frame/'} target='_self'>
								<Image
									src={img23}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/king-bed-frames/'} target='_self'>
								<Image
									src={img24}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/beds/bed-frame/super-king-frames/'} target='_self'>
								<Image
									src={img25}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Heat Up Your Savings: Unbelievable Hot Deals Await!</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/sofas-sofa-bed/'} target='_self'>
								<Image
									src={img26}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/outdoor-furniture/'} target='_self'>
								<Image
									src={img27}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/bar-furniture/'} target='_self'>
								<Image
									src={img28}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/chairs/'} target='_self'>
								<Image
									src={img29}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/bedside-table/'} target='_self'>
								<Image
									src={img30}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/storage-ottoman/'} target='_self'>
								<Image
									src={img31}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/cabinets-storage/shoe-storage/'} target='_self'>
								<Image
									src={img32}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/outdoor-furniture/sun-loungers/'} target='_self'>
								<Image
									src={img33}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/blankets/'} target='_self'>
								<Image
									src={img34}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/blankets/body-blankets/'} target='_self'>
								<Image
									src={img35}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/chairs/electric-massaging-chairs/'} target='_self'>
								<Image
									src={img36}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/mattress-topper/'} target='_self'>
								<Image
									src={img37}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			{
				(() => {
					if (undefined != pageData.new_arrivals) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">New Arrivals Slider</h2>
									{pageData.new_arrivals.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.new_arrivals.map(productRel => {
													var Membersonly = '';
													if (tokenValid == 1 && options?.discount_type_3 == 1) {
														var messageText = options?.nj_display_box_member_only ?? '';
														Membersonly = getMemberOnlyProduct(options, productRel, messageText);
													}
													return (
														<div className='p-2'>
															<ProductList key={productRel?.id} product={productRel} Membersonly={Membersonly} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
														</div>
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<Link href='/shop?orderby=date_created' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
									
								</div>
							</section>
						)
					}
				})()
			}

			{
				(() => {
					if (undefined != pageData.free_shipping) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Free Shipping Slider</h2>
									{pageData.free_shipping.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.free_shipping.map(productRel => {
													var Membersonly = '';
													if (tokenValid == 1 && options?.discount_type_3 == 1) {
														var messageText = options?.nj_display_box_member_only ?? '';
														Membersonly = getMemberOnlyProduct(options, productRel, messageText);
													}
													return (
														<div className='p-2'>
															<ProductList key={productRel?.id} product={productRel} Membersonly={Membersonly} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
														</div>
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<Link href='/shop?shipping-multiple-=Free-Shipping' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
			}
			{
				(() => {
					if (undefined != pageData.shop_review) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Shop Reviews</h2>
									{pageData.shop_review.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.shop_review.map((review,i) => {
													var p_slug = '/p/' + replace_wordpress_url(review?.product_permalink);
													if (!WEB_DEVICE) {
														p_slug = '/product/?sname=' + replace_wordpress_url(review?.product_permalink);
													}
													return ( 
														<div className='p-2 '>
																<div className='h-full shadow-full relative rev-wapper'>
																			<div className="rating-info p-2">
																				<p className="feedback-star mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</p>
																				<p className="veri-info mb-0"> <i className="fa fa-check me-1"></i> Verified </p>
																			</div>
																			<div key={review}																			dangerouslySetInnerHTML={{
																				__html: review?.review ?? '',
																			}} className="line-clamp-2 feedback-content p-2"																				
																			/>
																			<p className="feedname mb-0 p-2"><b>
																					{review?.reviewer}
																			</b> <span>
																					{(i*2)+3} days ago
																				</span></p>
																</div>
															</div>
																	
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<div className="review-count d-block d-md-flex text-center">

										<div className="d-flex align-items-center justify-content-center">
											
											<b className='me-2 align-super'>Rated</b>

											<span className="feedback-star-total mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</span>
											<b  className='align-super'>	{pageData?.shop_reviewid_count} Number of product review by customer</b>
										</div>
										</div>
									<Link href='/all-reviews/' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
				
			}
			{
				(() => {
					if (undefined != pageData.products_review) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Product Reviews</h2>
									{pageData.products_review.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.products_review.map((review,i) => {
													var p_slug = '/p/' + replace_wordpress_url(review?.product_permalink);
													if (!WEB_DEVICE) {
														p_slug = '/product/?sname=' + replace_wordpress_url(review?.product_permalink);
													}
													return ( 
														<div className='p-2'>
																<div className='h-full shadow-full relative '>
																			<div className="rating-info p-2">
																				<p className="feedback-star mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</p>
																				<p className="veri-info mb-0"> <i className="fa fa-check me-1"></i> Verified </p>
																			</div>
																			<p className="title-link mb-0 p-2">
																				<Link href={`${p_slug}`} legacyBehavior>
																				<a key="review_title"
																					dangerouslySetInnerHTML={{
																						__html: review.product_name,
																					}}
																					className="line-clamp-1 font-medium group-hover:text-victoria-800"
																				/>
																				</Link>
																			</p>
																			<div key={review}																			dangerouslySetInnerHTML={{
																				__html: review?.review ?? '',
																			}} className="line-clamp-2 feedback-content p-2"																				
																			/>
																			<p className="feedname mb-0 p-2"><b>
																					{review?.reviewer}
																			</b> <span>
																			{(i*2)+3} days ago
																				</span></p>
																</div>
															</div>
																	
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<div className="review-count d-block d-md-flex text-center">

										<div className="d-flex align-items-center justify-content-center">
											
											<b className='me-2 align-super'>Rated</b>

											<span className="feedback-star-total mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</span>
											<b  className='align-super'>	{pageData?.products_review_count} Number of product review by customer</b>
										</div>
										</div>
									<Link href='/all-reviews/' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
				
			}
			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Mattress Offers: An Online Furniture Store That Delivers Comfort </h2>
						<div className='border border-slate-300 p-2'>
								

								<p className="mb-8 text-base text-body-color">Mattress Offers has become one of the most trusted and reliable online mattress and furniture store in Australia. We offer an extensive range of mattresses, 
								<Link href={cat_slug + '/beds/'}  className="alink-color"> beds </Link>, and more furnishings in various styles, designs, and patterns. We strive to provide you with quality furniture and bedding essentials at the cheapest prices and assist you in styling up your home.</p>
								<p className="mb-8 text-base text-body-color">Additionally, you can count on us for smart, trendy furniture ideas for your home, office, and garden. Whether you want to buy a mattress or a bed at discounted rate, we always have something innovative and inspirational. Discover what we offer, how it helps to spruce up your home, and why our furniture is important!</p>
								<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Bedroom Furniture</h2>
								<p className="mb-8 text-base text-body-color">When it comes to bedroom furniture, a bed is the first thing that comes to your mind. No matter how small or big your bedroom is, you’ll always find something to suit your style from our collection of 
								<Link href={cat_slug + '/beds/bed-frame/'}  className="alink-color"> bed frames </Link>. Whether you want a classic, modern, retro, or even a contemporary look for your dream bedroom, we can help you achieve it.</p>
								<p className="mb-8 text-base text-body-color">Bedside tables serve as functional style icons in your bedroom. Thus, you will find a wide range of 
								<Link href={cat_slug + '/bedside-table/'}  className="alink-color"> bedside tables </Link> in a variety of different finishes. A pair of side tables paired with a bed will give your bedroom a stylish look. Bedroom furniture also includes 
								<Link href={cat_slug + '/cabinets-storage/'}  className="alink-color"> storage cabinets </Link>, such as 
								<Link href={cat_slug + '/cabinets-storage/cupboards-wardrobes/'}  className="alink-color"> cupboards & wardrobes </Link>.</p>
								<p className="mb-8 text-base text-body-color">Our store can assist you in finding an affordable one that matches your requirements. To add a little more elegance, you could get an ottoman, a 
								<Link href={cat_slug + '/dressing-table/'}  className="alink-color">  dressing table </Link>, and some stylish 
								<Link href={cat_slug + '/home-garden/lighting/table-lamps-lighting/'}  className="alink-color"> lamps </Link> without compromising your budget{ limitContent ? <span>...</span> : null}</p>
								

								{ !limitContent ? 
								<span>
									
								<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Bedding Essentials</h2>
                        <p className="mb-8 text-base text-body-color">Bedding essentials are Mattress Offers second top-sellers. We offer mattresses that are known for their higher level of comfort and affordability. Made with high-quality materials and designed to last, our <Link className="alink-color" href={cat_slug + '/mattress/'}>mattresses</Link> ensure that you get a good night’s sleep. Available in memory foam, pocket spring, latex, and other spring and foam materials, you have a wide variety of options to choose from.</p>
                        <p className="mb-8 text-base text-body-color">From euro top to cool gel memory foam to pillow tops to flat surfaces, you can choose the level of padding. No matter if you’re a back or stomach sleeper, we have the right mattress for you. If you’re a person with back or joint problems, we have a particular mattress for you. Our<Link className="alink-color" href={cat_slug + '/quilt-covers/'}> quilt covers</Link>, <Link className="alink-color" href={cat_slug + '/sheet-set/'}>bed sheet sets</Link>, and <Link className="alink-color" href={cat_slug + '/mattress-topper/'}>mattress toppers</Link> are of top-notch quality and are built to last. Sheet sets and quilt covers are available in a wide range of aesthetic styles, adding some flair to your bedroom. Besides, <Link className="alink-color" href={cat_slug + '/quilt/'}>quilts</Link>, <Link className="alink-color" href={cat_slug + '/mattress-protector/'}>mattress protectors</Link> and toppers, <Link className="alink-color" href={cat_slug + '/pillows/'}>pillows</Link>, and<Link className="alink-color" href={cat_slug + '/blankets/'}> blankets</Link> are available in various colours and patterns.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Living Room Furniture</h2>
                        <p className="mb-8 text-base text-body-color">What furniture should every living room have? That answer is our extensive range of living room furniture. No matter how simple or stylish you want your living room to be, you can count on us. A sofa or a sofa bed, <Link className="alink-color" href={cat_slug + '/chairs/armchair'}>armchairs</Link>, and a<Link className="alink-color" href={cat_slug + '/tv-entertainment-unit/'}> tv entertainment unit </Link>are something you need as essential living room furnishings. These come in many different styles and designs, too.</p>
                        <p className="mb-8 text-base text-body-color"><Link className="alink-color" href={cat_slug + '/sofas-sofa-bed/'}>Sofas</Link> and TV units are some of our best-selling furniture, so you can find the latest styles and designs every now and then. The living room design can be accentuated with a stunning <Link className="alink-color" href={cat_slug + '/tables/coffee-table/'}>coffee table</Link>. There are also <Link className="alink-color" href={cat_slug + '/home-garden/rugs/'}>rugs</Link>, <Link className="alink-color" href={cat_slug + '/home-garden/curtains/'}>curtains</Link>, and <Link className="alink-color" href={cat_slug + '/home-garden/candle-holders/'}>candle holders</Link> that can be matched with living room furniture. Additionally, you could add <Link className="alink-color" href={cat_slug + '/cabinets-storage/display-shelf/'}>display shelves</Link>, an <Link className="alink-color" href={cat_slug + '/storage-ottoman/'}>ottoman for storage</Link>, and a <Link className="alink-color" href={cat_slug + '/room-divider/'}>room divider</Link> to make it more stylish. It is important that your living room be inviting enough to offer guests a warm welcome and represent the lifestyle you prefer. That’s why we design our furniture accordingly.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Office and Storage Furniture</h2>
                        <p className="mb-8 text-base text-body-color">Whether you are shopping for a home office or a corporate one, you will always find something that suits your needs. As we think about office furniture, ergonomics is the first thing on our minds. A well-designed ergonomic <Link className="alink-color" href={cat_slug + '/chairs/office-chair/'}>office chair</Link> helps you work longer and more productively.</p>
                        <p className="mb-8 text-base text-body-color">The same goes for an office desk. You can rest assured about the quality of our office furniture like desks and chairs because they are designed ergonomically. We offer a diverse selection of office chairs, from leather massage chairs to gaming chairs, so no matter what you’re looking for, we have it. Besides, you can find <Link className="alink-color" href={cat_slug + '/cabinets-storage/office-storage/'}>office storage</Link> solutions for your home office or corporate ones such as <Link className="alink-color" href={cat_slug + '/cabinets-storage/filing-cabinets/'}>filing cabinets</Link>, cupboards, and even lockers to safeguard your belongings.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Dining Room Furniture</h2>
                        <p className="mb-8 text-base text-body-color">The right dining room furniture is just as important as the right bedroom and living room furniture. As a place where you share memorable meals, your dining room should be stylish and functional. Your dining room set should be the centre of attention in your dining room. Therefore, you should choose both the dining table and chairs wisely.</p>
                        <p className="mb-8 text-base text-body-color">At Mattress Offers, you can browse through a multitude of <Link className="alink-color" href={cat_slug + '/dining/dining-sets/'}>dining sets</Link>. Some popular finishes include wooden, glass, and ceramic. You can also purchase both a<Link className="alink-color" href={cat_slug + '/dining/dining-table/'}> dining table</Link> and dining chairs separately if you wish to have a contrasting focal point in your room. <Link className="alink-color" href={cat_slug + '/dining/dining-chair/'}>Dining chairs</Link>, especially, come in a variety of styles and comfort levels, allowing you to choose the chair that’s perfect for you.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Home Decor</h2>
                        <p className="mb-8 text-base text-body-color">Adding style to your space goes beyond your furniture. Your home décor helps spruce up your space. The little ornaments you add to your wall mounted shelf or display shelf will add a different aura to your space. In the same way, the rug on your floor, the curtains on the windows, and the<Link className="alink-color" href={cat_slug + '/home-garden/lighting/'}> lighting</Link> in your room have their place. It depends on how you want your room to look, but we certainly have everything you need. From matching rugs and curtains to <Link className="alink-color" href={cat_slug + '/home-garden/lighting/floor-lamps/'}>floor lamps</Link> and <Link className="alink-color" href={cat_slug + '/home-garden/awnings/'}>awnings</Link>, you can explore a great range of home decors here.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Outdoor Furniture</h2>
                        <p className="mb-8 text-base text-body-color">In the summer, how well you furnish your outdoor living space defines the quality of your time outdoors! Having furniture in your backyard or patio should be as important as having furniture in your bedroom and living room. Depending on your needs, you can either furnish your garden fully or only install a set of <Link className="alink-color" href={cat_slug + '/outdoor-furniture/outdoor-tables/'}>outdoor tables</Link> and chairs.</p>
                        <p className="mb-8 text-base text-body-color">You can install a simple <Link className="alink-color" href={cat_slug + '/outdoor-furniture/outdoor-lounges/'}>outdoor lounge</Link> or <Link className="alink-color" href={cat_slug + '/outdoor-furniture/outdoor-dining-set/'}>dining furniture set</Link> with <Link className="alink-color" href={cat_slug + '/bar-furniture/'}>bar furniture</Link>. <Link className="alink-color" href={cat_slug + '/outdoor-furniture/sun-loungers/'}>Sun loungers</Link> are the best way to relax outdoors if you have a large backyard or patio with a pool. A top seller among our outdoor furniture, our <Link className="alink-color" href={cat_slug + '/outdoor-furniture/outdoor-beds/'}>outdoor beds</Link> are incredibly relaxing. In addition to enhancing your garden or backyard, outdoor furniture is a symbol of the joy of spending time with family and friends.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Kids Furniture</h2>
                        <p className="mb-8 text-base text-body-color">Your little one needs more than a creative bed, toys, and comics in their room. Children’s furniture sets, such as <Link className="alink-color" href={cat_slug + '/kids-furniture/kids-table-chairs/'}>tables and chairs</Link>, <Link className="alink-color" href={cat_slug + '/kids-furniture/bookshelf/'}>bookshelves</Link>, and other furniture, are a great way to encourage their creativity. Oftentimes, you find their bedrooms cluttered with toys. A <Link className="alink-color" href={cat_slug + '/kids-furniture/toy-box/'}>kids toy box</Link> or organiser can thus come in handy to encourage them to keep their toys in the box and declutter their room. Additionally, you can have an armchair or animal chair available for them to sit back and relax, watch cartoons, and have fun. Kids furniture is available in a number of themes and styles, so you can choose the one that matches your preferences.</p>

                        <h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Why Choose Us?</h2>
                        <p className="mb-8 text-base text-body-color">There are a number of reasons why we have become the fastest growing online mattress and furniture store. Besides affordable prices and great discount offers, our furnishings are made of the highest quality. All items come with a standard warranty of 1 year. Some mattresses even come with a warranty of five and ten years, as described in the item description.</p>
                        <p className="mb-8 text-base text-body-color">Our collection is exclusive to the latest trends you find in the market, so you can rest assured that you will find only the best. We deliver right to your doorstep as fast as we can and we are available in most parts of Australia with express delivery facilities available in Sydney, Perth, Canberra, Melbourne, Brisbane, and Adelaide. Not least, we offer beds and mattresses at the cheapest price with buy now pay later facilities with Afterpay, Wizpay, Openpay, and Humm facilities.</p>
                        <p className="mb-8 text-base text-body-color">In other words, if your payday is still far away, you can visit our online store and order whatever you want without worry. Take advantage of the flexibility to pay in instalments, even with no interest. So what’s stopping you from ordering the new mattress or furniture of your dreams? Let us know if you need any help or anything else! We’re live 24*7!!</p>
                       

									</span> : null
									}
								{limitContent ?
									<button onClick={(e)=> setLimitContent(false)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 '>Read more</button>
									:
									<button onClick={(e)=> setLimitContent(true)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 '>Read less</button>
								}
						</div>
				</div>
			</section>

		</Layout>
	)
}

export async function getStaticProps({ params }) {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	const pageData = await getPage(params?.slug.pop() ?? 'homepage');


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
