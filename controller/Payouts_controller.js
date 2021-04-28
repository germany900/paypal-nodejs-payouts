require('dotenv').config();
const express = require('express');
const app = express();

const paypal = require('@paypal/payouts-sdk');
let clientId = process.env.client_ID;
let clientSecret = process.env.secret_ID;
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

const validarPago = require('../helpers/function');


app.post('/payouts', async(req, res) => {
    try {
      let body = req.body;
      console.log("estamos en el body", body);
      let senderBatchId = `Test_SDK_${Math.random().toString(36).substring(7)}`;
      console.log(senderBatchId);
        let payoutBacht = {
            "sender_batch_header": {
              "recipient_type": "EMAIL",
                 "sender_batch_id": senderBatchId,
                 "email_subject": body.title
            },
            "items": [
                 {
                      "receiver": body.email,
                      "note": body.note,
                      "sender_item_id": "15300979",
                      "amount": {
                           "currency": "MXN",
                           "value": body.value
                      }
                 }
            ]
          }
        
          let request = new paypal.payouts.PayoutsPostRequest().requestBody(payoutBacht)
          console.log("estamos en el request", request);
          let sendPayout = await validarPago(request);
          console.log("se termino el pago", sendPayout);
          if(sendPayout) {
            return res.status(200).json({
              data: sendPayout
            });
          }
    
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            err: e
        })
    }
});

/*app.get('/payouts', async(req, res) => {
  try {
    let getPayouts =  async function(batchId) {
      request = new paypal.payouts.PayoutsGetRequest(batchId);
      request.page(1);
      request.pageSize(10);
      request.totalRequired(true);
      // Call API with your client and get a response for your call
      let response = await client.execute(request);
      console.log(`Response: ${JSON.stringify(response)}`);
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(`Payouts Batch: ${JSON.stringify(response.result)}`);
      return res.status(200).json({
        message: "OK"
      });
  }
  
  getPayouts('83TEPJXBQJXZE');
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      err: e
    })
  }
   
});
     */
   

module.exports = app;