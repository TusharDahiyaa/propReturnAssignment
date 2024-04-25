"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import DescriptionTooltip from "./DescriptionTooltip";
import ShortlistedProperty from "./ShortlistedProperty";
import BudgetBox from "./BudgetBox";
import Image from "next/image";
const commaSeparate = require("indian-number-format");

interface Property {
  _id: number;
  name: string;
  description: String;
  address: String;
  city: String;
  state: String;
  country: String;
  postalCode: String;
  size: Number;
  rent: Number;
  facilities: [String];
  images: [String]; // Array of image URLs
  available: Boolean;
  createdAt: Date;
}

export default function FetchProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCurrentPage = localStorage.getItem("currentPage");
      return storedCurrentPage ? parseInt(storedCurrentPage) : 1;
    }
    return 1;
  });
  const [shortlistedProperties, setShortlistedProperties] = useState<
    Property[]
  >([]);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(25000000);
  const [propertiesPerPage, setPropertiesPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(
      "shortlistedProperties",
      JSON.stringify(shortlistedProperties)
    );
  }, [shortlistedProperties]);

  const fetchProperties = async (minValue: number, maxValue: number) => {
    setMinVal(minValue);
    setMaxVal(maxValue);
    setCurrentPage(1);
    fetchPropertiesByBudget(minValue, maxValue);
  };

  useEffect(() => {
    fetchProperties(minVal, maxVal);
  }, [currentPage, propertiesPerPage]);

  const fetchPropertiesByBudget = async (minVal: number, maxVal: number) => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const response = await axios.get(
        `https://propreturn-api.onrender.com/api/v1/properties/getBudgetProperties/${minVal}/${maxVal}/${currentPage}/${propertiesPerPage}`
      );
      // Update the properties state with the fetched data
      // console.log(response.data);
      setProperties(response.data.properties);
      setTotalPages(response.data.totalCount);
    } catch (err) {
      console.log("Error while finding properties by budget:    " + err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const allPages = Math.ceil(totalPages / propertiesPerPage);

    if (currentPage < allPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  async function shortListProperty(property: Property) {
    try {
      const newShortlistedProperties = [...shortlistedProperties, property];
      setShortlistedProperties(newShortlistedProperties);
    } catch (error) {
      console.log("Error while shortlisting property: " + error);
    }
  }

  const handleRemoveShortlistedProperty = (property: Property) => {
    const filteredProperties = shortlistedProperties.filter(
      (item) => item._id !== property._id
    );
    setShortlistedProperties(filteredProperties);
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  return (
    <div className="md:flex md:justify-between">
      <div className="my-5 md:my-20 w-full">
        <div className="px-6 md:px-20 text-sm ">
          <p className="md:flex items-center hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="mx-2 cursor-pointer">Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-3 h-3 mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <svg
              width="21"
              height="19"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4654_563)">
                <path
                  d="M9.95068 1.99811V4.66223C9.95068 4.83887 10.0209 5.00828 10.1458 5.13318C10.2707 5.25809 10.4401 5.32826 10.6167 5.32826H13.2808"
                  stroke="#667085"
                  strokeWidth="1.33206"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9484 13.9867H5.28812C4.93483 13.9867 4.59602 13.8463 4.34621 13.5965C4.0964 13.3467 3.95605 13.0079 3.95605 12.6546V3.33017C3.95605 2.97688 4.0964 2.63807 4.34621 2.38826C4.59602 2.13845 4.93483 1.99811 5.28812 1.99811H9.95033L13.2805 5.32826V12.6546C13.2805 13.0079 13.1401 13.3467 12.8903 13.5965C12.6405 13.8463 12.3017 13.9867 11.9484 13.9867Z"
                  stroke="#667085"
                  strokeWidth="1.33206"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4654_563">
                  <rect
                    width="15.9847"
                    height="15.9847"
                    fill="white"
                    transform="translate(0.625977)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="mx-2 cursor-pointer">Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-3 h-3 mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="mx-2 cursor-pointer">Task 1</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-3 h-3 mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="mx-2 cursor-pointer text-emerald-700">Task 2</span>
          </p>
          <h1 className=" text-xl md:text-3xl my-4 md:my-10 text-nowrap">
            {properties.length} Office Spaces,{" "}
            <span className="text-sm md:text-xl text-gray-500 font-light">
              Lower Parel, Mumbai
            </span>
          </h1>
        </div>
        <div className="mb-3 w-72 md:w-96 px-5 md:px-20">
          <select
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white 
            bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedOption = parseInt(e.target.value);
              setPropertiesPerPage(selectedOption);
            }}
            defaultValue={"Select properties per page"}
          >
            <option>Select properties per page</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </select>
        </div>
        <div className="px-5 md:px-20">
          {properties.length > 0 ? (
            <>
              {properties &&
                properties.map((property: any, index: number) =>
                  index === 3 ? (
                    <BudgetBox
                      min={0}
                      max={2500000}
                      fetchProperties={fetchProperties}
                      key={property._id}
                    />
                  ) : (
                    <div
                      key={property._id}
                      className="md:flex gap-5 my-5 w-full md:w-[80%] items-center border-2 rounded-xl md:overflow-hidden"
                    >
                      <div className="">
                        <div className="relative md:w-96 md:h-80">
                          <Image
                            src={property.images[0]}
                            className="w-full h-full object-cover rounded-t-xl md:rounded-none"
                            alt="property Image"
                            placeholder="blur"
                          />
                          {property.verifiedStatus ? (
                            <div className="flex items-center gap-2 bg-sky-200 border-2 border-sky-500 px-2 py-2 rounded-full opacity-90 absolute top-3 left-4">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.32715 1.93673C4.87376 1.8931 5.39268 1.67816 5.81004 1.3225C6.78397 0.492517 8.2164 0.492517 9.19033 1.3225C9.60768 1.67816 10.1266 1.8931 10.6732 1.93673C11.9488 2.03851 12.9617 3.05142 13.0634 4.32697C13.1071 4.87358 13.322 5.39249 13.6777 5.80985C14.5077 6.78378 14.5077 8.21622 13.6777 9.19015C13.322 9.6075 13.1071 10.1264 13.0634 10.6731C12.9617 11.9486 11.9488 12.9615 10.6732 13.0633C10.1266 13.1069 9.60768 13.3218 9.19033 13.6776C8.2164 14.5075 6.78397 14.5075 5.81004 13.6776C5.39268 13.3218 4.87376 13.1069 4.32715 13.0633C3.0516 12.9615 2.0387 11.9486 1.93691 10.6731C1.89329 10.1264 1.67835 9.6075 1.32268 9.19015C0.4927 8.21622 0.4927 6.78378 1.32268 5.80985C1.67835 5.39249 1.89329 4.87358 1.93691 4.32697C2.0387 3.05142 3.0516 2.03851 4.32715 1.93673ZM10.6512 6.40105C10.9832 6.0691 10.9832 5.53092 10.6512 5.19897C10.3193 4.86702 9.78108 4.86702 9.44916 5.19897L6.65019 7.99794L5.55124 6.89897C5.21929 6.56702 4.6811 6.56702 4.34915 6.89897C4.01721 7.23092 4.01721 7.76912 4.34915 8.10104L6.04915 9.80104C6.3811 10.133 6.91929 10.133 7.25124 9.80104L10.6512 6.40105Z"
                                  fill="#1F6094"
                                />
                              </svg>
                              <span className="text-sm text-[#1F6094] font-semibold">
                                Verified
                              </span>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="text-sm text-nowrap bg-zinc-100 px-2 py-2 rounded-full opacity-90 absolute top-3 left-2/3">
                            ~ 50-80 seats
                          </div>
                        </div>
                      </div>
                      <div className="p-2 md:p-0 flex flex-col w-full">
                        <h1 className="flex items-center text-xl my-1">
                          <span className="font-bold mx-1 text-xl md:text-2xl">
                            ₹ {commaSeparate.format(property.rent)}
                          </span>{" "}
                          <span className="font-light md:font-normal">
                            /month
                          </span>
                        </h1>
                        <div className="flex items-center gap-1 mb-2 md:my-1">
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 13 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4286 6.28571C11.4286 4.92174 10.8867 3.61364 9.92226 2.64917C8.95779 1.68469 7.64968 1.14286 6.28571 1.14286C4.92174 1.14286 3.61364 1.68469 2.64916 2.64917C1.68469 3.61364 1.14286 4.92174 1.14286 6.28571C1.14286 8.39543 2.83086 11.1451 6.28571 14.4389C9.74057 11.1451 11.4286 8.39543 11.4286 6.28571ZM6.28571 16C2.09486 12.1909 0 8.952 0 6.28571C0 4.61864 0.662243 3.01984 1.84104 1.84104C3.01984 0.662243 4.61864 0 6.28571 0C7.95279 0 9.55159 0.662243 10.7304 1.84104C11.9092 3.01984 12.5714 4.61864 12.5714 6.28571C12.5714 8.952 10.4766 12.1909 6.28571 16Z"
                              fill="#6B7280"
                            />
                            <path
                              d="M6.28585 7.99999C6.74051 7.99999 7.17655 7.81938 7.49804 7.49788C7.81953 7.17639 8.00014 6.74036 8.00014 6.2857C8.00014 5.83104 7.81953 5.39501 7.49804 5.07352C7.17655 4.75203 6.74051 4.57142 6.28585 4.57142C5.8312 4.57142 5.39516 4.75203 5.07367 5.07352C4.75218 5.39501 4.57157 5.83104 4.57157 6.2857C4.57157 6.74036 4.75218 7.17639 5.07367 7.49788C5.39516 7.81938 5.8312 7.99999 6.28585 7.99999ZM6.28585 9.14284C5.52809 9.14284 4.80137 8.84183 4.26555 8.30601C3.72973 7.77019 3.42871 7.04346 3.42871 6.2857C3.42871 5.52794 3.72973 4.80121 4.26555 4.2654C4.80137 3.72958 5.52809 3.42856 6.28585 3.42856C7.04362 3.42856 7.77034 3.72958 8.30616 4.2654C8.84198 4.80121 9.143 5.52794 9.143 6.2857C9.143 7.04346 8.84198 7.77019 8.30616 8.30601C7.77034 8.84183 7.04362 9.14284 6.28585 9.14284Z"
                              fill="#6B7280"
                            />
                          </svg>
                          <div className="text-gray-500 font-light md:font-normal text-xs md:text-lg">
                            {property.address}, {property.city}
                          </div>
                        </div>
                        <div className="flex items-center gap-5 my-1 text-sm">
                          <div className="flex items-center gap-1">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.813 8.75823H3.45312V5.01718C3.45426 4.63591 3.60622 4.27059 3.87582 4.001C4.14541 3.73141 4.51073 3.57945 4.89199 3.57831H13.5252C13.9065 3.57945 14.2718 3.73141 14.5414 4.001C14.811 4.27059 14.9629 4.63591 14.9641 5.01718V8.75823H13.813Z"
                                stroke="#4B5563"
                                strokeWidth="1.53479"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M1.72656 15.0892V11.0604C1.72837 10.4503 1.9715 9.86582 2.40285 9.43447C2.8342 9.00311 3.41873 8.75998 4.02875 8.75818H14.3886C14.9986 8.75998 15.5831 9.00311 16.0145 9.43447C16.4459 9.86582 16.689 10.4503 16.6908 11.0604V15.0892"
                                stroke="#4B5563"
                                strokeWidth="1.53479"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M1.72656 15.0892V14.8014C1.72723 14.5727 1.8184 14.3535 1.98016 14.1917C2.14192 14.0299 2.36112 13.9388 2.58988 13.9381H15.8275C16.0562 13.9388 16.2754 14.0299 16.4372 14.1917C16.599 14.3535 16.6901 14.5727 16.6908 14.8014V15.0892"
                                stroke="#4B5563"
                                strokeWidth="1.53479"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="font-medium md:font-semibold mx-1">
                              {property.furnishedState}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_2721_12062)">
                                <path
                                  d="M8.22163 14.4387L3.27176 9.48886C2.7115 8.92859 2.7115 7.89701 3.27176 7.33674L8.22163 2.38688C8.7819 1.82661 9.81348 1.82661 10.3737 2.38688L15.3236 7.33674C15.8839 7.89701 15.8839 8.92859 15.3236 9.48886L10.3737 14.4387C9.81348 14.999 8.7819 14.999 8.22163 14.4387V14.4387Z"
                                  stroke="#4B5563"
                                  strokeWidth="1.53479"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1.93066 12.2544L5.9491 16.2728"
                                  stroke="#4B5563"
                                  strokeWidth="1.53479"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.6455 16.2728L16.6639 12.2544"
                                  stroke="#4B5563"
                                  strokeWidth="1.53479"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_2721_12062">
                                  <rect
                                    width="18.4175"
                                    height="18.4175"
                                    fill="white"
                                    transform="translate(0.0888672 0.125)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span className="text-gray-500">
                              <span className="hidden md:inline-block">
                                Carpet area:
                              </span>
                              <span className="font-medium md:font-semibold mx-1 text-black">
                                {commaSeparate.format(property.size)} sq.ft
                              </span>
                            </span>
                          </div>
                        </div>
                        <hr className="w-full my-5 hidden md:block" />
                        <p className="text-gray-600 font-semibold hidden md:block">
                          Office for rent in {property.state},{" "}
                          {property.country}
                        </p>
                        <DescriptionTooltip
                          description={property.description}
                        />
                        <p className="text-gray-500 my-1 hidden md:block">
                          Availability: {property.available ? "Yes" : "No"}
                        </p>
                        <hr className="w-full mt-3 mb-2" />
                        <div className="md:flex items-center justify-between px-2 md:px-10">
                          <a
                            href=""
                            className="text-indigo-600 font-semibold hidden md:block"
                          >
                            Show All Images
                          </a>
                          <div className="flex items-center gap-2 justify-center">
                            <button
                              className="bg-indigo-600 px-24 md:px-10 py-2 md:py-3 rounded-lg text-xl text-white font-semibold"
                              onClick={(e) => {
                                shortListProperty(property);
                              }}
                            >
                              Shortlist
                            </button>
                            <button className="p-3 md:p-4 rounded-lg bg-[#7ADA66]">
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0131 0.499756C4.50687 0.499756 0.0244619 4.97831 0.0224618 10.4845C0.0214618 12.2446 0.482464 13.9629 1.3565 15.4769L0.000976562 20.5006L5.23361 19.2642C6.69266 20.0602 8.33517 20.4781 10.0072 20.4791H10.0111C15.5164 20.4791 19.9968 15.9995 19.9998 10.4943C20.0018 7.82519 18.9639 5.31568 17.0778 3.42761C15.1918 1.54053 12.6852 0.500756 10.0131 0.499756ZM10.0111 2.49984C12.1472 2.50084 14.1546 3.33367 15.6637 4.84173C17.1728 6.35179 18.0017 8.35826 17.9997 10.4923C17.9977 14.8965 14.4154 18.479 10.0092 18.479C8.67613 18.478 7.35568 18.1433 6.19263 17.5082L5.51877 17.141L4.7746 17.3168L2.80578 17.7817L3.28626 15.9965L3.50307 15.1957L3.08899 14.4769C2.39096 13.2688 2.02154 11.8876 2.02254 10.4845C2.02454 6.08235 5.60796 2.49984 10.0111 2.49984ZM6.4778 5.87497C6.31079 5.87497 6.04076 5.93747 5.81175 6.18748C5.58275 6.43649 4.93672 7.03959 4.93672 8.26764C4.93672 9.49569 5.83129 10.6828 5.95629 10.8498C6.0803 11.0158 7.68303 13.6155 10.2201 14.6156C12.3282 15.4466 12.7564 15.2826 13.2144 15.2406C13.6724 15.1996 14.692 14.638 14.9 14.055C15.108 13.472 15.1085 12.9704 15.0465 12.8674C14.9845 12.7634 14.818 12.7014 14.568 12.5764C14.319 12.4514 13.0918 11.8488 12.8628 11.7658C12.6338 11.6828 12.4663 11.6408 12.3003 11.8908C12.1343 12.1408 11.6572 12.7014 11.5112 12.8674C11.3652 13.0344 11.2202 13.0569 10.9702 12.9319C10.7202 12.8059 9.91631 12.5416 8.96227 11.6916C8.22024 11.0306 7.71955 10.215 7.57354 9.96498C7.42854 9.71597 7.55987 9.5792 7.68488 9.45519C7.79688 9.34319 7.93293 9.16368 8.05794 9.01767C8.18194 8.87167 8.22495 8.76765 8.30795 8.60164C8.39095 8.43563 8.34846 8.28913 8.28646 8.16412C8.22446 8.03912 7.73891 6.80651 7.5169 6.31249C7.32989 5.89747 7.13239 5.88783 6.95438 5.88083C6.80937 5.87483 6.6438 5.87497 6.4778 5.87497Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-center">
                No properties matching the criteria!
              </div>
              <button
                className="text-center font-light border border-zinc-400 w-full tracking-wide my-5 py-2 rounded-xl"
                onClick={() => {
                  fetchProperties(0, 2500000);
                }}
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
        <div>
          <p className="text-center text-gray-600 mt-10 font-mono">
            Page {Math.floor(currentPage)}
          </p>
          <div className="flex items-center justify-center my-5 font-semibold">
            {currentPage !== 1 ? (
              <>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 mr-2 bg-gray-400 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 mb-10 mx-2"
                  disabled={currentPage === 1}
                >
                  First
                </button>
                <button
                  onClick={handlePrevPage}
                  className="px-4 py-2 mr-2 bg-gray-300 rounded-lg hover:bg-gray-300 disabled:opacity-50 mb-10 mx-2"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </>
            ) : (
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 mr-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 mb-10 mx-2"
                disabled={currentPage === 1}
              >
                Prev
              </button>
            )}
            {currentPage === 1 ||
            currentPage !== totalPages / propertiesPerPage ? (
              <>
                <button
                  onClick={handleNextPage}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 mb-10 mx-2"
                  disabled={currentPage === 205}
                >
                  Next
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(totalPages / propertiesPerPage);
                  }}
                  className="px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 mb-10 mx-2"
                  disabled={currentPage === totalPages / propertiesPerPage}
                >
                  Last
                </button>
              </>
            ) : (
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 mb-10 mx-2"
                disabled={currentPage === totalPages / propertiesPerPage}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="my-20 w-[40%] me-20 hidden md:block">
        <div className="border-2 px-5 rounded-xl">
          <h1 className="font-semibold text-2xl text-nowrap my-2">
            Shortlisted Properties
          </h1>
          <hr className="w-full my-5" />
          {shortlistedProperties.length > 0 ? (
            <>
              <div className="mt-2">
                {shortlistedProperties.map((property) => (
                  <>
                    <ShortlistedProperty
                      key={property._id}
                      property={property}
                      onRemove={handleRemoveShortlistedProperty}
                    />
                    <hr className="w-full my-5" />
                  </>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="text-center font-medium w-[80%] mb-5 py-4 bg-indigo-600 text-white rounded-xl">
                  Schedule a visit
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">
                No Properties Shortlisted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
