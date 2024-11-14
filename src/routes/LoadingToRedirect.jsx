import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoadingToRedirect() {
  const [count, setCount] = useState(10);
  const [reDirect, setReDirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setReDirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (reDirect) {
    return <Navigate to={"/"} />;
  }

  return <div>No Permission, redirect in {count}</div>;
}
