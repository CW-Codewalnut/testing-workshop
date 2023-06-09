import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Table, TableProps } from "./Table";

const TableHeader = [
  { property: "name", label: "Name" },
  { property: "age", label: "Age" },
  { property: "email", label: "Email" },
];

const TableRows = [
  { id: 1, name: "John Doe", age: 30, email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "janesmith@example.com" },
];
describe("Table", () => {
  const renderComponent = (additionalProps?: any) => {
    const defaultProps: Partial<TableProps> = {
      columns: TableHeader,
      data: TableRows,
    };
    render(<Table {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders table headers correctly", () => {
    renderComponent();
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(3);
    expect(tableHeaders[0]).toHaveTextContent("Name");
    expect(tableHeaders[1]).toHaveTextContent("Age");
    expect(tableHeaders[2]).toHaveTextContent("Email");
  });

  it("renders First rows and data correctly", () => {
    renderComponent();
    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(3);
    const rowData1 = within(tableRows[1]).getAllByRole("cell");
    expect(rowData1).toHaveLength(3);
    expect(rowData1[0]).toHaveTextContent("John Doe");
    expect(rowData1[1]).toHaveTextContent("30");
    expect(rowData1[2]).toHaveTextContent("johndoe@example.com");
  });

  it("renders Second rows and data correctly", () => {
    renderComponent();
    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(3);
    const rowData2 = within(tableRows[2]).getAllByRole("cell");
    expect(rowData2).toHaveLength(3);
    expect(rowData2[0]).toHaveTextContent("Jane Smith");
    expect(rowData2[1]).toHaveTextContent("25");
    expect(rowData2[2]).toHaveTextContent("janesmith@example.com");
  });
});
