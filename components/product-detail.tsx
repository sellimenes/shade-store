"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Star, Plus, Minus, Loader } from "lucide-react";
import Image from "next/image";
import { addToCart } from "@/lib/supabase/cart";
import { useToast } from "@/hooks/use-toast";
import { getUser } from "@/hooks/auth";
import { addToCartLocal } from "@/lib/cartClient";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    slug: string;
    cover_img: string;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current) return;
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      setZoomPosition({ x, y });
    },
    []
  );

  const allImages = [product.cover_img, ...product.image];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    setLoading(true); // Set loading to true
    const user = await getUser();
    if (user) {
      const success = await addToCart(parseInt(product.id), quantity);
      if (success) {
        toast({
          title: "Success!",
          description: "Product added to cart",
        });
      } else {
        toast({
          title: "Error!",
          description: "Failed to add product to cart",
          variant: "destructive",
        });
      }
    } else {
      addToCartLocal(parseInt(product.id), quantity);
      toast({
        title: "Success!",
        description: "Product added to cart",
      });
    }
    setLoading(false); // Set loading to false
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col">
              <div
                className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                <div className="absolute inset-0">
                  <Image
                    src={
                      currentImageIndex === -1
                        ? product.cover_img
                        : product.image[currentImageIndex]
                    }
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-center object-cover transition-transform duration-100 ease-out"
                    style={{
                      transform: isZoomed ? `scale(2.5)` : "none",
                      transformOrigin: `${zoomPosition.x * 100}% ${
                        zoomPosition.y * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Thumbnail gallery */}
              <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div
                  className="grid grid-cols-4 gap-6"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index - 1)}
                      className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                        currentImageIndex === index - 1
                          ? "ring-2 ring-indigo-500"
                          : ""
                      }`}
                    >
                      <span className="sr-only">Product image {index + 1}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <Image
                          src={img}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  {product.price.toFixed(2)} ₺
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`${
                          rating < 4 ? "text-yellow-400" : "text-gray-300"
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">4 out of 5 stars</p>
                  <Link
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    117 reviews
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-900">
                  Atmosfer Gece Lambası Ses Kontrolü Yatak Odası Başucu Deforme
                  Lamba Başucu Yatak Odası Arkadaşı Işık Çocuklar için Yatak
                  Odası Ev Dekor
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-sm text-gray-600 font-medium">
                    Quantity:
                  </h3>
                  <div className="ml-2 flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 text-gray-900">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <Button
                  className="max-w-xs flex-1 bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAddToCart}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    "Add to cart"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  className="max-w-xs flex-1 ml-3"
                  onClick={() => toast({ title: "Added to wishlist" })}
                >
                  Buy Now
                </Button>
              </div>

              <Tabs defaultValue="description" className="mt-8">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <div>
                    <h1>Genel Bakış</h1>
                    <p>
                      Atmosfer gece lambası ses kontrolü yatak odası başucu
                      deforme lamba başucu yatak odası arkadaşı ışık çocuklar
                      için yatak odası ev dekor
                    </p>

                    <h2>Özellikler:</h2>
                    <ol>
                      <li>
                        <strong>Büyüleyici deniz deneyimi:</strong> Yaratıcı
                        denizanası ışığı, gerçek yüzme hareketi ve tam renkli,
                        otomatik bisiklet gradyan aydınlatma efektleri ile
                        okyanus sakinliğini evinize getirir ve herhangi bir
                        odada sakin bir sualtı ortamı yaratır.
                      </li>
                      <li>
                        <strong>Çift modlu yenilik:</strong> İki etkileşimli
                        modda atmosfer gece ışığıyla iletişim kurun: sürekli
                        sakin olmak için eller serbest otomatik ayar ve en
                        sevdiğiniz müzikle LED ışık&apos;ı hayata geçiren ses
                        etkinleştirilmiş bir mod, alanınıza dinamik yetenek
                        ekleme.
                      </li>
                      <li>
                        <strong>Sezgisel tasarım ve rotasyon:</strong> Dokuz
                        dönebilir dokunaca, LED akıllı denizanası gece lambası,
                        bir denizanasının doğal hareketini taklit eder, zarif ve
                        hipnotik dansı ile büyüleyici izleyicileri, hayal gücü
                        ve merak uyandırmak için mükemmeldir.
                      </li>
                      <li>
                        <strong>Genişletilmiş pil ömrü ve çok yönlülük:</strong>{" "}
                        Yatak odası başucu deforme lamba uzun ömürlü aydınlatma
                        sunan bir 1000mAh lityum pil ve kullanışlı tip-c şarj
                        ile donatılmıştır. Bir komidin, kafelerde, barlarda veya
                        kamp gezileri ve sütlü çay standları gibi dış mekan
                        ayarlarında atmosferik aydınlatma için çok yönlü.
                      </li>
                      <li>
                        <strong>Sevimli ve güvenli yapı:</strong> Bu karikatür
                        denizanası şekli gece lambası, hem çocuklara hem de
                        yetişkinlere sevinç veren sevimli, parlayan bir form ile
                        hem asılı hem de ayakta kurulum için tasarlanmıştır.
                        Pürüzsüz, yuvarlak kenarları, kullanım sırasında veya
                        ışığı ayarlarken herhangi bir el yaralanmasını önleyerek
                        güvenliği sağlar.
                      </li>
                    </ol>

                    <h2>Şartname:</h2>
                    <ul>
                      <li>
                        <strong>Menşei:</strong> ankara çin
                      </li>
                      <li>
                        <strong>Ampuller dahil:</strong> evet
                      </li>
                      <li>
                        <strong>Şekil:</strong> mantar
                      </li>
                      <li>
                        <strong>Tip:</strong> atmosfer
                      </li>
                      <li>
                        <strong>Sertifikasyon:</strong> ce
                      </li>
                      <li>
                        <strong>Gövde malzemesi:</strong> plastik
                      </li>
                      <li>
                        <strong>Tip (isteğe bağlı):</strong> asılı tip, Asılı
                        tip + taban
                      </li>
                      <li>
                        <strong>Boyut:</strong> 85x85x16 mm/3.35x3.35x6.54inch
                      </li>
                      <li>
                        <strong>Stil:</strong> Modern ve basit
                      </li>
                      <li>
                        <strong>Model:</strong> ses aktive denizanası ışık/gece
                        lambası/atmosfer ışığı
                      </li>
                      <li>
                        <strong>Fonksiyon:</strong> tam renkli degrade, akıllı
                        dokunmatik ayaklar
                      </li>
                      <li>
                        <strong>Kurulum yöntemi:</strong> asılabilir veya inşa
                        edilebilir
                      </li>
                      <li>
                        <strong>Patent:</strong> + CE + FCC + ROHS
                      </li>
                    </ul>

                    <h3>Not:</h3>
                    <p>
                      Farklı monitör ve ışık efekti nedeniyle, öğenin gerçek
                      rengi resimlerde g
                    </p>
                  </div>
                </TabsContent>
                <TabsContent
                  value="specifications"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <ul>
                    <li>Bluetooth 5.0 connectivity</li>
                    <li>Active Noise Cancellation (ANC)</li>
                    <li>40mm dynamic drivers</li>
                    <li>Up to 30 hours of battery life</li>
                    <li>Quick charge: 5 minutes for 1 hour of playback</li>
                    <li>Touch controls for easy operation</li>
                    <li>Built-in microphone for calls</li>
                    <li>Foldable design for easy storage</li>
                  </ul>
                </TabsContent>
                <TabsContent
                  value="shipping"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <p>
                    We offer free standard shipping on all orders over $100. For
                    orders under $100, a flat rate of $10 is applied. Standard
                    shipping typically takes 3-5 business days.
                  </p>
                  <p>
                    Express shipping is available for an additional $15 and
                    typically arrives within 1-2 business days. International
                    shipping rates and times vary by location.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-24">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Customers also purchased
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <Card key={product}>
                  <CardHeader>
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={`Related Product ${product}`}
                        width={500}
                        height={300}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Related Product {product}
                    </CardTitle>
                    <p className="mt-1 text-sm text-gray-500">
                      This is a description for Related Product {product}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ${(99.99 * product).toFixed(2)}
                    </span>
                    <Button variant="outline">View</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
