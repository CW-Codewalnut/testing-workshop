import { render, screen } from "@testing-library/react";
import { Table, TableProps } from "./Table";

const renderComponent = (additionalProps?: Partial<TableProps>) => {
    const defaultProps = {
        columns: [
            { property: "name", label: "Name" },
            { property: "email", label: "Email" },
        ],
        data: [
            { id: 1, name: "John Doe", email: "john.doe@mail.com" },
            { id: 2, name: "Jane Doe", email: "jane.down@mail.com" },
        ]
    };

    render(<Table {...defaultProps} {...additionalProps} />);
};

describe("Table", () => {
    it("renders the table headings correctly", () => {
        renderComponent();
        expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
        expect(screen.getByRole("columnheader", { name: "Email" })).toBeInTheDocument();
    });

    it("renders the names correctly", () => {
        renderComponent();
        expect(screen.getByRole("cell", { name: "John Doe" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Jane Doe" })).toBeInTheDocument();
    });

    it("renders the emails correctly", () => {
        renderComponent();
        expect(screen.getByRole("cell", { name: "john.doe@mail.com" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "jane.down@mail.com" })).toBeInTheDocument();
    });
});

