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
  // const [pathStartPoint, setPathStartPoint] = useState([0, 0]);
  const pathStartPoint = React.useRef([0, 0]);
  const [pathEndPoint, setPathEndPoint] = useState([0, 0]);
  const [isDragging, setDragging] = useState(false);
  const [pivotPoints, setPivotPoint] = useState([10, 20]);
  const [pivotPoints1, setPivotPoint1] = useState([10, 20]);
  const [pivotPointsm, setPivotPointm] = useState([10, 20]);

  const createPathHandler = (rect, direction) => {
    let startPoint;
    if (direction === "right") {
      startPoint = [rect.right, rect.top + rect.height / 2];
    } else {
      startPoint = [rect.left, rect.top + rect.height / 2];
    }

    pathStartPoint.current = [...startPoint];

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (evt) => {
    setDragging(true);
    setPathEndPoint([evt.clientX, evt.clientY]);
    const midpoint = [
      (pathStartPoint.current[0] + evt.clientX) / 2,
      (pathStartPoint.current[1] + evt.clientY) / 2,
    ];

    setPivotPointm([...midpoint]);

    const hyp = Math.sqrt(
      Math.pow(pathStartPoint.current[0] - evt.clientX, 2) +
        Math.pow(pathStartPoint.current[1] - evt.clientY, 2)
    );

    console.log("length", evt.clientX - pathStartPoint.current[0]);
    console.log("breadth", evt.clientY - pathStartPoint.current[1]);
    console.log("hyp", hyp);

    const pp1 = [
      midpoint[0] + (30 * (evt.clientY - pathStartPoint.current[1])) / hyp,
      midpoint[1] - (30 * (evt.clientX - pathStartPoint.current[0])) / hyp,
    ];

    const pp2 = [
      midpoint[0] - (30 * (evt.clientY - pathStartPoint.current[1])) / hyp,
      midpoint[1] + (30 * (evt.clientX - pathStartPoint.current[0])) / hyp,
    ];

    // const pp = [midpoint[0] + 10, midpoint[1] + 10];

    // console.log("pathStartPoint", pathStartPoint);
    // console.log("evt.clientX", evt.clientX, evt.clientY);
    console.log("pp", pp1);
    setPivotPoint(pp1);
    setPivotPoint1(pp2);
  };

  const handleMouseUp = () => {
    setDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const svgLine = `M${pathStartPoint.current} C${pivotPoints} ${pivotPoints1} ${pathEndPoint}`;
  // const svgLine = `M${pathStartPoint.current} L${pathEndPoint}`;

  console.log("svg", svgLine);

  return (
    <div className="main-container">
      {isDragging && (
        <svg className="nadee__edges">
          <path d={svgLine} className="nadee__edges-path"></path>
        </svg>
      )}

      <div
        style={{
          width: 3,
          height: 3,
          background: "green",
          borderRadius: 10,
          position: "absolute",
          left: pivotPointsm[0],
          top: pivotPointsm[1],
        }}
      />

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
