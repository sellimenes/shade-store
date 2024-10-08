import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const text = await req.text();
  const params = new URLSearchParams(text);
  const data: { [key: string]: string } = {};

  params.forEach((value, key) => {
    data[key] = value;
  });

  // Form verilerini işleme (örneğin, ödeme API'sine gönderme)
  console.log("Form Data:", data);

  // Tam URL'yi oluştur
  const redirectUrl = new URL('/profile', req.nextUrl.origin);

  // Başarılı işlem sonucunda kullanıcıya yanıt gönder
  return NextResponse.redirect(redirectUrl.toString());
}