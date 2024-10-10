'use server';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = new URLSearchParams(text);
  const data: { [key: string]: string } = {};

  params.forEach((value, key) => {
    data[key] = value;
  });

  // Extract user_ip
  const forwarded = req.headers.get('x-forwarded-for');
  const user_ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.ip || '';

  const merchant_id = process.env.PAYTR_MERCHANT_ID!;
  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;
  const no_installment = '1';
  const max_installment = '0';
  const currency = 'TRY';
  const test_mode = '1';
  const merchant_ok_url = "https://yourwebsite.com/success";
  const merchant_fail_url = "https://yourwebsite.com/fail";
  const timeout_limit = '30';
  const debug_on = '1';
  const lang = 'tr';

  const merchant_oid = "IN" + Date.now();

  const {
    email,
    payment_amount,
    user_name,
    user_address,
    user_phone,
    basket_items
  } = data;

  const user_basket = Buffer.from(basket_items).toString('base64');
  // Convert payment_amount to kuruş
  const amount_tl = parseFloat(payment_amount);
  const payment_amount_kurus = Math.round(amount_tl * 100).toString();

  // Create hashSTR
  const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount_kurus}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;

  // Create paytr_token
  const paytr_token = hashSTR + merchant_salt;
  const token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

  // PayTR API'sine POST isteği gönderme
  const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      merchant_id: merchant_id,
      merchant_key: merchant_key,
      merchant_salt: merchant_salt,
      email: email,
      payment_amount: payment_amount_kurus,
      merchant_oid: merchant_oid,
      user_name: user_name,
      user_address: user_address,
      user_phone: user_phone,
      merchant_ok_url: merchant_ok_url,
      merchant_fail_url: merchant_fail_url,
      user_basket: user_basket,
      user_ip: user_ip,
      timeout_limit: timeout_limit,
      debug_on: debug_on,
      test_mode: test_mode,
      lang: lang,
      no_installment: no_installment,
      max_installment: max_installment,
      currency: currency,
      paytr_token: token,
    }).toString(),
  });

  const contentType = response.headers.get('content-type');
  let res_data;

  if (contentType && contentType.includes('application/json')) {
    res_data = await response.json();
  } else {
    res_data = await response.text();
  }

  if (res_data.status === 'success') {
    const iframeToken = res_data.token;
    const iframeHTML = `
      <iframe src="https://www.paytr.com/odeme/guvenli/${iframeToken}" frameborder="0" allowtransparency="true" scrolling="no" style="width: 100%; height: 600px;"></iframe>
    `;
    return new NextResponse(iframeHTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } else if (res_data.includes('<iframe')) {
    return new NextResponse(res_data, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } else {
    console.error('Error response from PayTR:', res_data);
    const errorHTML = `
      <html>
        <body>
          <h1>Error</h1>
          <p>${res_data.message || 'An error occurred'}</p>
        </body>
      </html>
    `;
    return new NextResponse(errorHTML, {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}