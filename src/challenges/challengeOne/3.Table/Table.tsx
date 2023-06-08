import React from "react";

type Column = {
  property: string;
  label: string;
};

type Item = {
  id: string | number;
  [key: string]: any;
};

export interface TableProps {
  columns: Column[];
  data: Item[];
}

export function Table({ columns, data }: TableProps) {
  return (
    <table className="m-4 w-full table-auto rounded-md bg-gray-800 p-4">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.property} className="px-4 py-2 text-white">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td
                key={`${item.id}-${column.property}`}
                className="border px-4 py-2 text-white"
              >
                {item[column.property]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
