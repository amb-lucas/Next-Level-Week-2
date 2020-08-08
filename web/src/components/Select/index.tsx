import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  instruction?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  instruction = "Selecione uma opção",
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} defaultValue="" {...rest}>
        <option value="" disabled hidden>
          {instruction}
        </option>

        {options.map(({ value, label }) => (
          <option key={value} value={value} label={label}></option>
        ))}
      </select>
    </div>
  );
};

export default Select;
