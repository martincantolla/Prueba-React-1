import React from "react";
import { Button } from "react-bootstrap";

const ResetButton = ({ onReset }) => {
  const handleReset = () => {
    onReset();
  };

  return (
    <div className="reset">
      <Button className="filterBox" variant="danger" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default ResetButton;
