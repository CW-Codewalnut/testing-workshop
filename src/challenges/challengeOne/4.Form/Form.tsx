import React, { useState } from "react";

export type FormField = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  id: string;
};

export interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
}

export function Form({ fields, onSubmit }: FormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 rounded-md bg-gray-800 p-4">
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block text-white" htmlFor={field.id}>
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            value={values[field.name] || ""}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-gray-700 px-3 py-2 text-white"
          />
        </div>
      ))}
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-3 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
