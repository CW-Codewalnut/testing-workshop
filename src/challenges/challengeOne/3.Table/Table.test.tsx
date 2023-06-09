import React from "react";
import { render, screen } from "@testing-library/react";
import { Table, TableProps } from "./Table";

const testColumns: TableProps["columns"] = [
  { property: "name", label: "Name" },
  { property: "email", label: "Email" },
];

const testData: TableProps["data"] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
];

describe("Table", () => {
  const renderComponent = (
    columns: TableProps["columns"],
    data: TableProps["data"],
  ) => {
    render(<Table columns={columns} data={data} />);
  };

  it("renders without error", () => {
    renderComponent(testColumns, testData);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("displays data correctly", () => {
    renderComponent(testColumns, testData);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
  });
});
