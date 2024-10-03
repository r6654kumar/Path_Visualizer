import React from "react";
import "./Node.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const Node = ({
  col,
  isEnd,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
  isStartPresent,
  isEndPresent,
}) => {
  const extraClassName = isEnd
    ? "node-end"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => {
        if (isEndPresent || isStartPresent) {
          onMouseUp(row, col);
        } else {
          onMouseUp();
        }
      }}
    >
      {isStart ? <span > <HomeOutlinedIcon /> </span> : ""}
      {isEnd ? <span ><LocationOnOutlinedIcon/></span> : ""}
    </div>
  );
};

export default Node;
