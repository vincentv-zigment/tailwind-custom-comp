import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpDownIcon,
    XMarkIcon,
  } from "@heroicons/react/24/outline";
  import React, {
    ChangeEvent,
    KeyboardEvent,
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
  
  const dummylists = [
    {
      title: "PREVIOUS_NODE",
      submenu: [],
    },
    {
      title: "FUNCTION",
      submenu: ["response_agent", "Open AI LLM", "fetch params"],
    },
  ];
  
  const Chips_with_input = ({ lists = dummylists }: Props) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<{ content: string; id: any }[]>([]);
    const [tab, setTab] = useState(lists[0]);
    const [tobeDeleted, setToBEDeleted] = useState<any>(null);
  
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
  
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
      }
  
      if (e.key === "Enter") {
        const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
        setSelected([
          ...selected,
          {
            id: `chip_${uniqueID}`,
            content: e.target.value,
          },
        ]);
        e.target.value = "";
      }
    };
  
    return (
      <div ref={containerRef} className="relative" style={{ minHeight: "40px" }}>
        <div
          onClick={() => setShow(true)}
          className="relative cursor-pointer w-full cursor-default rounded-md border border-gray-300 bg-white  h-auto min-h-10  pl-2 py-2 pr-10 text-left shadow-sm focus:border-brand-orange-deski focus:outline-none focus:ring-1  focus:ring-brand-orange-deski sm:text-sm"
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
                        ? "bg-brand-orange-deski/20"
                        : "bg-gray-200"
                    }  inline flex w-fit py-1 px-1.5 rounded-md gap-2 text-sm items-center`}
                    key={submenu.id}
                  >
                    <span>{submenu.content}</span>
                    <button
                      className="bg-gray-100 hover:bg-red-200 active:bg-red-300 rounded-full p-0.5"
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
              className="flex-grow shrink inline-block border border-transparent py-1 px-1 text-sm focus:outline focus:ring-transparent focus:ring-0 focus:border-transparent"
              onKeyDown={handleKeyDown}
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
          <div className="w-full h-fit mt-1 rounded-md  space-y-2  shadow-md border absolute ">
            <div className="w-full flex items-center  text-sm p-1">
              {lists.map((menu) => {
                return (
                  <button
                    className={`${
                      menu.title === tab.title
                        ? "border-brand-orange-deski text-brand-orange-deski"
                        : "border-transparent"
                    }  hover:text-brand-orange-deski py-2 px-4 text-base border-b-2 font-medium transition-all `}
                    onClick={() => setTab(menu)}
                  >
                    {menu.title}
                  </button>
                );
              })}
            </div>
            <div className="p-2 space-y-1">
              {tab.submenu.map((sub) => {
                return (
                  <button
                    onClick={() => handleParameters(sub)}
                    className="flex items-center justify-between hover:ring-1 hover:ring-brand-orange-deski block w-full border text-left py-1 px-2 rounded-sm"
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
  
  export default Chips_with_input;
  