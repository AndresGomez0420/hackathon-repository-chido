// Tutorial del cliente de Open Payments
// Objetivo: Realizar un pago entre pares entre dos direcciones de billetera (usando cuentas en la cuenta de prueba)

// https://ilp.interledger-test.dev/owo -> cliente
// https://ilp.interledger-test.dev/charlytest -> receptor
// https://ilp.interledger-test.dev/miguel -> remitente

// Requisitos previos:
// ConfiguraciÃ³n inicial

import { createAuthenticatedClient, isFinalizedGrant } from '@interledger/open-payments';
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// a. Importar dependencias y configurar el cliente
(async()=>{
    const PKey='';
    const privateKey = `-----BEGIN PRIVATE KEY-----
${PKey}
-----END PRIVATE KEY-----`;

const client = await createAuthenticatedClient({
  walletAddressUrl: 'https://ilp.interledger-test.dev/owo',
  privateKey: privateKey,  
  keyId: '67105674-b910-404f-8dc6-aabda37464f8'
});

// b. Crear una instancia del cliente Open Payments
// c. Cargar la clave privada del archivo
// d. Configurar las direcciones de las billeteras del remitente y el receptor
// Flujo de pago entre pares
// 1. Obtener una concesiÃ³n para un pago entrante)
console.log('1------------------')
const sendingWalletAddress= await client.walletAddress.get({
    url: 'https://ilp.interledger-test.dev/charlytest'
}
);

const recivingWalletAddress= await client.walletAddress.get({
    url: 'https://ilp.interledger-test.dev/charlytest'
}
);

console.log(sendingWalletAddress,recivingWalletAddress);
// 2. Obtener una concesiÃ³n para un pago entrante
console.log('2------------------')
const incomingPaymentGrant = await client.grant.request(
  {
    url: recivingWalletAddress.authServer,
  },{
    access_token: {
      access: [
        {
          type: "incoming-payment",
          actions: ["create"],
        }
      ]
    }
}
);
if(!isFinalizedGrant(incomingPaymentGrant)) {
    throw new Error('El concesiÃ³n no estÃ¡ finalizada');
}

console.log(
  "\nStep 1: got incoming payment grant for receiving wallet address",
  incomingPaymentGrant
);


console.log('3------------------');
// 3. Crear un pago entrante para el receptor
const incomingPayment = await client.incomingPayment.create(
    {
        url: recivingWalletAddress.resourceServer,
        accessToken:incomingPaymentGrant.access_token.value
    },{
        walletAddress:recivingWalletAddress.id,
        incomingAmount:{
                assetCode:recivingWalletAddress.assetCode,
                assetScale:recivingWalletAddress.assetScale,
                value:'1000' // 10 unidades (10^assetScale)
        }
    }
);

console.log(incomingPayment);
console.log("4-------------------");

// 4. Crear un concesiÃ³n para una cotizaciÃ³n

const quoteGrant = await client.grant.request(
    {
        url: sendingWalletAddress.authServer,
    },{
        access_token: {
            access: [
                {
                    type: "quote",
                    actions: ["create"],
                }
            ]
        }
    }
);

if(!isFinalizedGrant(quoteGrant)) {
    throw new Error('Se espera a que finalice la concesion');
}
console.log("Got quote grant for sending wallet address",
    quoteGrant);
console.log('5------------------');
// 5. Obtener una cotizaciÃ³n para el remitente
const quote = await client.quote.create(
    {
        url: recivingWalletAddress.resourceServer,
        accessToken: quoteGrant.access_token.value,
    },{
        walletAddress:sendingWalletAddress.id,
        receiver:incomingPayment.id,
        method:"ilp"
    }
);

console.log(quote);
console.log('6------------------');
// 6. Obtener una concesiÃ³n para un pago saliente
const outgoingPaymentGrant = await client.grant.request(
    {
        url: sendingWalletAddress.authServer,
    },{
        access_token: {
            access: [
                {
                    type: "outgoing-payment",
                    actions: ["create"],
                    limits: {
                        debitAmount: quote.debitAmount,
                    },
                    identifier: sendingWalletAddress.id,
                }
            ]
        },
        interact:{
            start: ["redirect"],
        }
    }
);

console.log(outgoingPaymentGrant); 
console.log('7------------------');
// 7. Continuar con la concesiÃ³n del pago saliente
const rl = readline.createInterface({ input, output });

await rl.question("Presiona Enter para continuar con la concesión del pago saliente... ");
rl.close();

console.log('8------------------');
// 8. Finalizar la concesiÃ³n del pago saliente
const finalizedOutgoingPaymentGrant = await client.grant.continue(
    {
        url: outgoingPaymentGrant.continue.uri,
        accessToken: outgoingPaymentGrant.continue.access_token.value,
    });
if(!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
    throw new Error('Se espera a que finalice la concesion');
}
console.log('9-------------------');
// 9. Continuar con la cotizaciÃ³n de pago saliente
const outgoingPayment = await client.outgoingPayment.create(
    {
        url: sendingWalletAddress.resourceServer,
        accessToken: finalizedOutgoingPaymentGrant.access_token.value,
    },{
        walletAddress:sendingWalletAddress.id,
        quoteId:quote.id,
    }
);
console.log({outgoingPayment});
}) ();