import { FixedSizeList as List } from 'react-window';
 
const Row = ({ index, style }) => (
  <div style={style} className='hover:bg-gray-100 p-1'>Row {index}</div>
);
 
const ReactVirtualize = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);

export default ReactVirtualize;