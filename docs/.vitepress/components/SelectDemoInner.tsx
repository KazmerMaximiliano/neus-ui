import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Select } from "@neus-ui/src/components/Select/Select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "1.5rem 0",
  maxWidth: "360px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

export function SelectDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={sectionStyle}>
        <div>
          <p style={labelStyle}>Default</p>
          <Select
            name="select1"
            options={options}
            label="Select an option"
            placeholder="Choose..."
          />
        </div>
        <div>
          <p style={labelStyle}>With search bar</p>
          <Select
            name="select2"
            options={options}
            label="Select with search"
            placeholder="Choose..."
            viewSearchBar
            searchBarPlaceholder="Search..."
          />
        </div>
        <div>
          <p style={labelStyle}>With default value</p>
          <Select
            name="select3"
            options={options}
            label="Pre-selected"
            defaultValue="option2"
          />
        </div>
        <div>
          <p style={labelStyle}>Disabled</p>
          <Select name="select4" options={options} label="Disabled" disabled />
        </div>
        <div>
          <p style={labelStyle}>With error</p>
          <Select
            name="select5"
            options={options}
            label="With error"
            error="This field is required"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
