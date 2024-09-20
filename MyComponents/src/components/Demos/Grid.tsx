import GridLayout from "react-grid-layout";
import DragRect from "./DragSelectGPT";

type Props = {}

const Grid = (props: Props) => {
  return (
    <div className="border border-black h-screen">
      <GridLayout className="layout  w-fit [&>div]:rounded-md [&>div]:p-2" cols={3} rowHeight={30} width={600} >
        {/* <DragRect/> */}
          <div key="a" className="bg-red-100" data-grid={{ x: 0, y: 0, w: 1, h: 2,  }}>
            a
          </div>
          <div key="b" className="bg-yellow-100" data-grid={{ x: 1, y: 0, w: 1, h: 2,  }}>
            b
          </div>
          <div key="c" className="bg-blue-100" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
            c
          </div>
        </GridLayout>
    </div>
  )
}

export default Grid