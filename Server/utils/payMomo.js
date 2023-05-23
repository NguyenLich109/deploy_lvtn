import crypto from 'crypto';
import NodeRSA from 'node-rsa';

export const createRequestBody = (orderId, orderInfo, amount, redirectUrl, ipnUrl) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    // var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    // var redirectUrl = redirectUrl;
    // var ipnUrl = ipnUrl;
    var requestType = 'payWithMethod';
    // var amount = amount;
    // var orderId = orderId;
    var requestId = orderId;
    var extraData = '';
    var paymentCode =
        'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
        'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;
    //puts raw signature
    // console.log("--------------------RAW SIGNATURE----------------");
    var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    // console.log("--------------------SIGNATURE----------------");

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'BaloStore',
        // storeId: 'FashionShop',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });
    return { requestBody, signature };
};

export const momoRefund = ({ orderId, amount, transId }) => {
    // npm install node-rsa
    const pubKey =
        '-----BEGIN PUBLIC KEY-----' +
        'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAiBIo9EMTElPppPejirL1' +
        'cdgCuZUoBzGZF3SyrTp+xdMnIXSOiFYG+zHmI1lFzoEbEd1JwXAUV52gn/oAkUo+' +
        '2qwuqZAPdkm714tiyjvxXE/0WYLl8X1K8uCSK47u26CnOLgNB6iW1m9jog00i9XV' +
        '/AmKI1U8OioLFSp1BwMf3O+jA9uuRfj1Lv5Q0Q7RMtk4tgV924+D8mY/y3otBp5b' +
        '+zX0NrWkRqwgPly6NeXN5LwqRj0LwAEVVwGbpl6V2cztYv94ZHjGzNziFJli2D0V' +
        'pb/HRPP6ibXvllgbL4UXU4Izqhxml8gwd74jXaNaEgNJGhjjeUXR1sAm7Mpjqqgy' +
        'xpx6B2+GpjWtEwvbJuO8DsmQNsm+bJZhw46uf9AuY5VSYy2cAF1XMXSAPNLqYEE8' +
        'oVUki4IWYOEWSNXcQwikJC25rAErbyst/0i8RN4yqgiO/xVA1J1vdmRQTvGMXPGb' +
        'DFpVca4MkHHLrkdC3Z3CzgMkbIqnpaDYoIHZywraHWA7Zh5fDt/t7FzX69nbGg8i' +
        '4QFLzIm/2RDPePJTY2R24w1iVO5RhEbKEaTBMuibp4UJH+nEQ1p6CNdHvGvWz8S0' +
        'izfiZmYIddaPatQTxYRq4rSsE/+2L+9RE9HMqAhQVvehRGWWiGSY1U4lWVeTGq2s' +
        'uCNcMZdgDMbbIaSEJJRQTksCAwEAAQ==' +
        '-----END PUBLIC KEY-----';

    const key = new NodeRSA(pubKey, { encryptionScheme: 'pkcs1' });
    const jsonData = {
        partnerCode: 'MOMO',
        partnerRefId: orderId,
        momoTransId: transId,
        amount: Number(amount),
        description: 'BaloStore trả lại tiền',
    };
    const encrypted = key.encrypt(JSON.stringify(jsonData), 'base64');
    const requestBody = JSON.stringify({
        partnerCode: 'MOMO',
        requestId: orderId,
        hash: encrypted,
        version: 2,
    });
    return { requestBody };
};
