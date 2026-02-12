import { describe, expect, it } from "vitest";
import { serializeValue, getDayPickerProps } from "./Calendar.utils";

describe("serializeValue", () => {
  it("returns empty string for undefined", () => {
    expect(serializeValue(undefined)).toBe("");
  });

  it("serializes a single Date to ISO string", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    expect(serializeValue(date)).toBe(date.toISOString());
  });

  it("serializes an array of Dates", () => {
    const date1 = new Date("2024-01-01T00:00:00Z");
    const date2 = new Date("2024-01-15T00:00:00Z");
    const result = serializeValue([date1, date2]);
    expect(result).toBe(`${date1.toISOString()},${date2.toISOString()}`);
  });

  it("serializes an empty array", () => {
    expect(serializeValue([])).toBe("");
  });

  it("serializes a complete DateRange", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeValue({ from, to });
    expect(result).toBe(`${from.toISOString()},${to.toISOString()}`);
  });

  it("serializes a DateRange with only from", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const result = serializeValue({ from, to: undefined });
    expect(result).toBe(`${from.toISOString()},`);
  });

  it("serializes a DateRange with only to", () => {
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeValue({ from: undefined, to });
    expect(result).toBe(`,${to.toISOString()}`);
  });
});

describe("getDayPickerProps", () => {
  const testDate = new Date("2024-06-15");
  const testRange = {
    from: new Date("2024-01-01"),
    to: new Date("2024-01-31"),
  };
  const testMultiple = [new Date("2024-01-01"), new Date("2024-01-15")];

  it("returns single mode props", () => {
    const result = getDayPickerProps("single", testDate, false);
    expect(result).toEqual({
      mode: "single",
      selected: testDate,
      required: false,
    });
  });

  it("returns single mode props with required true", () => {
    const result = getDayPickerProps("single", testDate, true);
    expect(result).toEqual({
      mode: "single",
      selected: testDate,
      required: true,
    });
  });

  it("returns range mode props", () => {
    const result = getDayPickerProps("range", testRange, false);
    expect(result).toEqual({
      mode: "range",
      selected: testRange,
      required: true,
    });
  });

  it("returns multiple mode props", () => {
    const result = getDayPickerProps("multiple", testMultiple, false);
    expect(result).toEqual({
      mode: "multiple",
      selected: testMultiple,
      required: true,
    });
  });

  it("defaults to single mode for unknown mode", () => {
    const result = getDayPickerProps("unknown", testDate, false);
    expect(result).toEqual({
      mode: "single",
      selected: testDate,
      required: false,
    });
  });

  it("handles undefined value in single mode", () => {
    const result = getDayPickerProps("single", undefined, false);
    expect(result).toEqual({
      mode: "single",
      selected: undefined,
      required: false,
    });
  });
});
