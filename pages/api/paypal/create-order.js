import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
});
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}


const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, NEXT_PUBLIC_PAYPAL_CLIENT_SECRET,NEXT_PUBLIC_PAYPAL_API_URL, PORT = 3000 } = process.env;
//const base = "https://api-m.sandbox.paypal.com";
const base = NEXT_PUBLIC_PAYPAL_API_URL;
const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !NEXT_PUBLIC_PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + NEXT_PUBLIC_PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart,
  );
  const {checkoutOrderData} = cart[0];
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: checkoutOrderData?.total,
        },
        reference_id : checkoutOrderData?.id
      },
    ],
   "payer": {
      "name": {
         "given_name": checkoutOrderData?.billing?.first_name,
         "surname": checkoutOrderData?.billing?.last_name
      },
      "address": {
         "address_line_1": checkoutOrderData?.billing?.address_1,
         "admin_area_2": checkoutOrderData?.billing?.address_2,
         "admin_area_1":checkoutOrderData?.billing?.state,
         "postal_code": checkoutOrderData?.billing?.postcode,
         "country_code": checkoutOrderData?.billing?.country
      }
   },
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};


async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //console.error("body data :", req.body.cart[0]);
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
}



