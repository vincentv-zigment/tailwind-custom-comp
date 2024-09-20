import  { MouseEvent, useState } from 'react';

const DragRect = ({ containerStyle = {} }) => {
  const [dragStart, setDragStart] = useState<{x:number, y: number} | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    const start = { x: e.clientX, y: e.clientY };
    // Reset rectangle dimensions to prevent old rectangle from appearing
    setRect({ top: 0, left: 0, width: 0, height: 0 });
    setDragStart(start);
    setDragging(true);
  };
  

  const handleMouseMove = (e:MouseEvent) => {
    if (!dragging) return;
    if(dragStart){

        const current = { x: e.clientX, y: e.clientY };
        const width = Math.abs(current.x - dragStart.x);
        const height = Math.abs(current.y - dragStart.y);
        const left = dragStart.x < current.x ? dragStart.x : current.x;
        const top = dragStart.y < current.y ? dragStart.y : current.y;
        setRect({ top, left, width, height });
    }

  };

  const handleMouseUp = () => {
    setDragging(false);
    // Optionally reset the rectangle here or keep it
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ width: '100%', height: '100vh', position: 'relative', userSelect: 'none', ...containerStyle }}
    >
      {dragging && rect.width > 0 && rect.height > 0 && (
  <div
    style={{
      position: 'absolute',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      backgroundColor: 'rgba(0,0,255,0.3)',
      border: '2px solid blue',
    }}
  />
)}
    </div>
  );
};

export default DragRect;
