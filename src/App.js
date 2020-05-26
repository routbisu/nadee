import React, { useState } from "react";
import "./scss/App.scss";
import Box from "./components/Box";

const initBoxes = [
  {
    color: "#C0DEE8",
    text: "Ports Source",
    location: {
      x: 150,
      y: 200,
    },
  },
  {
    color: "#DAFDCF",
    text: "Geometry Source",
    location: {
      x: 150,
      y: 300,
    },
  },
  {
    color: "#C0DEE8",
    text: "Geofilter Node",
    location: {
      x: 500,
      y: 250,
    },
  },
];

const App = () => {
  const [boxes, setBoxes] = useState([...initBoxes]);
  const [pathStartPoint, setPathStartPoint] = useState("0,0");
  const [pathEndPoint, setPathEndPoint] = useState("0,0");
  const [isDragging, setDragging] = useState(false);

  const createPathHandler = (rect, direction) => {
    let startPoint;
    if (direction === "right") {
      startPoint = `${rect.right},${rect.top + rect.height / 2}`;
    }
    setPathStartPoint(startPoint);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (evt) => {
    setDragging(true);
    console.log("left", evt.clientX);
    setPathEndPoint(`${evt.clientX},${evt.clientY}`);
  };

  const handleMouseUp = () => {
    setDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const svgLine = `M${pathStartPoint} L${pathEndPoint}`;

  return (
    <div className="main-container">
      {isDragging && (
        <svg className="nadee__edges">
          <path d={svgLine} className="nadee__edges-path"></path>
        </svg>
      )}
      <div className="nadee__nodes">
        {boxes &&
          boxes.map((box, i) => (
            <Box key={i} box={box} onCreatePath={createPathHandler} />
          ))}
      </div>
    </div>
  );
};

export default App;
