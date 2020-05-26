import React, { useState, useEffect } from "react";

const Box = ({ box: { color, text, location }, onCreatePath }) => {
  const [loc, setLoc] = useState({ ...location });
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = React.useRef();
  const cusorOffset = React.useRef({ x: 0, y: 0 });

  const handleMouseMove = (evt) => {
    // Calculate initial cursor offset
    if (cusorOffset.current.x === 0 && cusorOffset.current.y === 0) {
      cusorOffset.current.x = evt.clientX - boxRef.current.offsetLeft;
      cusorOffset.current.y = evt.clientY - boxRef.current.offsetTop;
    }
    setLoc({
      x: evt.clientX - cusorOffset.current.x,
      y: evt.clientY - cusorOffset.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    cusorOffset.current = { x: 0, y: 0 };
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleDrag = (evt) => {
    setIsDragging(true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragPath = (evt, direction) => {
    evt.stopPropagation();
    onCreatePath(boxRef.current.getBoundingClientRect(), direction);
  };

  return (
    <div
      className="box"
      style={{
        top: loc.y,
        left: loc.x,
        background: color,
        cursor: isDragging ? `grabbing` : `pointer`,
      }}
      onMouseDown={handleDrag}
      ref={boxRef}
    >
      {text}
      <div
        className="connector connector-right"
        onMouseDown={(evt) => handleDragPath(evt, "right")}
      />
      <div
        className="connector connector-left"
        onMouseDown={(evt) => handleDragPath(evt, "left")}
      />
    </div>
  );
};

export default Box;
