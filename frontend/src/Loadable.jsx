// src/Loadable.jsx
import { Suspense } from "react";
import FullPageAnimation from "./fallbacks/FullPageAnimation";

export default function Loadable(Component) {
  return function WrappedComponent(props) {
    return (
      <Suspense fallback={<FullPageAnimation />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
