import React, { useState } from "react";

interface DescriptionTooltipProps {
  description: string;
}

const MAX_CHARS: number = 50; // Adjust this based on your design

export default function DescriptionTooltip({
  description,
}: DescriptionTooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleShowTooltip = () => setIsTooltipVisible(true);
  const handleHideTooltip = () => setIsTooltipVisible(false);

  const content =
    description.length > MAX_CHARS ? (
      <span className="font-light md:font-normal text-xs md:text-base">
        {description.slice(0, MAX_CHARS)}...
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={handleShowTooltip}
        >
          Read More
        </span>
      </span>
    ) : (
      description
    );

  return (
    <div className="relative">
      <p className="text-gray-500 text-ellipsis">{content}</p>
      {isTooltipVisible && (
        <div className="tooltip absolute top-full left-0 bg-white p-2 rounded shadow-md overflow-y-scroll">
          <p className="font-light md:font-normal text-xs md:text-base">
            {description}
          </p>
          <button
            onClick={handleHideTooltip}
            className="text-zinc-100 bg-red-500 px-1 md:p-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
