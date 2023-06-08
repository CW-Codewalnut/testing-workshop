import React, { useState } from "react";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion w-full overflow-hidden rounded-md border">
      <button
        className="w-full bg-gray-200 p-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {title}
      </button>
      {isOpen && <div className="bg-white p-3">{children}</div>}
    </div>
  );
}
