import React from "react";

const ToolTip = ({ children, info, position }) => {
  return (
    <div
      className="relative cursor-pointer w-full max-w-md h-auto"
    
      onMouseEnter={() => {
        const tooltip = document.getElementById("infoTooltip");
        if (tooltip) {
          tooltip.style.visibility = "visible";
        }
      }}
      onMouseLeave={() => {
        const tooltip = document.getElementById("infoTooltip");
        if (tooltip) {
          tooltip.style.visibility = "hidden";
        }
      }}
    >
      <div
        id="infoTooltip"
        className="absolute bg-yellow-100 w-fit max-w-md h-auto rounded border border-gray-600 py-2 px-2 text-xs bottom-6 left-0 -translate-x-1/2"
        style={{ 
            visibility: "hidden"
        }}
      >
        {info}
      </div>
      {children}
    </div>
  );
};

export default ToolTip;
