import * as React from "react";

interface Coordinates {
  x: number;
  y: number;
}
interface DrawnArea {
  start: undefined | Coordinates;
  end: undefined | Coordinates;
}
interface UseAreaSelectionProps {
  container: React.RefObject<HTMLElement> | undefined;
}

const boxNode = document.createElement("div");
boxNode.style.position = "fixed";
boxNode.style.background = "hsl(206deg 100% 50% / 5%)";
boxNode.style.boxShadow = "inset 0 0 0 2px hsl(206deg 100% 50% / 50%)";
boxNode.style.borderRadius = "2px";
boxNode.style.pointerEvents = "none";
boxNode.style.mixBlendMode = "multiply";

export function useAreaSelection({
  container = { current: document.body }
}: UseAreaSelectionProps) {
  const boxRef = React.useRef<HTMLDivElement>(boxNode);
  const boxElement = boxRef;
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);
  const [selection, setSelection] = React.useState<DOMRect | null>(null);
  const [drawArea, setDrawArea] = React.useState<DrawnArea>({
    start: undefined,
    end: undefined
  });

  const handleMouseMove = (e: MouseEvent) => {
    document.body.style.userSelect = "none";
    setDrawArea((prev) => ({
      ...prev,
      end: {
        x: e.clientX,
        y: e.clientY
      }
    }));
  };

  const handleMouseDown = (e: MouseEvent) => {
    const containerElement = container.current;

    setMouseDown(true);

    if (
      containerElement &&
      containerElement.contains(e.target as HTMLElement)
    ) {
      document.addEventListener("mousemove", handleMouseMove);
      setDrawArea({
        start: {
          x: e.clientX,
          y: e.clientY
        },
        end: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "initial";
    document.removeEventListener("mousemove", handleMouseMove);
    setMouseDown(false);
    // set selection
  };

  React.useEffect(() => {
    const containerElement = container.current;
    if (containerElement) {
      containerElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        containerElement.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [container]);

  React.useEffect(() => {
    const { start, end } = drawArea;
    if (start && end && boxElement.current) {
      drawSelectionBox(boxElement.current, start, end);
      setSelection(boxElement.current.getBoundingClientRect());
    }
  }, [drawArea, boxElement]);

  React.useEffect(() => {
    const containerElement = container.current;
    const selectionBoxElement = boxElement.current;
    if (containerElement && selectionBoxElement) {
      if (mouseDown) {
        if (!document.body.contains(selectionBoxElement)) {
          containerElement.appendChild(selectionBoxElement);
        }
      } else {
        if (containerElement.contains(selectionBoxElement)) {
          containerElement.removeChild(selectionBoxElement);
        }
      }
    }
  }, [mouseDown, container, boxElement]);

  return selection;
}

export function useSelected(
  elementRef: React.RefObject<HTMLElement>,
  selection: DOMRect | null
) {
  const [isSelected, setIsSelected] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if (!elementRef.current || !selection) {
      setIsSelected(false);
    } else {
      console.log(".");
      const a = elementRef.current.getBoundingClientRect();
      const b = selection;
      setIsSelected(
        !(
          a.y + a.height < b.y ||
          a.y > b.y + b.height ||
          a.x + a.width < b.x ||
          a.x > b.x + b.width
        )
      );
    }
  }, [elementRef, selection]);

  return isSelected;
}

function drawSelectionBox(
  boxElement: HTMLElement,
  start: Coordinates,
  end: Coordinates
): void {
  const b = boxElement;
  if (end.x > start.x) {
    b.style.left = start.x + "px";
    b.style.width = end.x - start.x + "px";
  } else {
    b.style.left = end.x + "px";
    b.style.width = start.x - end.x + "px";
  }

  if (end.y > start.y) {
    b.style.top = start.y + "px";
    b.style.height = end.y - start.y + "px";
  } else {
    b.style.top = end.y + "px";
    b.style.height = start.y - end.y + "px";
  }
}
