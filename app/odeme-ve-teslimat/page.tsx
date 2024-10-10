"use server";

const OdemeVeTeslimat = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Ödeme ve Teslimat</h1>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Sitemiz üzerinden kredi kartlarınız ile</strong>
          <p>
            Her türlü kredi kartınıza online tek ödeme ya da online taksit
            imkânlarımızdan yararlanabilirsiniz. Online ödemelerinizde
            siparişiniz sonunda kredi kartınızdan tutar çekim işlemi
            gerçekleşecektir. Muhtemel sipariş iptali veya stok sorunları
            nedeniyle sipariş iptallerinde kredi kartınıza para iadesi 5 iş günü
            içerisinde yapılacaktır.
          </p>
        </li>
        <li>
          <strong>Sipariş Bedeli İadesi</strong>
          <p>
            Siparişlerinizin olası sebeplerle iptali durumunda; 5 iş günü
            içerisinde ürün bedeli hesabınıza ve/veya kredi kartınıza iade
            edilir. Ancak, banka hesap bilgilerinizi ve/veya kredi kartı
            bilgilerinizi doğru ve eksiksiz olarak şirketimiz finans
            yetkililerine bildirmeniz gerekmektedir.
          </p>
        </li>
        <li>
          <strong>Teslimat</strong>
          <p>
            Sipariş etmiş olduğunuz ürünleri aynı gün işleme almaya gayret
            ediyoruz. Temini zaman alan ürünler için ürün sayfalarında veya
            kargo bilgisi başlığı altında teslim süreleri ile ilgili her ürün
            için detaylı bilgi verilmektedir. Gecikmesi muhtemel teslimat
            durumunda size bilgi verilecektir. Ürün teslimatının aksamadan
            gerçekleştirilebilmesi için lütfen gün içinde bulunduğunuz yerin
            adresini teslimat adresi olarak bildiriniz. Talepleriniz sipariş
            sonunda belirlemiş olduğunuz teslimat tipine göre hazırlanmak üzere
            işleme alınacaktır. Müşteri temsilcimize danışarak değişik teslimat
            şartları konusunda görüşebilirsiniz. Ayrıca kargo teslimatları
            sadece Türkiye için geçerlidir.
          </p>
        </li>
        <li>
          <strong>Ödeme Takibi</strong>
          <p>
            Söz konusu sistem herhangi bir sorun nedeni ile işlemi
            gerçekleştiremiyorsa ödeme sayfası sonucunda ziyaretçimiz bu
            durumdan haberdar edilmektedir. Belirtilen adreste herhangi bir hata
            durumunda teslimatı gerçekleşemeyen sipariş ile ilgili olarak
            siparişi veren ile bağlantı kurulmaktadır. Ziyaretçimiz tarafından
            belirtilen e-posta adresinin geçerliliği siparişin aktarılmasını
            takiben gönderilen otomatik e-posta ile teyit edilmektedir.
            Teslimatın gerçekleşmesi konusunda müşteri kadar kredi kartı
            sistemini kullandığımız bankaya karşı da sorumluluğumuz söz
            konusudur.
          </p>
        </li>
      </ol>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Lütfen dikkat ediniz!</h3>
        <p>
          {`Sevkiyat sırasında zarar gördüğünü düşündüğünüz paketleri, teslim
          aldığınız firma yetkilisi önünde açıp kontrol ediniz. Eğer üründe
          herhangi bir zarar olduğunu düşünüyorsanız kargo firmasına tutanak
          tutturularak ürünü teslim almayınız. Ürün teslim alındıktan sonra
          kargo firmasının görevini tam olarak yerine getirdiği kabul
          edilmektedir. Ürün hasarlı ise: Hazırlamış olduğunuz tutanağı en kısa
          zamanda bizlere ${process.env.CONTACT_MAIL} mail adresi üzerinden
          gönderiniz. Bu işlemleri gerçekleştirdiğiniz takdirde paketinizle
          ilgili çalışmalara başlayarak, en kısa zamanda teslimatın
          tekrarlanmasını sağlayacağız. Bu e-posta içinde ürünü neden iade etmek
          istediğinizi kısaca açıklarsanız ürün ile ilgili çalışmalarımızda bize
          yardımcı olmuş olursunuz.`}
        </p>
      </div>
    </div>
  );
};

export default OdemeVeTeslimat;
