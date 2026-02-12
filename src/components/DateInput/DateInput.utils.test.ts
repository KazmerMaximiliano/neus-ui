import { describe, expect, it } from "vitest";
import {
  formatDateForDisplay,
  serializeDateValue,
  isDateRange,
} from "./DateInput.utils";

describe("formatDateForDisplay", () => {
  it("returns empty string for undefined value", () => {
    expect(formatDateForDisplay(undefined)).toBe("");
  });

  it("formats a single Date using toLocaleDateString", () => {
    const date = new Date("2024-06-15T00:00:00");
    const result = formatDateForDisplay(date);
    expect(result).toBe(date.toLocaleDateString());
  });

  it("formats a single Date in single mode explicitly", () => {
    const date = new Date("2024-01-01T00:00:00");
    const result = formatDateForDisplay(date, "single");
    expect(result).toBe(date.toLocaleDateString());
  });

  it("formats a complete date range", () => {
    const from = new Date("2024-01-01T00:00:00");
    const to = new Date("2024-01-31T00:00:00");
    const result = formatDateForDisplay({ from, to }, "range");
    expect(result).toBe(
      `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`,
    );
  });

  it("formats a date range with only from date", () => {
    const from = new Date("2024-01-01T00:00:00");
    const result = formatDateForDisplay(
      { from, to: undefined },
      "range",
    );
    expect(result).toBe(`${from.toLocaleDateString()} - `);
  });

  it("returns empty string for date range with no from date", () => {
    const result = formatDateForDisplay(
      { from: undefined, to: undefined },
      "range",
    );
    expect(result).toBe("");
  });

  it("returns empty string for a DateRange passed in single mode", () => {
    const result = formatDateForDisplay(
      { from: new Date(), to: new Date() },
      "single",
    );
    expect(result).toBe("");
  });
});

describe("serializeDateValue", () => {
  it("returns empty string for undefined", () => {
    expect(serializeDateValue(undefined)).toBe("");
  });

  it("serializes a single Date to ISO string", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    expect(serializeDateValue(date)).toBe(date.toISOString());
  });

  it("serializes a complete date range", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeDateValue({ from, to });
    expect(result).toBe(`${from.toISOString()},${to.toISOString()}`);
  });

  it("serializes a date range with only from date", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const result = serializeDateValue({ from, to: undefined });
    expect(result).toBe(`${from.toISOString()},`);
  });

  it("serializes a date range with only to date", () => {
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeDateValue({ from: undefined, to });
    expect(result).toBe(`,${to.toISOString()}`);
  });

  it("serializes a date range with both undefined", () => {
    const result = serializeDateValue({ from: undefined, to: undefined });
    expect(result).toBe(",");
  });
});

describe("isDateRange", () => {
  it("returns false for undefined", () => {
    expect(isDateRange(undefined)).toBe(false);
  });

  it("returns false for a Date object", () => {
    expect(isDateRange(new Date())).toBe(false);
  });

  it("returns true for a DateRange object", () => {
    expect(isDateRange({ from: new Date(), to: new Date() })).toBe(true);
  });

  it("returns true for a DateRange with undefined values", () => {
    expect(isDateRange({ from: undefined, to: undefined })).toBe(true);
  });
});
