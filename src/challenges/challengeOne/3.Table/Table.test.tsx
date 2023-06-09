import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Table, TableProps } from "./Table";

describe("Table", () => {
  const renderComponent = (additionalProps?: Partial<TableProps>) => {
    const defaultProps = {
      columns: [
        { property: "name", label: "Name" },
        { property: "email", label: "Email" },
      ],
      data: [
        { id: 1, name: "John Doe", email: "john.doe@mail.com" },
        { id: 2, name: "Jane Doe", email: "jane.doe@mail.com" },
      ],
    };

    render(<Table {...defaultProps} {...additionalProps} />);
  };

  it("renders the table headers correctly", () => {
    renderComponent();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders the table content correctly", () => {
    renderComponent();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@mail.com")).toBeInTheDocument();
    expect(screen.getByText("jane.doe@mail.com")).toBeInTheDocument();
  });
});
