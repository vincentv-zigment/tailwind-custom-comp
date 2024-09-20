import React, { useState, useEffect, useRef } from 'react';

const ResizableTable = ({ columns, data }) => {
  const [resizedColumns, setResizedColumns] = useState(columns);

  const handleResize = (index, width) => {
    const newColumns = resizedColumns.map((column, i) => {
      if (i === index) {
        return { ...column, width };
      }
      return column;
    });
    setResizedColumns(newColumns);
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {resizedColumns.map((column, index) => (
            <th
              key={index}
              className="relative border border-gray-300 bg-gray-100 p-2"
              style={{ width: column.width }}
            >
              {column.Header}
              <div
                className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startWidth = column.width;

                  const onMouseMove = (e) => {
                    const newWidth = startWidth + e.clientX - startX;
                    handleResize(index, newWidth);
                  };

                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border border-gray-300">
            {resizedColumns.map((column, colIndex) => (
              <td key={colIndex} className="border border-gray-300 p-2">
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResizableTable;