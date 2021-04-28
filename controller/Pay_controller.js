require('dotenv').config();
const paypal = require('@paypal/checkout-server-sdk');
const express = require('express');
const app = express();
let clientId = process.env.client_ID;
let clientSecret = process.env.secret_ID;
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

app.post('/pay', async(req, res) => {
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "MXN",
                    "value": "100.00"
                }
            }
        ]
    });
let createOrder  = async function(){
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        res.status(200).json({
            data: response,
            data2: response.result
        });
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
       console.log(`Order: ${JSON.stringify(response.result)}`);
       let capture = captureOrder(response.result.id); 
}
createOrder();



});

let captureOrder =  async function(orderId) {
    request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);
}

module.exports = app;
