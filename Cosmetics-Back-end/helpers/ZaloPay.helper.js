'use strict';

const crypto = require('crypto-js');
const moment = require('moment');
const axios = require('axios');
const zaloPayModel = require('../model/zalopay.model');

const URL_REDIRECT_SUCCESS = 'http://localhost:3000/success';

const configZaloPay = {
  appId: process.env.ZALO_PAY_APP_ID,
  key1: process.env.ZALO_PAY_KEY1,
  key2: process.env.ZALO_PAY_KEY2,
  endpoint: process.env.ZALO_PAY_ENDPOINT,

  bankCode: {
    qr: '',
    appToApp: '',
    mobileWebToApp: 'zalopayapp',
    visaMasterJCB: '36',
    bankAccount: '37',
    zaloPay: '38',
    atm: '39',
    visaMaterDebit: '41',
  },
};

class CryptoHelper {
  static hmac = (key, data) => crypto.HmacSHA256(data, key).toString();
}

class ZaloPayService {
  static generateTransId = () => Math.floor(Math.random() * 1000000);

  static generateAppTransId = (transId) =>
    `${moment().format('YYMMDD')}_${transId}`;

  static appTime = () => Date.now();
}

const requestPaymentZaloPayload = async (payload) => {
  // appUser <-> orderId
  const { amount, appUser, description, title, order_id } = payload;

  const transID = ZaloPayService.generateTransId();
  const appTransId = ZaloPayService.generateAppTransId(transID);
  const appTime = ZaloPayService.appTime();

  const embed_data = { redirecturl: URL_REDIRECT_SUCCESS };
  const items = [{}];

  const order = {
    app_id: configZaloPay.appId,
    app_trans_id: appTransId,
    app_user: appUser,
    app_time: appTime,
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    description: `${description} #${transID}`,
    bank_code: configZaloPay.bankCode.qr,
    title,
  };

  console.log('====================================');
  console.log(`order`, order);
  console.log('====================================');

  const data =
    order.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item;

  const mac = CryptoHelper.hmac(configZaloPay.key1, data);

  console.log('====================================');
  console.log(`mac -->`, mac);
  console.log('====================================');

  try {
    const URL = configZaloPay.endpoint + '/create';

    const responseAxios = await axios.post(URL, null, {
      params: { ...order, mac },
    });

    const data = responseAxios.data;

    if (data.return_code === 1) {
      await zaloPayModel.create({
        order: order_id,
        app_id: +order.app_id,
        app_user: appUser,
        app_trans_id: order.app_trans_id,
        app_time: appTime,
        amount: order.amount,
        item: JSON.stringify(items),
        description,
        embed_data: JSON.stringify(embed_data),
        mac,
      });
    }

    console.log('====================================');
    console.log(`response requestPaymentZaloPayload`, data);
    console.log('====================================');

    return data.order_url;
  } catch (error) {
    console.log('====================================');
    console.log(`error`, error);
    console.log('====================================');
  }
};

module.exports = {
  requestPaymentZaloPayload,
};
