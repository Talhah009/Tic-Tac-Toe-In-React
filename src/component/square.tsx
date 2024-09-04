import React from "react";

const Square = ({value, onClick}: any) => {
  return (
    <div>
      <div
      className="check"
        onClick={onClick}
      >
        {value}
      </div>
    </div>
  );
};

export default Square;
