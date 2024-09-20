import { useEffect, useRef, useState } from "react";
import {
    Box,
    boxesIntersect,
    useSelectionContainer
} from "@air/react-drag-to-select";
import BoxInner from "./Box";

const AirDragSelect = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const selectableItems = useRef<Box[]>([]);
  const elementsContainerRef = useRef<HTMLDivElement | null>(null);

  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById("root"),
    onSelectionChange: (box) => {
      /**
       * Here we make sure to adjust the box's left and top with the scroll position of the window
       * @see https://github.com/AirLabsTeam/react-drag-to-select/#scrolling
       */
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX
      };

      const indexesToSelect: number[] = [];
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(scrollAwareBox, item)) {
          indexesToSelect.push(index);
        }
      });

      setSelectedIndexes(indexesToSelect);
    },
    onSelectionStart: () => {
      console.log("OnSelectionStart");
    },
    onSelectionEnd: () => console.log("OnSelectionEnd"),
    selectionProps: {
      style: {
        border: "2px dashed purple",
        borderRadius: 4,
        backgroundColor: "brown",
        opacity: 0.5
      }
    },
    isEnabled: true
  });

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        selectableItems.current.push({
          left,
          top,
          width,
          height
        });
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <DragSelection />
      <div
        id="elements-container"
        className="elements-container"
        ref={elementsContainerRef}
      >
        {Array.from({ length: 16 }, (_, i) => (
           <BoxInner selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes}  index={i} key={`box_key_${i}`} />
        ))}
      </div>

      
    </div>
  );
};

export default AirDragSelect;
