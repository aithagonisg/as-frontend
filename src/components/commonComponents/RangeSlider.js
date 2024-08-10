import React, { useState, useEffect } from "react";

const RangeSlider = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const min = 0;
  const max = 3000;
  const [minThumb, setMinThumb] = useState(0);
  const [maxThumb, setMaxThumb] = useState(0);
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    minTrigger();
    maxTrigger();
  }, [minPrice, maxPrice]);

  const minTrigger = () => {
    const adjustedMinPrice = Math.min(minPrice, maxPrice - 50);
    setMinPrice(adjustedMinPrice);
    setMinThumb(((adjustedMinPrice - min) / (max - min)) * 100);
  };

  const maxTrigger = () => {
    const adjustedMaxPrice = Math.max(maxPrice, minPrice + 50);
    setMaxPrice(adjustedMaxPrice);
    setMaxThumb(100 - ((adjustedMaxPrice - min) / (max - min)) * 100);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative max-w-lg w-full">
        {" "}
        {/* Reduced width */}
        <div>
          <input
            id="min"
            type="range"
            step="50"
            min={min}
            max={max}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className={`absolute appearance-none z-20 h-2 w-full opacity-0 ${
              !isMax ? "cursor-pointer" : "pointer-events-none"
            }`}
          />

          <input
            id="max"
            type="range"
            step="50"
            min={min}
            max={max}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={`absolute ${
              isMax ? "cursor-pointer" : "pointer-events-none"
            } appearance-none z-20 h-2 w-full opacity-0`}
          />

          <div className="relative z-10 h-2">
            <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200  hover:cursor-pointer"></div>
            <div
              className="absolute z-20 top-0 bottom-0 rounded-md bg-primary"
              style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
            ></div>
            <div
              id="minThumb"
              className="absolute z-30 w-6 h-6 top-0 bg-primary rounded-full -mt-2 -ml-1 hover:cursor-pointer"
              style={{ left: `${minThumb}%` }}
              onMouseEnter={() => setIsMax(false)}
            ></div>
            <div
              id="maxThumb"
              className="absolute z-30 w-6 h-6 top-0 right-0 bg-primary rounded-full -mt-2 -mr-3 hover:cursor-pointer"
              style={{ right: `${maxThumb}%` }}
              onMouseEnter={() => setIsMax(true)}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center py-5">
          <div>{minPrice}</div>
          <div>{maxPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
