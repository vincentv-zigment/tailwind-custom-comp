import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

type ListI = {
  title:string,
  submenu:string[]
}

type Props = {
  lists?:ListI[]
};

const dummylists = [
  {
    title:'PREVIOUS_NODE',
    submenu:[]
  },
  {
    title:'FUNCTION',
    submenu:[
      'response_agent' ,
      'Open AI LLM',
      'fetch params'
    ]
  }
]

const CustomMultiSelect2 = ({lists=dummylists }: Props) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<{type:'chip' | 'text', content:string, id:any}[]>([])
  const [tab, setTab] = useState(lists[0])

  const inputRefs = useRef<HTMLSpanElement[] | null[]>([null]);
  const containerRef = useRef<HTMLDivElement>(null);
  const chipsContainer = useRef<HTMLDivElement | null>(null)

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

  const handleKeyDown = (e:any) => {
    const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const cursorPosition = range.startOffset;


    if(cursorPosition===0 && e.key==='Backspace'){

    }
  }
  }


  const handleParameters = (para:string) => {
    const uniqueID = Math.floor(Math.random()*10**6).toString()
    setSelected(
      [...selected, 
        {
          id:`chip_${uniqueID}`, 
          content:para, 
          type:'chip'
        }, 
        {
          id:`textspan_${uniqueID}`, 
          content:'', 
          type:'text'
        }
      ])
  }

  return (
    <div ref={containerRef} className="relative" style={{minHeight:'40px'}}>
      <div
        onClick={() => setShow(true)}
        className="relative cursor-pointer w-full cursor-default rounded-md border border-gray-300 bg-white  h-auto min-h-10  pl-2 py-2 pr-10 text-left shadow-sm focus:border-brand-orange-deski focus:outline-none focus:ring-1  focus:ring-brand-orange-deski sm:text-sm"
        style={{minHeight:'40px'}}
      >
        {/* Chips Input */}
        <div
          className="block truncate flex flex-wrap  items-center gap-0.5" ref={chipsContainer} > 
          {selected.map((submenu) => (
            <>
            {
              submenu.type === 'chip' 
              &&
              <div
                className="border inline flex w-fit py-1 px-2 rounded-md gap-1 items-center"
                key={submenu.id}
                // contentEditable="false"
              >
                {submenu.content}
               
              </div>
            }
            {
              submenu.type === 'text' && 
              <span 
                className="min-w-1 focus:ring-0 focus:outline-none focus:ring-transparent" 
                contentEditable="true" 
                spellCheck="false" 
                onInput={(e:any)=>{
                  setSelected([...selected.map((x)=>{
                    if(x.id === submenu.id){
                      x.content = e.target.innerText
                    }
                    return x
                  })])
                  console.log(e.target.innerText)
                }}
                onKeyDown={(e) => {
                  const selection = window.getSelection();
                  const id = `chip_${submenu.id.split('_')[1]}`

                  if (selection) {
                    const cursorPosition = selection.anchorOffset;

                    if(cursorPosition === 0 && e.key === 'Backspace'){
                      setSelected([...selected.filter((x)=>x.id !== id)])
                    }
                  }
                }}
              
              >{submenu.content}</span>
            }
            </>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </div>
      {show && (
        <div className="w-full h-fit mt-1 rounded-md  space-y-2  shadow-md border absolute ">
          <div className="w-full flex items-center  text-sm p-1">
            {lists.map((menu)=>{
              return (
              <button className={`${menu.title === tab.title ? 'border-brand-orange-deski text-brand-orange-deski' : 'border-transparent'}  hover:text-brand-orange-deski py-2 px-4 text-base border-b-2 font-medium transition-all `} 
                onClick={()=>setTab(menu)}
              >
                {menu.title}
              </button>
              )
            })}
          </div>
          <div className="p-2 space-y-1">
            {tab.submenu.map((sub)=>{
              return (
                <button 
                  onClick={()=>handleParameters(sub)}
                  className="flex items-center justify-between hover:ring-1 hover:ring-brand-orange-deski block w-full border text-left py-1 px-2 rounded-sm">  
                {sub}
                
                </button>)
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect2;
 
