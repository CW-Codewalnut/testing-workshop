import React from "react";
import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

describe("Table", () => {
  const columns = [
    { property: "name", label: "Name" },
    { property: "email", label: "Email" },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  ];

  it("renders table with correct columns and data", () => {
    render(<Table columns={columns} data={data} />);

    // Check table header
    columns.forEach((column) => {
      const columnHeader = screen.getByText(column.label);
      expect(columnHeader).toBeInTheDocument();
    });

    // Check table rows and cells
    data.forEach((item) => {
      columns.forEach((column) => {
        const cell = screen.getByText(item[column.property]);
        expect(cell).toBeInTheDocument();
      });
    });
  });
});
