import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p data-testid="counter-value">{count}</p>

      <button onClick={increaseCount}>Öka</button>
    </div>
  );
}
