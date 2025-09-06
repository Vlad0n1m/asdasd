import React, { useState } from 'react';

export const Accordion = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

export const AccordionItem = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger = ({ children, isOpen, setIsOpen }) => {
  return (
    <button
      className="flex justify-between w-full p-4 text-left"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
  );
};

export const AccordionContent = ({ children, isOpen }) => {
  if (!isOpen) return null;
  return <div className="p-4 pt-0">{children}</div>;
};