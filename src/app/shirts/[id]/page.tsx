import { shirts } from "@/lib/utils";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <main className="flex gap-8 w-full px-4 sm:px-[5%] max-w-fit mx-auto">
      <Image
        src={image}
        alt={name}
        width={400}
        height={600}
        className="w-96 h-auto"
      />

      <div className="flex mt-4 sm:mt-2 gap-2 flex-col pt-6">
        {/* Product Name */}
        <div className="flex flex-row flex-nowrap justify-between items-center text-3xl font-semibold">
          {name}
        </div>

        {/* Product Type */}
        <div className="flex flex-col gap-4 ">
          <h2 className="mobile-body-m text-slate-600">{type}</h2>
          <p>{price}</p>
        </div>

        <button
          className="w-full border border-secondary hover:bg-secondary/80 hover:text-white rounded-full transition-all px-6 py-2"
          type="button"
        >
          Add to cart
        </button>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
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
    </main>
  );
}

export default DetialsPage;
