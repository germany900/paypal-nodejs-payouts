require('dotenv').config();
const express = require('express');
const app = express();
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.client_ID,
  'client_secret': process.env.secret_ID
});
 

app.post('/webhook', async(req, res) => {
  try {
    let eventBody = req.body;
    console.log("body", eventBody);
    let headers = req.headers;
    console.log(headers);
    let webhookId = process.env.webhook_ID;
   
    /*let headers = {
      auth_algo: pheader['paypal-auth-algo'],
      cert_url: pheader['paypal-cert-url'],
      transmission_id: pheader['paypal-transmission-id'],
      transmission_sig: pheader['paypal-transmission-sig'],
      transmission_time: pheader['paypal-transmission-time'],
      //webhook_Id: process.env.webhook_ID,
      webhook_event: body
    };*/
    

    
    paypal.notification.webhookEvent.verify(headers, eventBody, webhookId, function(err, verify) {
      if(err) {
        throw err;
      }else {
        console.log(verify);
        if(verify.verification_status === "SUCCESS") {
          console.log("Mensaje verificado");
        }else {
          console.log("Mensaje no verificado");
        }
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: false
    });
  }
  
});


module.exports = app;