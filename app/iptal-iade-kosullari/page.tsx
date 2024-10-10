import React from "react";

type Props = {};

const IptalIadeKosullari = (props: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">İptal ve İade Koşulları</h1>
      <h2 className="text-2xl font-semibold mb-4">
        TÜKETİCİ HAKLARI – CAYMA – İPTAL İADE KOŞULLARI
      </h2>
      <h3 className="text-xl font-semibold mt-6 mb-4">GENEL:</h3>
      <p>
        Kullanmakta olduğunuz web sitesi üzerinden elektronik ortamda sipariş
        verdiğiniz takdirde, size sunulan ön bilgilendirme formunu ve mesafeli
        satış sözleşmesini kabul etmiş sayılırsınız. Alıcılar, satın aldıkları
        ürünün satış ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin
        Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
        (RG:27.11.2014/29188) hükümleri ile yürürlükteki diğer yasalara tabidir.
        Ürün sevkiyat masrafı olan kargo ücretleri bizim tarafımızdan
        ödenecektir. Satın alınan her bir ürün, 30 günlük yasal süreyi aşmamak
        kaydı ile alıcının gösterdiği adresteki kişi ve/veya kuruluşa teslim
        edilir. Bu süre içinde ürün teslim edilmez ise, Alıcılar sözleşmeyi sona
        erdirebilir. Satın alınan ürün, eksiksiz ve siparişte belirtilen
        niteliklere uygun ve varsa garanti belgesi, kullanım kılavuzu gibi
        belgelerle teslim edilmek zorundadır. Satın alınan ürünün satılmasının
        imkansızlaşması durumunda, satıcı bu durumu öğrendiğinden itibaren 3 gün
        içinde yazılı olarak alıcıya bu durumu bildirmek zorundadır. 14 gün
        içinde de toplam bedel Alıcı’ya iade edilmek zorundadır.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        SATIN ALINAN ÜRÜN BEDELİ ÖDENMEZ İSE:
      </h3>
      <p>
        Alıcı, satın aldığı ürün bedelini ödemez veya banka kayıtlarında iptal
        ederse, Satıcının ürünü teslim yükümlülüğü sona erer.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        KREDİ KARTININ YETKİSİZ KULLANIMI İLE YAPILAN ALIŞVERİŞLER:
      </h3>
      <p>
        Ürün teslim edildikten sonra, alıcının ödeme yaptığı kredi kartının
        yetkisiz kişiler tarafından haksız olarak kullanıldığı tespit edilirse
        ve satılan ürün bedeli ilgili banka veya finans kuruluşu tarafından
        Satıcı'ya ödenmez ise, Alıcı, sözleşme konusu ürünü 3 gün içerisinde
        nakliye gideri Alıcı’ya ait olacak şekilde Satıcı’ya iade etmek
        zorundadır.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        ÖNGÖRÜLEMEYEN SEBEPLERLE ÜRÜN SÜRESİNDE TESLİM EDİLEMEZ İSE:
      </h3>
      <p>
        Satıcı’nın öngöremeyeceği mücbir sebepler oluşursa ve ürün süresinde
        teslim edilemez ise, durum Alıcı’ya bildirilir. Alıcı, siparişin
        iptalini, ürünün benzeri ile değiştirilmesini veya engel ortadan kalkana
        dek teslimatın ertelenmesini talep edebilir. Alıcı siparişi iptal
        ederse; ödemeyi nakit ile yapmış ise iptalinden itibaren 14 gün içinde
        kendisine nakden bu ücret ödenir. Alıcı, ödemeyi kredi kartı ile yapmış
        ise ve iptal ederse, bu iptalden itibaren yine 14 gün içinde ürün bedeli
        bankaya iade edilir, ancak bankanın alıcının hesabına 2-3 hafta
        içerisinde aktarması olasıdır.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        ALICININ ÜRÜNÜ KONTROL ETME YÜKÜMLÜLÜĞÜ:
      </h3>
      <p>
        Alıcı, sözleşme konusu mal/hizmeti teslim almadan önce muayene edecek;
        ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı mal/hizmeti kargo
        şirketinden teslim almayacaktır. Teslim alınan mal/hizmetin hasarsız ve
        sağlam olduğu kabul edilecektir. ALICI , Teslimden sonra mal/hizmeti
        özenle korunmak zorundadır. Cayma hakkı kullanılacaksa mal/hizmet
        kullanılmamalıdır. Ürünle birlikte Fatura da iade edilmelidir.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">CAYMA HAKKI:</h3>
      <p>
        ALICI; satın aldığı ürünün kendisine veya gösterdiği adresteki
        kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde,
        SATICI’ya aşağıdaki iletişim bilgileri üzerinden bildirmek şartıyla
        hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe
        göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        SATICININ CAYMA HAKKI BİLDİRİMİ YAPILACAK İLETİŞİM BİLGİLERİ:
      </h3>
      <p>
        <strong>ŞİRKET ADI/UNVANI:</strong> {process.env.COMPANY_NAME}
        <br />
        <strong>ADRES:</strong> {process.env.COMPANY_ADDRESS}
        <br />
        <strong>EPOSTA:</strong> {process.env.CONTACT_MAIL}
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        CAYMA HAKKININ SÜRESİ:
      </h3>
      <p>
        Alıcı, satın aldığı eğer bir hizmet ise, bu 14 günlük süre sözleşmenin
        imzalandığı tarihten itibaren başlar. Cayma hakkı süresi sona ermeden
        önce, tüketicinin onayı ile hizmetin ifasına başlanan hizmet
        sözleşmelerinde cayma hakkı kullanılamaz. Cayma hakkının kullanımından
        kaynaklanan masraflar SATICI’ ya aittir. Cayma hakkının kullanılması
        için 14 (on dört) günlük süre içinde SATICI' ya iadeli taahhütlü posta,
        faks veya eposta ile yazılı bildirimde bulunulması ve ürünün işbu
        sözleşmede düzenlenen "Cayma Hakkı Kullanılamayacak Ürünler" hükümleri
        çerçevesinde kullanılmamış olması şarttır.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        CAYMA HAKKININ KULLANIMI:
      </h3>
      <p>
        3. kişiye veya ALICI’ ya teslim edilen ürünün faturası, (İade edilmek
        istenen ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş
        olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası
        kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği
        takdirde tamamlanamayacaktır.) İade formu, İade edilecek ürünlerin
        kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve
        hasarsız olarak teslim edilmesi gerekmektedir.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">İADE KOŞULLARI:</h3>
      <p>
        SATICI, cayma bildiriminin ardından ürünün kendisine ulaşmasından
        itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI’yı borç
        altına sokan belgeleri ALICI’ ya iade etmek ve 20 günlük süre içerisinde
        malı iade almakla yükümlüdür. ALICI’ nın kusurundan kaynaklanan bir
        nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa
        ALICI kusuru oranında SATICI’ nın zararlarını tazmin etmekle yükümlüdür.
        Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen
        kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında
        faydalanılan indirim miktarı iptal edilir.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER:
      </h3>
      <p>
        ALICI’nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda
        hazırlanan ve geri gönderilmeye müsait olmayan, iç giyim alt parçaları,
        mayo ve bikini altları, makyaj malzemeleri, teknolojik aletler, tek
        kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son kullanma
        tarihi geçme ihtimali olan mallar, ALICI’ya teslim edilmesinin ardından
        ALICI tarafından ambalajı açıldığı takdirde iade edilmesi sağlık ve
        hijyen açısından uygun olmayan ürünler, teslim edildikten sonra başka
        ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan
        ürünler, Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve
        dergi gibi süreli yayınlara ilişkin mallar, Elektronik ortamda anında
        ifa edilen hizmetler veya tüketiciye anında teslim edilen gayri maddi
        mallar, ile ses veya görüntü kayıtlarının, kitap, dijital içerik,
        yazılım programlarının, veri kaydedebilme ve veri depolama cihazlarının,
        bilgisayar sarf malzemelerinin, ambalajının ALICI tarafından açılmış
        olması halinde iadesi Yönetmelik gereği mümkün değildir. Ayrıca Cayma
        hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan
        hizmetlere ilişkin cayma hakkının kullanılması da Yönetmelik gereği
        mümkün değildir. Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri,
        teknolojik ürünler, mayo, bikini, kitap, kopyalanabilir yazılım ve
        programlar, DVD, VCD, CD ve kasetler ile kırtasiye sarf malzemeleri
        (toner, kartuş, şerit vb.) iade edilebilmesi için ambalajlarının
        açılmamış, denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-4">
        TEMERRÜT HALİ VE HUKUKİ SONUÇLARI:
      </h3>
      <p>
        ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde
        düştüğü takdirde, kart sahibi banka ile arasındaki kredi kartı
        sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu
        olacağını kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki
        yollara başvurabilir; doğacak masrafları ve vekâlet ücretini ALICI’dan
        talep edebilir ve her koşulda ALICI’nın borcundan dolayı temerrüde
        düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI’nın
        uğradığı zarar ve ziyanını ödeyeceğini kabul eder.
      </p>
    </div>
  );
};

export default IptalIadeKosullari;
