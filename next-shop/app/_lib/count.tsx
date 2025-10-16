"use client";
import { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+ Increment</button>
    </>
  );
}

export default Count;
