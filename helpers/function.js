const paypal = require('@paypal/payouts-sdk');
let clientId = process.env.client_ID;
let clientSecret = process.env.secret_ID;
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);    

async function validarPago(data){
        console.log("estamos en la función de pago");
              let response = await client.execute(data);
              console.log(`Response: ${JSON.stringify(response)}`);
              // If call returns body in response, you can get the deserialized version from the result attribute of the response.
             console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
            return response;
             
}


module.exports = validarPago;