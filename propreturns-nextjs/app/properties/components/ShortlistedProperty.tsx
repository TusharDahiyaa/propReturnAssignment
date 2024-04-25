const commaSeparate = require("indian-number-format");

export default function ShortlistedProperty({ property, onRemove }: any) {
  return (
    <div className="rounded mb-2 items-center">
      <div className="flex items-center">
        <img
          src={property.images[0]}
          className="w-32 h-28 rounded-xl"
          alt={property.name}
        />
        <div className="mx-5">
          <h1 className="flex items-center text-lg font-light my-1">
            <span className="font-bold me-1 text-xl">
              ₹ {commaSeparate.format(property.rent)}
            </span>
            /month
          </h1>
          <div className="text-gray-500 my-1">
            {property.address}, {property.city}
          </div>
          <div className="text-sm flex items-center gap-1 my-5">
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
              Carpet area:
              <span className="font-medium mx-1 text-black">
                {commaSeparate.format(property.size)} sq.ft
              </span>
            </span>
          </div>
          {/* <button
            className="bg-red-600 text-white my-1 py-1 px-10 mx-2 rounded"
            onClick={() => onRemove(property)}
          >
            Remove
          </button> */}
        </div>
      </div>
    </div>
  );
}
