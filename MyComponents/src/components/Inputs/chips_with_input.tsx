import {
    ChevronUpDownIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    useEffect,
    useRef,
    useState,
} from "react";
  
  type ListI = {
    title: string;
    submenu: string[];
  };
  
  type Props = {
    lists?: ListI[];
  };
  
  

  const menu = [
    'option1','option2', 'option3'
  ]
  const ChipsWithInput = ({}: Props) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<{ content: string; id: any }[]>([]);
    const [tobeDeleted, setToBEDeleted] = useState<any>(null);
  
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('')
  
    useEffect(() => {
      const handleClickOutside = (e: any) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setShow(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  
    const handleParameters = (para: string) => {
      const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
      if (tobeDeleted) setToBEDeleted(null)
      setSelected([
        ...selected,
        {
          id: `chip_${uniqueID}`,
          content: para,
        },
      ]);
    };
  
    const handleKeyDown = (e: any) => {
      if (
        inputRef.current &&
        inputRef.current.selectionStart === 0 &&
        e.key === "Backspace"
      ) {
        
        if (tobeDeleted) {
          setSelected([...selected.filter((x) => x.id !== tobeDeleted)]);
          setToBEDeleted(null);
        } else {
          setToBEDeleted(selected[selected.length - 1].id);
        }
      }else{
        if (tobeDeleted) setToBEDeleted(null)
        
      }
  
      if (e.key === "Enter") {
        const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
        setSelected([
          ...selected,
          {
            id: `chip_${uniqueID}`,
            content: inputValue,
          },
        ]);
        // e.target.value = "";
        setInputValue('')
      }
    };
  
    return (
      <div ref={containerRef} className="relative" style={{ minHeight: "40px" }}>
        <div
          onClick={() =>{ setShow(true); inputRef.current?.focus()}}
          className="relative cursor-pointer w-[300px] cursor-default rounded-md border border-gray-300 bg-white  h-auto min-h-10  pl-1 py-1 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1  focus:ring-indigo-500 sm:text-sm"
          style={{ minHeight: "40px" }}
        >
          {/* Chips Input */}
          <div className="block truncate flex flex-wrap  items-center gap-1">
            {selected.map((submenu) => (
              <>
                {
                  <div
                    className={`${
                      submenu.id === tobeDeleted
                        ? "bg-indigo-200"
                        : "bg-gray-200"
                    }  inline flex w-fit py-1 px-1.5 rounded-md gap-1 text-sm items-center`}
                    key={submenu.id}
                  >
                    <span>{submenu.content}</span>
                    <button
                      className="w-fit hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                      onClick={() =>
                        setSelected([
                          ...selected.filter((x) => x.id !== submenu.id),
                        ])
                      }
                    >
                      <XMarkIcon className="text-black w-4 h-4" />
                    </button>
                  </div>
                }
              </>
            ))}
  
            <input
              ref={inputRef}
              type="text"
              className="py-1 pl-1 text-sm w-20 rounded-md focus:outline-none border-none focus:outline-none focus:ring-0"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={(e)=>{setInputValue(e.target.value)}} 
            />
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>
        {show && (
          <div className="w-full h-fit mt-1 bg-white rounded-md  shadow-md border absolute z-[10] ">
             
            <div className="p-1 space-y-1">
              {menu.map((sub) => {
                return (
                  <button
                    onClick={() => handleParameters(sub)}
                    className="relative cursor-default text-gray-900 select-none py-2 w-full rounded-md px-3   hover:bg-gray-100 cursor-pointer"
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ChipsWithInput;
  