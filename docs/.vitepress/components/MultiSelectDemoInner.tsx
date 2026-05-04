import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { MultiSelect } from "@neus-ui/src/components/MultiSelect/MultiSelect";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
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

export function MultiSelectDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={sectionStyle}>
        <div>
          <p style={labelStyle}>With search bar</p>
          <MultiSelect
            name="frameworks"
            options={options}
            label="Frameworks"
            placeholder="Select frameworks..."
            viewSearchBar
            searchBarPlaceholder="Search..."
          />
        </div>
        <div>
          <p style={labelStyle}>With default values</p>
          <MultiSelect
            name="frameworks2"
            options={options}
            label="Frameworks"
            placeholder="Select frameworks..."
            defaultValue={["react", "vue"]}
          />
        </div>
        <div>
          <p style={labelStyle}>Disabled</p>
          <MultiSelect
            name="frameworks3"
            options={options}
            label="Frameworks"
            disabled
          />
        </div>
        <div>
          <p style={labelStyle}>With error</p>
          <MultiSelect
            name="frameworks4"
            options={options}
            label="Frameworks"
            placeholder="Select at least one..."
            error="Please select at least one option"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
