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

// react-select can't read CSS vars directly — resolved values from design tokens (dark)
const selectStyles: StylesConfig<IEmailVals, true> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#232323",       // --background-primary-alt
    borderColor: "#333333",            // --background-modifier-border
    borderRadius: 12,
    padding: "4px 8px",
    boxShadow: "none",
    ":hover": { borderColor: "#3f3f3f" },
  }),
  input: (base) => ({ ...base, color: "#dadada", fontSize: 14 }),
  placeholder: (base) => ({ ...base, color: "#666666", fontSize: 14 }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "color-mix(in srgb, #8a5cf5 20%, #232323)",
    borderRadius: 6,
  }),
  multiValueLabel: (base) => ({ ...base, color: "#dadada", fontSize: 13 }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#999999",
    ":hover": { backgroundColor: "#2e2e2e", color: "#dadada" },
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
