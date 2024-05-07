export const WEB_DEVICE = true;


export const HEADER_FOOTER_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/header-footer?header_location_id=menu-1&header_top_location_id=hcms-menu-top&footer_location_id=footer_company&footer_location_id2=footer_popular_category&footer_location_id3=footer_customer_service`;
export const GET_POSTS_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/posts`;
export const GET_POST_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/posts`;
export const GET_PAGES_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/pages`;
export const COMMENTS_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/comments`;

/**
 * Cart
 * @type {string}
 */
export const CART_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/cart/items/`;

// Countries and States
export const WOOCOMMERCE_COUNTRIES_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/wc/countries/`;
export const WOOCOMMERCE_STATES_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/wc/states`;


//Shipping shingle product API
export const SHOP_SHIPPING_SINGLE = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/shipping_single`;
export const SHOP_SHIPPING_MULI = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/shipping_muli`;

// AUS POST API
export const SUBURB_API_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/auspost`;

//Shop product API
export const SHOP_CATEGORIES = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/snv/api_json/categories/categories_data.js`;
export const SHOP_CATEGORIES_CAT_SLUG = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/snv/api_json/categories/chield_cat_product_data.php`;
export const SHOP_CATEGORIES_CAT_SLUG_CACHE = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/snv/api_json/categories/cache/`;
export const SHOP_PRODUCTLIST_BY_PARAMETER = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/snv/api_json/product/filter_data.php`;
export const SHOP_PRODUCTLIST = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/snv/api_json/product/products_data.js`;

//User API
export const USER_LOGIN = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/jwt-auth/v1/token`;
export const USER_LOGINWITHPHONE = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/loginwithphone`;
export const USER_REGIS = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/registration`;
export const USER_FORGOT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/forgotpassword`;
export const USER_KEYVERI = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/keyverification`;
export const USER_CHANGEPASS = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/changepassword`;

//Order Tracking
export const USER_ORDER_TRACKING = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/track-order`;
export const GETORDERID = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/get_orderid_by_order_no`;

// Re captach 
export const CAPTCHA_SITE_KEY = '6Lcxwd0kAAAAAPotJibWFZxSuDcKVkHCIp90-Vcj';

// Wishlist
export const WISHLIST_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/wishlist`;
export const WISHLIST_LIST = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/wishlist_list`;

// pages list
export const PAGES_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/pages`;

// Local API url
//export const NEXT_PUBLIC_SITE_API_URL='http://localhost:3000/'
export const NEXT_PUBLIC_SITE_API_URL = 'https://mo-lake.vercel.app'

export const CHECKOUT_API_TIME_INT = 10000; // 10 secind
export const CHECKOUT_API_CALL_LIMIT = 25;

// ## WooCommerce Consumer Key and secret.
export const WC_CONSUMER_KEY_API = 'ck_cf46d962de8cb1aa924621b1ca31d65097b468e6'
export const WC_CONSUMER_SECRET_API = 'cs_ef92762b11487e456105234c6ba21b7a7bc6f897'

export const WCAPI_QUERY_PRM = '?consumer_key=' + WC_CONSUMER_KEY_API + '&consumer_secret=' + WC_CONSUMER_SECRET_API + '&';

// SUBSCRIBE EMAIL API
export const SUBSCRIBE_EMAIL = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/subscribe_email`;

// Product Enquiry
export const PRODUCT_ENQUIRY = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/product_enquiry`;

// Become supplier
export const BECOME_SUPPLIER = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/become_supplier`;

//splashpass
export const SPLASHPASS = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/splashpass`;

//reviewlist 
export const REVIEWLIST = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/reviewlist`;
export const REVIEW = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/shop-nj/v1/review`;