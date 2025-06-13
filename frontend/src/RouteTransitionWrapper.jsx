
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RouteTransitionWrapper({ children }) {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    setShowTransition(true);
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 1000); // 1s fade duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showTransition && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-white animate-fade" />
      )}
      {children}
    </>
  );
}
