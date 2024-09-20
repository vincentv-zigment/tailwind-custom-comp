import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, KeyboardEvent, SetStateAction, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

interface ContactTags {
  label: string;
  color: string;
}
 
type Props = {
  
};
 
 
const cities = [
    {
        "label": "Mumbai",
        "color": "#9A3B3B"
    },
    {
        "label": "Banglore",
        "color": "#FFA732"
    },
    {
        "label": "Pune",
        "color": "#EF4040"
    },
    {
        "label": "Kochi",
        "color": "#B70404"
    },
    {
        "label": "Chennai",
        "color": "#A7D397"
    }
]

const colors = [
  '',
  '#C9C0D3',
  "#DDBEA9",
  "#BD7975",
  "#FF914D",
  "#42E6BF",
  "#97A0B2"
]

  
interface ColorContextType {
  inputValue: string;
  setContent: Dispatch<SetStateAction<ContactTags[]>>;
  openColorMenu: boolean;
  setOpenColorMenu: Dispatch<SetStateAction<boolean>>;
  content:ContactTags[];
  setInputValue: Dispatch<SetStateAction<string>>
  color:string;
  setColor: Dispatch<SetStateAction<string>>;
  selected:ContactTags[];
  setSelected:Dispatch<SetStateAction<ContactTags[]>>;
  setRefs:(ref:any)=>void
}

// Default values for the context
const defaultContextValue: ColorContextType = {
  setInputValue:()=>{},
  inputValue: "",
  setContent: () => {}, // Placeholder function
  openColorMenu: false,
  setOpenColorMenu: () => {}, // Placeholder function
  content: [],
  color:'',
  setColor: ()=>{},
  selected:[],
  setSelected:()=>{},
  setRefs:()=>{}
};

const ColorContext = createContext<ColorContextType>(defaultContextValue);

 

export default function ChipsWithInputSearchColor({ }:Props) {
  const [selected, setSelected] = useState<ContactTags[]>([]);
  const [content, setContent] = useState(cities);
  const [inputValue, setInputValue] = useState('');

  const [openColorMenu, setOpenColorMenu] = useState(false);
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])

  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const [show, setShow] = useState(false);


  const inputRef = useRef<HTMLInputElement | null>(null);


  

  const refs = useRef<any[]>([]);

  const setRefs = (ref:any) => {
    if (ref && !refs.current.includes(ref)) {
      refs.current.push(ref);
    }
  };


  const filtered = useMemo(() => {
    if(content){
      const query = inputValue.trim().toLowerCase();
      return query === '' ? content : content.filter((city) => city.label.toLowerCase().includes(query));
    }
  }, [inputValue]);

  const handleSelect = (choice:ContactTags) => {
    const city = selected.find((x)=> x.label===choice.label )
    if(city){
      setSelected([...selected.filter((x)=>x.label!==choice.label)])
    }else{
      setSelected([...selected, choice])
    }
  }
 
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (refs.current.every(ref => ref && !ref.contains(event.target))) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 


  
 

 

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>)=> {
    console.log(e.code)
    if (
      inputRef.current &&
      inputRef.current.selectionStart === 0 &&
      e.key === "Backspace"
    ) {
      if (toBeDeleted) {
        setSelected([...selected.filter((x) => x.label !== toBeDeleted)]);
        setToBeDeleted(null);
      } else {
        setToBeDeleted(selected[selected.length - 1].label);
      }
    }else if(e.key !== 'Backspace'){
      setToBeDeleted(null)
    }
  }

  

  


  return (
      <>
      <ColorContext.Provider value={{inputValue, content,   openColorMenu, setOpenColorMenu, setContent, setInputValue, color, setColor, selected, setSelected, setRefs}}>
        <div className="relative w-[300px] text-xs" ref={setRefs}>
          <div
            className="relative  flex w-full cursor-default rounded-md border border-gray-300 bg-white    h-fit  pl-1 py-1 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500  "
            onClick={() => {setShow(true); inputRef.current?.focus()}}
            style={{minHeight:'40px'}}
          >
            <div className=" truncate flex flex-wrap gap-1  "  >
              {selected.map((x) => {
                  return (
                    <>
                      <div
                        className={`border inline flex w-fit pl-2 bg-gray-200 pr-1 py-1 rounded-md gap-1 text-sm items-center  ${x.label === toBeDeleted && 'opacity-50'} `}
                        key={`${x.label}`}
                        onClick={()=>setShow(show)}
                        style={{background:x.color }}
                      >
                        <span className="flex text-white font-medium items-center ">
                          {x.label}
                        </span>
                        <button
                          className="w-fit hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                          onClick={()=>setSelected([...selected.filter((select)=>(select.label !== x.label))]) }
                        >
                          <XMarkIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </>
                  );
              })}
              <input 
                type="text" 
                className="py-1 pl-1 text-sm w-20 rounded-md focus:outline-none border-none focus:outline-none focus:ring-0" 
                value={inputValue} 
                onChange={(e)=>{setInputValue(e.target.value)}} 
                onKeyDown={handleKeyDown} 
                ref={inputRef}
                placeholder="Add Tags..." 
              />  
            </div>
            <button className=" pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"  >
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>

            {show && (
                
                  <div className="absolute w-full z-[20]">
                    <div className=" mt-1   w-full  rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none     flex flex-col">
                        <div className="overflow-auto max-h-60 customscroll pr-1 text-sm ">
                          {filtered && filtered.map((choice: ContactTags) => {
                            return (
                              <button
                                key={`option-key-${choice.label}`}
                                className={
                                  "relative cursor-default text-gray-900 select-none py-2 w-full rounded-md px-3   hover:bg-gray-100 cursor-pointer"
                                }
                                onClick={()=>handleSelect(choice)}
                              >
                                <div className="flex items-center gap-2 w-full   cursor-pointer relative"> 
                                    <span className="w-4 h-4 bg-gray-200 shrink-0 rounded-full" style={{background:choice.color}}>

                                    </span>
                                    <div className="flex items-center justify-between w-full">
                                        <span className={"block truncate"}>{choice.label} 
                                        </span>

                                        {selected.find((x)=> x.label===choice.label ) && <span className="p-0.5 rounded-full bg-indigo-500"><CheckIcon className="w-3 h-3 text-white"/></span>}
                                    </div>
                                </div>
                              </button>
                            ); 
                          })}
                          
                          <ColorButton/>
                        </div>
                        
                      
                    </div>
                    {openColorMenu && <ColorMenu/>}
                    
                  </div>
                
            )}
        </div>
        </ColorContext.Provider>
      </>
  );
}



 
const ColorMenu = () => {
  const { setColor, setOpenColorMenu, setRefs} = useContext(ColorContext);

  

  return (
    <>
      <div className="w-[154px]  p-2 absolute -bottom-16 left-4 flex flex-wrap items-center gap-2 bg-white drop-shadow-md border rounded-md" ref={setRefs} >
          {colors.map((x)=>{
            return (<button className="w-6 h-6 rounded-full border ring ring-white hover:ring-gray-100 focus:ring-gray-300" onClick={()=>{setColor(x);setOpenColorMenu(false) }} style={{background:x}}></button>)
          })}
      </div>
    </>
  )
}
 
const ColorButton = () => {

  const {inputValue, color, content,  setRefs, openColorMenu, setOpenColorMenu, setContent, setInputValue,selected, setSelected} = useContext(ColorContext);

  return (
    <>
      {inputValue.trim().length > 0  && !content.find((x)=>x.label.toLowerCase() === inputValue.toLowerCase()) && 
        <div id="color-button" className="relative cursor-default text-gray-900 select-none  w-full rounded-md px-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between relative" 
        ref={setRefs}
      >
          <div className="bg-gray-100  border rounded-full ">
            <button className="flex items-center gap-2 p-1 " onClick={()=>setOpenColorMenu(!openColorMenu)}>
              <span className="  w-4 h-4 rounded-full" style={{background:color}}>

              </span>
              <IoChevronDown className="w-4 h-4"/>
            </button> 
          </div>
            <button className="w-full p-1 py-2 text-center" onClick={()=>{
              const newtag = {
                label:inputValue.trim(),
                color
              } 
              setInputValue('');
              setContent([...content, newtag]);
              setSelected([...selected, newtag]);
              setOpenColorMenu(false); 
            }}
              >
              Create<strong>"{inputValue}"</strong>  
            </button>
          </div>
      }
    </>
  )
}