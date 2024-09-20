import * as React from "react";
import { useAreaSelection, useSelected } from "./area-selection";
import {forwardRef} from 'react'

const SelectionContext = React.createContext<DOMRect | null>(null);

function Box() {
  const ref = React.useRef(null);
  const selection = React.useContext(SelectionContext);
  const isSelected = useSelected(ref, selection);
  return (
    <div 
        className="flex justify-center bg-[#fff] w-20 h-20 rounded-md transition-all"
      ref={ref}
      style={{
        ...(isSelected && {
          boxShadow: "inset 0 0 0 .25rem hsl(206deg 100% 50%)"
        })
      }}
    />
  );
}

 

const Container =  forwardRef(({ children }: any, ref:  any) => {
    return (
      <div ref={ref}   className="flex flex-wrap gap-2 w-full mx-auto h-screen bg-[#eee] p-4 items-center justify-center overflow-hidden border-2 border-dashed border-[#aaa]">
        {children  }
      </div>
    );
  }
);

export default function DragSelect() {
  const selectContainerRef = React.useRef<HTMLElement | null>(null);
  const selection = useAreaSelection({ container: selectContainerRef });

  const boxes = [...Array(30).keys()].map(() => <Box />);

  return (
    <div className="h-screen">
      <SelectionContext.Provider value={selection}>
        <Container ref={selectContainerRef}>
            {boxes}
        </Container>
      </SelectionContext.Provider>
     
    </div>
  );
}
