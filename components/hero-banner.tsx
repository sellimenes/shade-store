import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const HeroBanner = () => {
  return (
    <section className="w-full h-[45rem] relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <Image
        src="/hero-banner.webp"
        alt="Hero Banner"
        layout="fill"
        objectFit="cover"
      />
      <div className="z-20 relative w-full h-full flex items-center justify-end flex-col py-20">
        <p className="text-white text-5xl font-bold">
          Estetik & Ferahlık Bir Arada
        </p>
        <Link href="/products/helifrag">
          <Button
            size="lg"
            className="mt-4 font-semibold"
            variant={"secondary"}
          >
            Helifrag ile Tanış
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
