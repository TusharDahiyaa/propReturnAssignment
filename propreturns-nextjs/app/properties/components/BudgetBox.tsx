"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/multiRangeSlider.css";

interface Props {
  min: number;
  max: number;
  fetchProperties: (minVal: number, maxVal: number) => void;
}

const targetValues = [
  {
    min: 0,
    max: 1,
  },
  {
    min: 3,
    max: 5,
  },
  {
    min: 5,
    max: 10,
  },
  {
    min: 10,
    max: 25,
  },
  {
    topValue: 25,
  },
];

export default function BudgetBox({ min, max, fetchProperties }: Props) {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  useEffect(() => {
    const rangeWidth = ((maxVal - minVal) / (max - min)) * 100;
    const rangeLeft = ((minVal - min) / (max - min)) * 100;
    if (range.current) {
      range.current.style.width = `${rangeWidth}%`;
      range.current.style.left = `${rangeLeft}%`;
    }
  }, [min, max, minVal, maxVal]);

  // Convert value to lakhs
  const formatToLakhs = (value: number) => {
    return (value / 100000).toFixed(1);
  };

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  async function handlePropertiesByBudget() {
    try {
      // Call the fetchPropertiesByBudget callback with minVal and maxVal
      await fetchProperties(minVal, maxVal);
    } catch (err) {
      console.log("Error while finding properties by budget: " + err);
    }
  }

  return (
    <div className="md:flex gap-20 my-5 w-full md:w-[80%] justify-between border-2 rounded-xl md:overflow-hidden p-4">
      <div className="md:w-[40%] mb-5 md:mb-0">
        <h1 className="text-2xl font-medium my-2">
          Please share your budget with us
        </h1>
        <p className="font-light">
          We want to respect your time and help you find the perfect property
          fast.
        </p>
        <img
          src="./logo_best.avif"
          className="hidden md:block w-36 h-11 mb-1 mt-10"
          alt=""
        />
      </div>
      <div className="md:w-[50%]">
        <p className="mt-2 mb-5 text-xs hidden md:block">Select budget</p>
        {document.body.clientWidth < 500 ? (
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="border-y-2 border-zinc-500 border-l-2 p-2 w-14 rounded-l-lg text-center">
                  {formatToLakhs(minVal)}
                </p>
                <p className="border-2 p-2 border-zinc-500 rounded-r-lg me-4 font-semibold">
                  L
                </p>
              </div>
              <div className="flex items-center">
                <p className="border-y-2 border-zinc-500 border-l-2 p-2 w-14 rounded-l-lg ms-4 text-center">
                  {formatToLakhs(maxVal)}
                </p>
                <p className="border-2 p-2 border-zinc-500 rounded-r-lg font-semibold">
                  L
                </p>
              </div>
            </div>
            <div className="my-5 md:my-0">
              <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                step={50000}
                onChange={(event) => {
                  const value = Math.min(
                    Number(event.target.value),
                    maxVal - 1
                  );
                  setMinVal(value);
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
              />
              <input
                type="range"
                min={min}
                max={max}
                step={50000}
                value={maxVal}
                onChange={(event) => {
                  const value = Math.max(
                    Number(event.target.value),
                    minVal + 1
                  );
                  setMaxVal(value);
                }}
                className="thumb thumb--right"
              />

              <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="border-y-2 border-zinc-500 border-l-2 p-2 w-14 rounded-l-lg text-center">
                {formatToLakhs(minVal)}
              </p>
              <p className="border-2 p-2 border-zinc-500 rounded-r-lg me-4 font-semibold">
                L
              </p>
            </div>
            <div className="my-5 md:my-0">
              <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                step={50000}
                onChange={(event) => {
                  const value = Math.min(
                    Number(event.target.value),
                    maxVal - 1
                  );
                  setMinVal(value);
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
              />
              <input
                type="range"
                min={min}
                max={max}
                step={50000}
                value={maxVal}
                onChange={(event) => {
                  const value = Math.max(
                    Number(event.target.value),
                    minVal + 1
                  );
                  setMaxVal(value);
                }}
                className="thumb thumb--right"
              />

              <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
              </div>
            </div>
            <div className="flex items-center">
              <p className="border-y-2 border-zinc-500 border-l-2 p-2 w-14 rounded-l-lg ms-4 text-center">
                {formatToLakhs(maxVal)}
              </p>
              <p className="border-2 p-2 border-zinc-500 rounded-r-lg font-semibold">
                L
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mt-10 mb-5 flex-wrap">
          {targetValues.map((value, index) => {
            return (
              <div
                className="mx-1 md:mx-0 text-xs rounded-full border px-2 py-2 drop-shadow-sm cursor-pointer text-nowrap font-light"
                key={index + Math.floor(Math.random() + 1)}
              >
                {value.topValue === 25 ? (
                  <p
                    onClick={() => {
                      setMinVal(value.topValue * 100000);
                      setMaxVal(value.topValue * 100000);
                    }}
                  >
                    {value.topValue} Lakhs+
                  </p>
                ) : (
                  value.max && (
                    <p
                      onClick={() => {
                        setMinVal(value.min * 100000);
                        setMaxVal(value.max * 100000);
                      }}
                    >
                      {value.min}-{value.max} Lakhs
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
        <button
          className="text-center font-light border w-full tracking-wide mb-5 py-2 rounded-xl"
          onClick={() => {
            handlePropertiesByBudget();
          }}
        >
          Show results
        </button>
      </div>
    </div>
  );
}

BudgetBox.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  fetchProperties: PropTypes.func.isRequired,
};
