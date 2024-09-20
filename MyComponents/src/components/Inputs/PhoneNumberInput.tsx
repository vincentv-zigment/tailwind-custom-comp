/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Country, ICountry } from "country-state-city";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";

const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

type PropsI = {
 
};

export default function PhoneNumberInput({ 
 
}: PropsI) {
  const [selected, setSelected] = useState<ICountry>(
    Country.getCountryByCode("IN") ?? Country.getAllCountries()[0]
  );
  console.log(selected.phonecode, 'selected');
  const [phonenumber, setPhoneNumber] = useState('')
 
  const [inputValue, setInputValue] = useState("");

  const [show, setShow] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const [filtered, setFiltered] = useState<ICountry[]>([]);
 
  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    const countries = Country.getAllCountries();
    if (countries) {
      setFiltered(() => {
        return query === ""
          ? countries
          : countries.filter(
              (country: ICountry) =>
                country.name.toLowerCase().includes(query) ||
                country.phonecode.toLowerCase().includes(query)  || 
                country.isoCode.toLowerCase().includes(query) 
            );
      });
    }
  }, [inputValue]);

 

  const handleSelect = (choice: ICountry) => {
    setSelected(choice);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDebouncedChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(()=>{
    const handleClickOutside = (e: any) => {
      if(containerRef && !containerRef.current?.contains(e.target)){
        setShow(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    } 
  },[])

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
      className="hover:bg-gray-100 p-1 cursor-pointer flex items-center justify-between rounded-md px-2"
      onClick={() => handleSelect(filtered[index])}
    >
      <div className="flex items-center divide-x-2">
        <span className="w-16">{filtered[index].phonecode}</span>
        <span className="w-8 text-center">{filtered[index].isoCode}</span>
        <span className="px-2">{filtered[index].name}</span>
      </div>
      {filtered[index].name === selected.name &&
        filtered[index].phonecode === selected.phonecode && (
          <button className="p-1 bg-brand-orange-deski rounded-full">
            <CheckIcon className="w-3 h-3 bg-brand-orange-deski text-white rounded-full " />
          </button>
        )}
    </div>
  );

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(   e.target.value);
  };

  return (
    <div className="relative w-[300px]" ref={containerRef}>
      <div className={`relative  rounded-md shadow-sm flex items-center gap-2
        
      `}>
        <div className="flex items-center py-0 rounded-md block shrink-0 text-sm  ">
          <button
            className="relative   w-full cursor-default rounded-md border border-gray-300 bg-white    h-fit  pl-1 py-2 pr-10 text-left shadow-sm   focus:outline-none   sm:text-sm "
            onClick={() => setShow(!show)}
          >
            {selected.isoCode} {selected.phonecode}
          </button>
        </div>
        <input
          type="number"
          name="phone-number"
          id="phone-number"
          className={`relative   w-full cursor-default rounded-md border border-gray-300 bg-white    h-fit    py-2 px-2 text-left shadow-sm   focus:outline-none   sm:text-sm 
         
          `}
          placeholder="9999-999999"
          value={phonenumber}
          onChange={handleStateChange}
        />
      </div>
      {show && (
        <div className="absolute z-10 mt-1   w-full  rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   flex flex-col" >
          <div className="block h-10 pb-1 px-1  w-full  relative flex flex-col">
            <div className="mb-1">
              <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                <p className="text-base text-gray-400">Search Country....</p>
                <button onClick={() => setShow(false)}>
                  <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-black" />
                </button>
              </div>
              <div className="flex relative">
                <input
                  type="text"
                  className="py-1 pl-2 pr-8 w-full rounded-md border  focus:ring-2 focus:ring-indigo-500   focus:outline-none"
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
  );
}
