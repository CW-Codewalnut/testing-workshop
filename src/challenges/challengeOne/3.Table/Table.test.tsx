import React from "react";
import { render, screen } from "@testing-library/react";
import { Table, TableProps } from "./Table";

describe("Table", () => {
  const renderComponent = (additionalProps?: Partial<TableProps>) => {
    const defaultProps: TableProps = {
      columns: [
        { property: "property1", label: "Label 1" },
        { property: "property2", label: "Label 2" },
      ],
      data: [
        { id: "1", property1: "Data 1.1", property2: "Data 1.2" },
        { id: "2", property1: "Data 2.1", property2: "Data 2.2" },
      ],
    };
    render(<Table {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders the correct number of columns", () => {
    renderComponent();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Label 1");
    expect(screen.getAllByRole("columnheader")[1]).toHaveTextContent("Label 2");
  });

  it("renders the correct number of rows", () => {
    renderComponent();
    expect(screen.getAllByRole("row")).toHaveLength(3); // 2 rows of data + header row
  });

  it("renders the correct data", () => {
    renderComponent();
    expect(screen.getByText("Data 1.1")).toBeInTheDocument();
    expect(screen.getByText("Data 1.2")).toBeInTheDocument();
    expect(screen.getByText("Data 2.1")).toBeInTheDocument();
    expect(screen.getByText("Data 2.2")).toBeInTheDocument();
  });
});
