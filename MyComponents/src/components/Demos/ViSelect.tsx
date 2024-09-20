import SelectionArea, { SelectionEvent } from "@viselect/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);
const generateLayout = () => {
  return _.map(new Array(10), function(_, i) {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
    };
  });
};

export default function ViSelect() {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed }
    }
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  const [layout, setLayout] = useState<any[]>([]);

  
  useEffect(() => {
    setLayout(generateLayout());
    // This effect should run only once on component mount, hence the empty dependency array
  }, []);

  



  return (
    <SelectionArea
      className="container"
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
      <ReactGridLayout
      className={"layout"}
      layout={layout}
      rowHeight={30}
      cols={12}
    >

        {new Array(400).fill(0).map((_, index) => (
          <div
            className={selected.has(index) ? "selected selectable" : "selectable"}
            data-key={index}
            key={index}
          />
        ))}
    </ReactGridLayout>
    </SelectionArea>
  );
}
