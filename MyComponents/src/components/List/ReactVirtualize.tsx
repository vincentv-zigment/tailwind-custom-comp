import { VariableSizeList as List } from 'react-window';
 
// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const getItemSize = (index: number) => rowHeights[index];
 
const Row = ({ index, style }: any) => (
  <div style={style}>Row {index}</div>
);
 
const ReactVirtualize = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={getItemSize}
    width={300}
  >
    {Row}
  </List>
)

export default ReactVirtualize;