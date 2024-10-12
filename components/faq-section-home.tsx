import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSectionHome = () => {
  return (
    <section className="w-full bg-black py-6">
      <div className="container mx-auto">
        <h3 className="text-center text-5xl text-white font-bold">
          Sık Sorulan Sorular
        </h3>
        <Accordion
          type="single"
          collapsible
          className="text-white max-w-2xl mx-auto mt-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Siparişimi nasıl takip ederim?</AccordionTrigger>
            <AccordionContent>
              Siparişinizi kargoladıktan sonra size bir gönderi onay e-postası
              göndereceğiz ve bu e-postada &apos;Siparişi Takip Et&apos; düğmesi
              yer alacak. Bu sizi doğrudan kargo takip sitesine götürecektir,
              böylece kargo güncellemelerini takip edebilirsiniz!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Kargo teslimatı ne kadar sürer?</AccordionTrigger>
            <AccordionContent>
              Türkiye&apos;nin dört bir yanına en hızlı şekilde ürünlerimizi
              ücretsiz şekilde yolluyoruz. Sipariş verdikten hemen sonra
              siparişiniz işleme alınır ve 7-15 iş günü içerisinde size teslim
              edilir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              İade ve değişim yapabilir miyim?
            </AccordionTrigger>
            <AccordionContent>
              HeliFrag&apos;i seviyoruz ve sizin de seveceğinizden eminiz! Bu
              yüzden 14 Günlük, Risksiz Deneme sunuyoruz. Eğer HeliFrag&apos;i
              beğenmezseniz, paranızı iade edeceğiz.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSectionHome;
