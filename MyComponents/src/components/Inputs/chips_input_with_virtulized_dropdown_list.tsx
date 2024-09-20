import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { City, Country, ICity, State } from "country-state-city";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { BiSearch } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";



const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

// const cityList =

export default function ChipsInputWithVirtulizedDropDownList() {
  
  const [selected, setSelected] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [filtered, setFiltered] = useState<ICity[]>([]);
 

  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    const citiess = City.getCitiesOfCountry("IN");
    if (citiess) {
      setFiltered(() => {
        return query === ""
          ? citiess
          : citiess.filter((city: ICity) =>
            city.name.toLowerCase().includes(query)
          );
      });
    }

  }, [inputValue]);

  const handleSelect = (choice: ICity) => {
    const city = selected.find((x) => x.name === choice.name);
    if (city) {
      setSelected([...selected.filter((x) => x.name !== choice.name)]);
    } else {
      setSelected([...selected, choice]);
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDebouncedChange = (value: string) => {
    setInputValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    clearTimeout(timeoutRef.current as number); // Clear any existing timeout
    timeoutRef.current = setTimeout(
      () => handleDebouncedChange(query),
      DEBOUNCE_DELAY
    ) as any;
  };

  useEffect(() => {
    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutRef.current as number);
    };
  }, []);

  // List Component
  const Row = ({ index, style }: any) => (
    <div
      style={style}
      className="hover:bg-gray-100 p-1 cursor-pointer  flex items-center justify-between rounded-md px-2 space-x-1"
      onClick={() => handleSelect(filtered[index])}
    >
      <span className="flex gap-2 space-x-2">
        {filtered[index].name}
        {",  "}
        {
          State.getStateByCodeAndCountry(
            filtered[index].stateCode,
            filtered[index].countryCode
          )?.name
        }
        {", "}
        {Country.getCountryByCode(filtered[index].countryCode)?.name}
      </span>

      {selected.find((city) => city.name === filtered[index].name) && (
        <button className="p-1 bg-brand-orange-deski rounded-full">
          <CheckIcon className="w-3 h-3 bg-brand-orange-deski text-white rounded-full " />
        </button>
      )}
    </div>
  );
  return (
    <>
      <div className="relative w-[300px] " ref={containerRef}>
        <div
          className={`relative   w-full cursor-default rounded-md border border-gray-300 bg-white    h-fit  pl-1 py-1 pr-10 text-left shadow-sm   focus:outline-none   sm:text-sm  `}
          onClick={() => setShow(true)}
          style={{ minHeight: "40px" }}
        >
          <div className="block truncate flex flex-wrap gap-1 ">
            {selected.map((x) => {
              return (
                <>
                  <div
                    className=" border  bg-gray-200 flex w-fit py-1 pl-2 pr-1 rounded-md gap-1 items-center"
                    key={`${x.latitude}${x.longitude}${x.name}`}
                    onClick={() => setShow(show)}
                  >
                    {x.name}
                    <button
                      className="w-fit  hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                      onClick={() =>
                        setSelected([
                          ...selected.filter(
                            (select) =>
                              select.name !== x.name ||
                              select.stateCode !== x.stateCode
                          ),
                        ])
                      }
                    >
                      <XMarkIcon className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </>
              );
            })}
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>

        {show && (
          <div className="absolute z-10 mt-1   w-[300px]  rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   flex flex-col">
            <div className="block h-10 pb-1 px-1  w-full  relative flex flex-col">
              <div className="mb-1">
                <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                  <p className="text-base text-gray-400">Search City....</p>
                  <button onClick={() => setShow(false)}>
                    <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-black" />
                  </button>
                </div>
                <div className="flex relative">
                  <input
                    type="text"
                    className="py-1 pl-2 pr-8 w-full rounded-md border  focus:ring-2 focus:ring-brand-orange-deski focus:border-brand-orange-deski"
                    onChange={handleChange}
                  />{" "}
                  <BiSearch className="text-gray-600 absolute w-5 h-5 inset-y-0 my-auto right-2 " />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <List
                className="overflow-y-auto customscroll"
                height={150}
                itemCount={filtered.length}
                itemSize={35}
                width={280}
              >
                {Row}
              </List>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
