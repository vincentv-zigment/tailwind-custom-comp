import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

const people = [
 'asdc', 'sadvasdf', 'sdfdsdf', 'asdfsd'
];

type Props = {
  state: any;
  setState: (value: any) => void;
  label: string;
  list: any[];
  name: any;
};

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

const arrayToObj = (array: any[]) => {
  return array.map((element) => {
    return {
      name: element,
      checked: false,
    };
  });
};

export default function CustomMultiSelect({
  // state,
  // setState,
  lists=people,
}: // name
any) {
  const [selected, setSelected] = useState(arrayToObj(lists));
  
  console.log(selected, 'selected')

  const onChange = (e: any) => {
    setSelected((prevLists) =>
      prevLists.map((choice) => {
        if (choice.name === e.name) {
          choice.checked = !e.checked;
        }
        return choice;
      })
    );
  };

  return (
    <div className="   flex flex-col    relative ">
      {
        <Listbox value={selected} onChange={onChange}>
          {({ open }: any) => (
            <>
              
              <div className="relative ">
                <Listbox.Button className="relative w-[300px] cursor-default rounded-md border border-gray-300 bg-white   min-h-[40px]  py-1   px-1 pr-10 text-left shadow-sm   focus:outline-none   sm:text-sm">
                  <div className="block truncate flex flex-wrap gap-1  ">
                    {selected.map((x) => {
                      if (x.checked) {
                        return (
                          <span
                            key={x.name}
                            className="border inline flex w-fit pl-2 bg-gray-200 pr-1 py-1 rounded-md gap-1 items-center"
                          >
                            {x.name}
                              
                            <button
                          className="w-fit hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                          onClick={() => onChange(x)} 
                        >
                          <XMarkIcon className="w-4 h-4 text-black" />
                        </button>
                          </span>
                        );
                      }
                    })}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10   max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm customscroll flex flex-col">
                    {selected.map((choice: any) =>{ 
                         
                            return(
                              
                                <Listbox.Option
                            key={`multi-select-${choice.name}`}
                            className={({ active }: any) =>
                              classNames(
                                active ? "  bg-indigo-50" : "",
                                "relative cursor-default text-gray-900 select-none py-2 rounded-md pl-3 pr-9"
                              )
                            }
                            value={choice}
                          >
                            {({ selected, active }: any) => (
                              <div className="flex items-center gap-2 w-full">
                                <input
                                  id="candidates"
                                  aria-describedby="candidates-description"
                                  name="candidates"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-brand-orange-deski focus:ring-brand-orange-deski"
                                  checked={choice.checked}
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {choice.name}
                                </span>
                              </div>
                            )}
                                </Listbox.Option>
                            )}
                         
                    )
                    }
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      }
    </div>
  );
}
