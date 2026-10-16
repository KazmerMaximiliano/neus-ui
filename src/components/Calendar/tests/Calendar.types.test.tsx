import type { DateRange } from "react-day-picker";
import { describe, expectTypeOf, it } from "vitest";
import type { CalendarProps } from "../Calendar.types";

describe("Calendar public types", () => {
  it("discriminates single, range and multiple selections", () => {
    expectTypeOf<
      Extract<CalendarProps, { mode?: "single" }>["value"]
    >().toEqualTypeOf<Date | undefined>();
    expectTypeOf<
      Extract<CalendarProps, { mode: "range" }>["value"]
    >().toEqualTypeOf<DateRange | undefined>();
    expectTypeOf<
      Extract<CalendarProps, { mode: "multiple" }>["value"]
    >().toEqualTypeOf<Date[] | undefined>();
    // @ts-expect-error The range mode cannot accept an array of dates.
    const invalidRange: CalendarProps = { mode: "range", value: [new Date()] };
    // @ts-expect-error Calendar no longer accepts the third-party selected prop.
    const legacy: CalendarProps = { selected: new Date() };
    expectTypeOf(invalidRange).toEqualTypeOf<CalendarProps>();
    expectTypeOf(legacy).toEqualTypeOf<CalendarProps>();
  });
});
