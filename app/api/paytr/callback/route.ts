import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = new URLSearchParams(text);
  const data: { [key: string]: string } = {};

  params.forEach((value, key) => {
    data[key] = value;
  });

  const {
    merchant_oid,
    status,
    total_amount,
    hash,
  } = data;

  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;

  // Recreate the hash string sent by PayTR
  const recreatedHash = crypto
    .createHmac('sha256', merchant_key)
    .update(`${merchant_oid}${merchant_salt}${status}${total_amount}`)
    .digest('base64');

  // Compare the recreated hash with the one from PayTR
  if (recreatedHash !== hash) {
    return new NextResponse('Invalid hash', { status: 400 });
  }

  if (status === 'success') {
    // Handle the successful payment (e.g., update your database)
    console.log('Payment success for order:', merchant_oid);
  } else {
    // Handle failed payment
    console.log('Payment failed for order:', merchant_oid);
  }

  // Return 'OK' to acknowledge the callback was received
  const response = new NextResponse('OK', { status: 200 });

  // Redirect to the main page after sending the 'OK' response
  response.headers.set('Refresh', '0; url=http://localhost:3000/');

  return response;
}