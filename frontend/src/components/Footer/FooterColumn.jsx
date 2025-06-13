import React from "react";

function FooterColumn({ children, className = "" }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export default FooterColumn;
