import { Button } from "antd";
import { useStore } from "effector-react";
import { $counter, increment, decrement } from "./model";

export const Counter: React.FC = () => {
  const counter = useStore($counter);

  return (
    <>
      <Button
        aria-label="Increment value"
        onClick={() => increment()}
      >
        +
      </Button>
      <span style={{margin: 5}}>{counter}</span>
      <Button
        aria-label="Decrement value"
        onClick={() => decrement()}
      >
        -
      </Button>
    </>
  );
};