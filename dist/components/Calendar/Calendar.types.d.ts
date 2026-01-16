export type CalendarDateRange = {
    from: Date | undefined;
    to: Date | undefined;
};
export type CalendarMode = "single" | "range";
export type CalendarLabels = {
    apply?: string;
    cancel?: string;
    clear?: string;
};
export type CalendarProps = {
    /** Mode of the calendar: single date or date range */
    mode?: CalendarMode;
    /** Selected date(s) */
    selected?: Date | CalendarDateRange | undefined;
    /** Callback when date(s) are selected */
    onSelect?: (date: Date | CalendarDateRange | undefined) => void;
    /** Show two months instead of one */
    showMonths?: 1 | 2;
    /** Disable dates outside a range */
    disabledDates?: (date: Date) => boolean;
    /** Label for the calendar */
    label?: string;
    /** Error message */
    error?: string;
    /** Is the input disabled */
    disabled?: boolean;
    /** Is the input read-only */
    readonly?: boolean;
    /** Is the input required */
    required?: boolean;
    /** Locale for date formatting (e.g., 'es-ES', 'en-US', 'fr-FR') */
    locale?: string;
    /** Labels for buttons and aria-labels. Defaults to English */
    labels?: CalendarLabels;
};
