import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { Toast } from "../../../components/Toast/Toast";
import { WeatherShowcase } from "../../../components/WeatherShowcase/WeatherShowcase";
import { Form, FormField } from "../../challengeOne/4.Form/Form";
import { Modal } from "../../challengeOne/5.Modal/Modal";

export function IntegrationComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({});

  const fields: FormField[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      value: "",
      id: "name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: "",
      id: "email",
    },
  ];

  const handleFormSubmit = (values: Record<string, string>) => {
    setIsModalOpen(false);
    setFormData(values);
    setToastMessage(
      `Hello ${values.name}, your email ${values.email} has been submitted!`,
    );
  };

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center gap-3 p-40">
      <Button text="Open Form" onClick={() => setIsModalOpen(true)} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerText="Form Modal"
        onConfirm={() => handleFormSubmit(formData)}
        showActions={false}
      >
        <Form fields={fields} onSubmit={handleFormSubmit} />
      </Modal>
      <Toast show={!!toastMessage} message={toastMessage} />
      <WeatherShowcase />
    </div>
  );
}
