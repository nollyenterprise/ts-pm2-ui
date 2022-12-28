
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
// Get QR code to scan WhatsAPP
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
    console.log(message.body);
});
// List of data for automatic reply
var data = [
    { id: 1, received: '6', reply: 'Our office address is located at: \n\nNo. 6B, Glory Plaza Trans Woji Road YKC Junction, Woji 500102, Port Harcourt, Rivers state. \n\nYou can click the link below to see our office location on the map. \n\nhttps://goo.gl/maps/9wK698SqJ81HHmKeA'},
    { id: 2, received: '1', reply: 'All our products leaves a lasting effect for weeks.'},
    { id: 3, received: '5', reply: 'All our orders are received from our website. Click the link below to visit our website now.\n\nhttps://khaltenscents.com'},
    { id: 4, received: '8', reply: 'Click the link below to join our telegram channel.\n\nhttps://t.me/+mCiV_vatIT03MDI0'},
    { id: 5, received: '4', reply: 'Join our telegram channel with the link below to get an up to date catalog of our product price list.\n\nhttps://t.me/+mCiV_vatIT03MDI0.'},
    { id: 6, received: '3', reply: 'Join our telegram channel with the link below to get an up to date catalog of our wholesale price list.\n\nhttps://t.me/+mCiV_vatIT03MDI0.'},
    { id: 7, received: '7', reply: 'We deliver nationwide and the price of delivery varies with respect to the quantity demands.'},
    { id: 8, received: '2', reply: 'Join our telegram channel with the link below to get an up to date catalog of our products.\n\nhttps://t.me/+mCiV_vatIT03MDI0.'},
];
data.default = 'Welcome to Khalten Scents.\nWe are a direct distributor for Argeville France.\nWe sell undiluted designer perfume oil. We have over 1000 variants.\n\nHow can we be of immediate service?\n\nType and send a number from the list below.\n\n1 - To inquire about our product longevity.\n2 - To inquire about our products.\n3 - To inquire about our wholesale price list.\n4 - To inquire about our product price list.\n5 - To find out how to place an order.\n6 - To find our office address.\n7 - How much is delivery?\n8 - Join our Telegram Group!'
client.on('message', message => {
    var selectedData = data.find((msg) => {
        if(message.body.toLowerCase().includes(msg.received.toLowerCase())) {
            return true
        }
    });
    var sourceMsg, targetMsg;
    if(selectedData && Object.keys(selectedData).length !== 0 && selectedData.constructor === Object) {
        sourceMsg = selectedData.received;
        targetMsg = selectedData.reply;
    }
    // send message
    if(message.body == sourceMsg) {
        message.reply(targetMsg);
    } else {
        message.reply(data.default);
    }
});
client.initialize();