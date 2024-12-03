import React from "react";
import { PricingPlan } from "./pricing-section";
import { Check } from "lucide-react";

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}: PricingPlan) => {
  return (
    <div className="border flex flex-col justify-between rounded-lg bg-white/20 h-full p-6 hover:shadow-md text-left relative hover:transition-all">
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">${price}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">{title}</h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-400 opacity-25 my-3"></div>
        <ul>
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex flex-row items-center text-gray-700 gap-2 my-2"
            >
              <div className="rounded-full flex items-center justify-center size-4 mr-2 bg-gray-900">
                <Check className="text-white" width={10} height={10} />
              </div>
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="bg-gray-900 py-2 mt-3 rounded-lg text-white w-full">
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
