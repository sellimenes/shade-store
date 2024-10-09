// import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('req', req);
    const text = await req.text();
    console.log('text', text);

    return new NextResponse('OK', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

// export async function POST(req: any) {
//   const text = await req.text();
//   const params = new URLSearchParams(text);
//   const data: { [key: string]: string } = {};

//   params.forEach((value, key) => {
//     data[key] = value;
//   });

//   const {
//     merchant_oid,
//     status,
//     total_amount,
//     hash,
//     failed_reason_code,
//     failed_reason_msg,
//     test_mode,
//     payment_type,
//     currency,
//     payment_amount
//   } = data;

//   // Hash doğrulaması için gerekli olan secret key ve merchant salt
//   const merchant_key = 'YOUR_MERCHANT_KEY';
//   const merchant_salt = 'YOUR_MERCHANT_SALT';
//   const paytr_token = `${merchant_oid}${merchant_salt}${status}${total_amount}`;
//   const calculatedHash = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

//   if (hash !== calculatedHash) {
//     return new Response('Invalid hash', { status: 400 });
//   }

//   // İşlemin başarılı olup olmadığını kontrol et
//   if (status === 'success') {
//     // Başarılı işlem için gerekli işlemleri yapın (örneğin, veritabanına kaydetme)
//     console.log('Payment successful:', data);
//   } else {
//     // Başarısız işlem için gerekli işlemleri yapın
//     console.log('Payment failed:', data);
//   }

//   // Yanıt olarak "OK" döndür
//   return new Response('OK', { status: 200 });
// }