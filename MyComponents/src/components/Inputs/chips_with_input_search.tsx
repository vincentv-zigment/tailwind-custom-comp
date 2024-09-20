import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {
};

 

const DEBOUNCE_DELAY = 300; // Adjust the delay as needed
 
type CityI = {
    id:any,
    name:string
}
const cities = [
    {
        id:1,
        name:'Ahemedabad'
    },
    {
        id:2,
        name:'Mumbai'
    },
    {
        id:3,
        name:'Banglore'
    },
    {
        id:4,
        name:'Hyderbad'
    }
]

export default function ChipsWithInputSearch({}:Props) {
  const [selected, setSelected] = useState<CityI[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);


  const timeoutRef = useRef<number | null>(null);

  const filtered = useMemo(() => {
    if(cities){
      const query = inputValue.trim().toLowerCase();
      return query === '' ? cities : cities.filter((city) => city.name.toLowerCase().includes(query));
    }
  }, [inputValue]);

  const handleSelect = (choice:CityI) => {
    const city = selected.find((x)=> x.name===choice.name )
    if(city){
      setSelected([...selected.filter((x)=>x.name!==choice.name)])
    }else{
      setSelected([...selected, choice])
    }
  }

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if(containerRef.current && !containerRef.current.contains(e.target)){
        setShow(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return ()=> document.removeEventListener('click', handleClickOutside)
  }, []);


  const handleDebouncedChange = (value: string) => {
    setInputValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    clearTimeout(timeoutRef.current as number); // Clear any existing timeout
    timeoutRef.current = setTimeout(() => handleDebouncedChange(query), DEBOUNCE_DELAY) as any;
  };

  useEffect(() => {
    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutRef.current as number);
    };
  }, []);


  return (
      <>
        <div className="relative w-[300px]" ref={containerRef}>
          <button
            className="relative   w-full cursor-default rounded-md border border-gray-300 bg-white    h-fit  pl-1 py-1 pr-10 text-left shadow-sm   focus:outline-none   sm:text-sm"
            onClick={() => setShow(true)}
            style={{minHeight:'40px'}}
          >
            <div className="block truncate flex flex-wrap gap-1 ">
              {selected.map((x) => {
                  return (
                    <>
                      <div
                        className=" border inline flex w-fit py-1 pl-2 bg-gray-200 pr-1 rounded-md gap-1 items-center"
                        key={`${x.id}`}
                        onClick={()=>setShow(show)}
                      >
                        {x.name}
                        <button
                          className="w-fit hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                          onClick={()=>setSelected([...selected.filter((select)=>(select.name !== x.name))]) }
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
          </button>

            {show && (
              <div className="absolute z-10 mt-1   w-full  rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   flex flex-col">
                <div className="block h-10 pb-1 px-1  w-full  relative flex flex-col">
                  <div className="mb-1">
                    <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                      <p className="text-base text-gray-400">Search City....</p>
                      <button onClick={()=>setShow(false)}><XMarkIcon className="w-5 h-5 text-gray-400 hover:text-black"/></button>
                    </div>
                    <div className="flex relative">
                      <input type="text" className="py-1 pl-2 pr-8 w-full rounded-md border  focus:ring-2 focus:ring-indigo-500   focus:outline-none" onChange={handleChange}  /> <BiSearch className="text-gray-600 absolute w-5 h-5 inset-y-0 my-auto right-2 "/>
                    </div>
                  </div>
                </div>
                <div className="overflow-auto max-h-60 customscroll pr-1 mt-10">
                  {filtered && filtered.map((choice: any) => {
                    return (
                      <button
                        key={`option-key-${choice.id}`}
                        className={
                          "relative cursor-default text-gray-900 select-none py-2 w-full rounded-md px-3   hover:bg-gray-100 cursor-pointer"
                        }
                        onClick={()=>handleSelect(choice)}
                      >
                        <div className="flex items-center gap-2 w-full justify-between cursor-pointer"> 
                          <span className={"block truncate"}>{choice.name} 
                          </span>
                          {selected.find((x)=> x.name===choice.name ) && <button className="p-0.5 rounded-full bg-indigo-500"><CheckIcon className="w-3 h-3 text-white"/></button>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </>
  );
}
