import React from "react";
import { render, screen } from "@testing-library/react";
import { Table, TableProps } from "./Table";

describe("Table", () => {
  const columns = [
    { property: "name", label: "Name" },
    { property: "age", label: "Age" },
  ];

  const data = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
  ];

  const renderComponent = (additionalProps?: Partial<TableProps>) => {
    const defaultProps: TableProps = {
      columns,
      data,
    };

    render(<Table {...defaultProps} {...additionalProps} />);
  };

  it("renders the table with column headers", () => {
    renderComponent();

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();

    columns.forEach((column) => {
      const columnHeaderElement = screen.getByText(column.label);
      expect(columnHeaderElement).toBeInTheDocument();
    });
  });

  it("renders the table with data rows", () => {
    renderComponent();

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();

    data.forEach((item : any) => {
      columns.forEach((column) => {
        const cellDataElement = screen.getByText(String(item[column.property]));
        expect(cellDataElement).toBeInTheDocument();
      });
    });
  });
});
