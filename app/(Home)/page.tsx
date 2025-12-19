import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="bg-white py-10 px-60">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* left */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-snug">
              Super Delicious Pizza in <br />
              <span className="text-primary block">Only 45 Minutes!</span>
            </h1>

            <p className="text-lg mt-4 leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>

            <Button className="mt-5 text-base rounded-full py-3 px-5 font-semibold">
              Get your pizza now
            </Button>
          </div>

          {/* right image */}
          <div className="flex-shrink-0">
            <Image
              src="/pizza-main.png"
              alt="pizza"
              width={320}
              height={320}
              className="w-auto h-auto"
            />
          </div>

        </div>
      </section>



    </>
  );
}
