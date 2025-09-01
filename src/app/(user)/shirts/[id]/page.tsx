import { shirts } from "@/lib/utils";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SizeSelector from "@/components/ui/sizes";
import ProductCard from "@/components/product_card";

interface Props {
  params: {
    id: string;
  };
}

function DetialsPage({ params }: Props) {
  const { id } = params;
  const { image, name, price, type, description, shippingAndReturns } =
    shirts.filter((shirt) => shirt.id === id)[0];

  return (
    <main className="w-full">
      <section className="flex gap-8 w-full px-4 sm:px-[15%]  max-w-fit mx-auto">
        <div className="relative h-fit min-w-md">
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className="w-full h-auto object-cover object-center"
          />
        </div>
        <div className="w-full">
          <div className="flex mt-4 sm:mt-2 flex-col py-2">
            {/* Product Name */}
            <div className="flex flex-row flex-nowrap justify-between items-center text-2xl font-medium">
              {name}
            </div>

            {/* Product Type */}
            <div className="flex flex-col gap-2 mt-0.5">
              <h2 className="text-slate-600">{type}</h2>
              <p className="text-xl font-semibold">{price}</p>
            </div>
            <SizeSelector />
            <button
              className="w-full border border-secondary hover:bg-secondary/80 hover:text-white rounded-full transition-all px-6 py-2 mt-4 cursor-pointer"
              type="button"
            >
              Add to cart
            </button>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-md"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Shirt Description</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {shippingAndReturns}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="mt-32 px-4 sm:px-[5%]">
        <h2 className="text-3xl font-semibold text-center">Related Shirts</h2>
        <div className="grid sm:grid-cols-3 gap-x-6 gap-y-10 px-4 mt-12">
          {shirts.slice(0, 5).map(({ id, href, image, name, price, type }) => (
            <ProductCard
              key={id}
              href={href}
              image={image}
              name={name}
              price={price}
              type={type}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default DetialsPage;
