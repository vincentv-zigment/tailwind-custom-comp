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

const BasicLayout = ({ className = "layout", items = 20, rowHeight = 30, onLayoutChange = () => {}, cols = 12 }) => {
  const [layout, setLayout] = useState<any[]>([]);

  
  useEffect(() => {
    setLayout(generateLayout());
    // This effect should run only once on component mount, hence the empty dependency array
  }, []);


  const generateDOM = () => {
    return _.map(_.range(items), function(i) {
      return (
        <div key={i} className="bg-red-100 rounded-md select-none	">
          <span className="text">{i}</span>
        </div>
      );
    });
  };

  return (
    <ReactGridLayout
      className={className}
      layout={layout}
      onLayoutChange={onLayoutChange}
      rowHeight={rowHeight}
      cols={cols}
    >
      <div className="w-20 h-20 p-2 rounded-md bg-red-100" data-grid={{ x: 4, y: 0, w: 1, h: 2 }} >
        as
      </div>
      {/* <div >chal raha hai</div> */}
    </ReactGridLayout>
  );
};

export default BasicLayout;
