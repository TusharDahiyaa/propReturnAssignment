import FetchProperties from "./components/FetchProperties";
import filterOptions from "./components/filterOptions";

export default function Properties() {
  return (
    <div className="h-screen">
      <div className="bg-[#E5E7EB] h-16 md:h-20">
        <div className="flex items-center h-16 md:h-20 justify-between pe-2 md:px-24 overflow-x-scroll">
          {filterOptions &&
            filterOptions.map((filterOption, index): any =>
              filterOption.label === "All Filters" ? (
                <div
                  className="md:hidden relative left-0 h-20 bg-zinc-100 px-4 flex items-center drop-shadow-sm cursor-pointer"
                  key={filterOption.label + index}
                >
                  <span className="bg-white p-1 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#8b5cf6"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <div
                  className="flex items-center gap-1 mx-1 md:mx-0 rounded-full bg-zinc-100 px-4 py-2 drop-shadow-sm cursor-pointer"
                  key={filterOption.label + index}
                >
                  <div className="">{filterOption.icon}</div>
                  <p className="text-sm text-stone-500 text-nowrap">
                    {filterOption.label}
                  </p>
                  {filterOption.dropdown && <div>{filterOption.dropdown}</div>}
                </div>
              )
            )}
        </div>
      </div>
      <FetchProperties />
    </div>
  );
}
