import React, { useState } from "react";

export interface DropdownProps {
  options: string[];
  label: string;
  id: string;
}

export function Dropdown({ options, label, id }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div>
      <label
        className="mb-2 block text-sm font-semibold text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
        id={id}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
