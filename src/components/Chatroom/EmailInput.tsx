import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import type { MultiValue, StylesConfig } from "react-select";
import z from "zod";
import { ErrorText } from "../../ui";

const components = {
  DropdownIndicator: null,
};

export interface IEmailVals {
  label: string;
  value: string;
}

interface EmailInputProps {
  values: MultiValue<IEmailVals>;
  onChange: (values: MultiValue<IEmailVals>) => void;
}

const EmailSchema = z.string().email("invalid email");

const selectStyles: StylesConfig<IEmailVals, true> = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--background-input)",
    borderColor: "var(--border-field)",
    borderRadius: 0,
    padding: "4px 8px",
    boxShadow: "none",
    ":hover": { borderColor: "var(--border-field-hover)" },
  }),
  input: (base) => ({ ...base, color: "var(--text-normal)", fontSize: 14 }),
  placeholder: (base) => ({ ...base, color: "var(--text-faint)", fontSize: 14 }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "var(--background-hover)",
    borderRadius: 0,
  }),
  multiValueLabel: (base) => ({ ...base, color: "var(--text-normal)", fontSize: 13 }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--text-muted)",
    ":hover": { backgroundColor: "var(--background-selected)", color: "var(--text-normal)" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0", gap: 4 }),
};

export default function EmailInput({ values, onChange }: EmailInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue) return;
    if (["Enter", "Tab", ","].includes(e.key)) {
      const result = EmailSchema.safeParse(inputValue);

      if (!result.success) {
        setError(result.error.issues[0].message || "Invalid email");
        return;
      }

      e.preventDefault();
      onChange([...values, { label: result.data, value: result.data }]);
      setInputValue("");
      setError("");
    }
  };

  return (
    <>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={onChange}
        onInputChange={setInputValue}
        onKeyDown={handleKeyDown}
        placeholder="Type an email and press enter..."
        value={values}
        styles={selectStyles}
      />
      {error && <ErrorText>error</ErrorText>}
    </>
  );
}
