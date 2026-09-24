import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import type { MultiValue } from "react-select";
import z from "zod";
import { ErrorText } from "../ui";
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
      />
      {error && <ErrorText>error</ErrorText>}
    </>
  );
}
