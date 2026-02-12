# Components Documentation

## Table of Contents

- [Button](#button)
- [IconButton](#iconbutton)
- [Link](#link)
- [Input](#input)
- [Checkbox](#checkbox)
- [Select](#select)
- [MultiSelect](#multiselect)
- [Calendar](#calendar)
- [DateInput](#dateinput)
- [Clock](#clock)
- [TimeInput](#timeinput)
- [ClockNumbers](#clocknumbers)
- [Modal](#modal)
- [Sidebar](#sidebar)
- [Dropdown](#dropdown)
- [Menu](#menu)
- [DataTable](#datatable)
- [FileUploader](#fileuploader)
- [Actions](#actions)
- [InteractiveMap](#interactivemap)
- [Card](#card)
- [WeekCalendar](#weekcalendar)
- [WeekCalendarRow](#weekcalendarrow)

---

## Button

Versatile button component with multiple variants, colors, and states.

### Props

| Property    | Type                                                | Required | Description                               |
| ----------- | --------------------------------------------------- | -------- | ----------------------------------------- |
| `label`     | `string`                                            | ✅       | Text displayed inside the button          |
| `type`      | `'button' \| 'submit' \| 'reset'`                   | ❌       | HTML button type (default: `'button'`)    |
| `variant`   | `'solid' \| 'outlined' \| 'text'`                   | ❌       | Visual style variant (default: `'solid'`) |
| `color`     | `'primary' \| 'success' \| 'error' \| 'info'`       | ❌       | Color scheme (default: `'primary'`)       |
| `disabled`  | `boolean`                                           | ❌       | Disables the button when true             |
| `fullWidth` | `boolean`                                           | ❌       | Makes the button take full width          |
| `loading`   | `boolean`                                           | ❌       | Shows a loading spinner                   |
| `onClick`   | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | ❌       | Callback function on click                |

### Usage Example

```tsx
import { Button } from "@neus-ui/components";

export function MyComponent() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <Button
        label="Save"
        variant="solid"
        color="primary"
        onClick={handleClick}
      />

      <Button label="Cancel" variant="outlined" color="error" />

      <Button label="Loading..." loading={true} disabled={true} />
    </div>
  );
}
```

---

## IconButton

Specialized button component that displays an icon with support for different sizes, variants, and colors.

### Props

| Property   | Type                                          | Required | Description                         |
| ---------- | --------------------------------------------- | -------- | ----------------------------------- |
| `icon`     | `IconType` (react-icons)                      | ✅       | Icon to display (from react-icons)  |
| `type`     | `'button' \| 'submit' \| 'reset'`             | ❌       | HTML button type                    |
| `variant`  | `'solid' \| 'outlined' \| 'text'`             | ❌       | Visual style (default: `'solid'`)   |
| `color`    | `'primary' \| 'success' \| 'error' \| 'info'` | ❌       | Color scheme (default: `'primary'`) |
| `size`     | `'small' \| 'medium' \| 'large'`              | ❌       | Button size (default: `'medium'`)   |
| `disabled` | `boolean`                                     | ❌       | Disables the button                 |
| `loading`  | `boolean`                                     | ❌       | Shows loading state                 |
| `onClick`  | `() => void`                                  | ❌       | Callback function on click          |

### Usage Example

```tsx
import { IconButton } from "@neus-ui/components";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

export function ActionsBar() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <IconButton
        icon={FiEdit2}
        color="primary"
        size="medium"
        onClick={() => console.log("Edit")}
      />

      <IconButton icon={FiEye} color="info" size="small" />

      <IconButton icon={FiTrash2} color="error" variant="outlined" />
    </div>
  );
}
```

---

## Link

Link component with consistent styling and two theme variants.

### Props

| Property | Type                       | Required | Description                           |
| -------- | -------------------------- | -------- | ------------------------------------- |
| `label`  | `string`                   | ✅       | Link text                             |
| `type`   | `'primary' \| 'secondary'` | ❌       | Visual variant (default: `'primary'`) |
| `href`   | `string`                   | ❌       | URL destination                       |

### Usage Example

```tsx
import { Link } from "@neus-ui/components";

export function Navigation() {
  return (
    <nav>
      <Link label="Home" type="primary" href="/" />

      <Link label="Documentation" type="secondary" href="/docs" />

      <Link label="About Us" href="/about" />
    </nav>
  );
}
```

---

## Input

Flexible text input field that supports multiple types and validation.

### Props

| Property       | Type                                                                       | Required | Description                    |
| -------------- | -------------------------------------------------------------------------- | -------- | ------------------------------ |
| `name`         | `string`                                                                   | ❌       | Name attribute                 |
| `value`        | `string \| number`                                                         | ❌       | Current input value            |
| `defaultValue` | `string \| number`                                                         | ❌       | Default value (uncontrolled)   |
| `placeholder`  | `string`                                                                   | ❌       | Placeholder text               |
| `label`        | `string`                                                                   | ❌       | Input label                    |
| `error`        | `string`                                                                   | ❌       | Error message to display       |
| `disabled`     | `boolean`                                                                  | ❌       | Disables the input             |
| `readonly`     | `boolean`                                                                  | ❌       | Makes input read-only          |
| `required`     | `boolean`                                                                  | ❌       | Marks input as required        |
| `type`         | `'text' \| 'password' \| 'email' \| 'number' \| 'color' \| 'tel' \| 'url'` | ❌       | Input type (default: `'text'`) |
| `min`          | `string \| number`                                                         | ❌       | Minimum value (for numbers)    |
| `max`          | `string \| number`                                                         | ❌       | Maximum value (for numbers)    |
| `step`         | `string \| number`                                                         | ❌       | Step increment for numbers     |
| `onChange`     | `(value: string) => void`                                                  | ❌       | Callback on value change       |

### Usage Example

```tsx
import { Input } from "@neus-ui/components";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        required
      />

      <Input
        label="Age"
        type="number"
        min="18"
        max="120"
        onChange={(value) => console.log(value)}
      />
    </form>
  );
}
```

---

## Checkbox

Checkbox component with support for controlled and uncontrolled states.

### Props

| Property   | Type                         | Required | Description              |
| ---------- | ---------------------------- | -------- | ------------------------ |
| `name`     | `string`                     | ❌       | Name attribute           |
| `checked`  | `boolean`                    | ❌       | Checkbox state           |
| `disabled` | `boolean`                    | ❌       | Disables the checkbox    |
| `onChange` | `(checked: boolean) => void` | ❌       | Callback on state change |

### Usage Example

```tsx
import { Checkbox } from "@neus-ui/components";
import { useState } from "react";

export function SubscriptionForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div>
      <Checkbox
        name="acceptTerms"
        checked={acceptTerms}
        onChange={setAcceptTerms}
      />
      <label>Accept terms and conditions</label>

      <Checkbox
        name="newsletter"
        checked={newsletter}
        onChange={setNewsletter}
      />
      <label>I want to receive news by email</label>

      <Checkbox name="disabledOption" disabled={true} />
      <label>Disabled option</label>
    </div>
  );
}
```

---

## Select

Dropdown list component for selecting one option from a predefined set.

### Props

| Property       | Type                      | Required | Description                  |
| -------------- | ------------------------- | -------- | ---------------------------- |
| `options`      | `SelectOption[]`          | ✅       | Array of available options   |
| `name`         | `string`                  | ❌       | Name attribute               |
| `value`        | `string`                  | ❌       | Currently selected value     |
| `defaultValue` | `string`                  | ❌       | Default value                |
| `placeholder`  | `string`                  | ❌       | Placeholder text             |
| `label`        | `string`                  | ❌       | Select label                 |
| `error`        | `string`                  | ❌       | Error message                |
| `disabled`     | `boolean`                 | ❌       | Disables the select          |
| `onChange`     | `(value: string) => void` | ❌       | Callback on selection change |

**SelectOption:**

```tsx
type SelectOption = {
  value?: string | null;
  label: string;
};
```

### Usage Example

```tsx
import { Select } from "@neus-ui/components";
import { useState } from "react";

export function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    { label: "Argentina", value: "AR" },
    { label: "Chile", value: "CL" },
    { label: "Colombia", value: "CO" },
    { label: "Mexico", value: "MX" },
    { label: "Peru", value: "PE" },
  ];

  return (
    <Select
      label="Country"
      placeholder="Select a country"
      options={countries}
      value={selectedCountry}
      onChange={setSelectedCountry}
    />
  );
}
```

---

## MultiSelect

Component for selecting multiple options from a set.

### Props

| Property       | Type                         | Required | Description                  |
| -------------- | ---------------------------- | -------- | ---------------------------- |
| `options`      | `SelectOption[]`             | ✅       | Array of available options   |
| `name`         | `string`                     | ✅       | Name attribute               |
| `value`        | `string[]`                   | ❌       | Array of selected values     |
| `defaultValue` | `string[]`                   | ❌       | Array of default values      |
| `label`        | `string`                     | ❌       | Component label              |
| `placeholder`  | `string`                     | ❌       | Placeholder text             |
| `error`        | `string`                     | ❌       | Error message                |
| `disabled`     | `boolean`                    | ❌       | Disables the component       |
| `onChange`     | `(values: string[]) => void` | ❌       | Callback on selection change |

### Usage Example

```tsx
import { MultiSelect } from "@neus-ui/components";
import { useState } from "react";

export function PermissionsManager() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const permissions = [
    { label: "Read", value: "read" },
    { label: "Write", value: "write" },
    { label: "Delete", value: "delete" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <MultiSelect
      name="permissions"
      label="Permissions"
      options={permissions}
      value={selectedPermissions}
      onChange={setSelectedPermissions}
      placeholder="Select one or more permissions"
    />
  );
}
```

---

## Calendar

Interactive calendar component for selecting individual dates, ranges, or multiple dates.

### Props

| Property       | Type                                                        | Required | Description                   |
| -------------- | ----------------------------------------------------------- | -------- | ----------------------------- |
| `value`        | `Date \| Date[] \| DateRange`                               | ❌       | Currently selected value      |
| `defaultValue` | `Date \| Date[] \| DateRange`                               | ❌       | Default value                 |
| `name`         | `string`                                                    | ❌       | Name attribute                |
| `label`        | `string`                                                    | ❌       | Calendar label                |
| `disabled`     | `boolean`                                                   | ❌       | Disables the calendar         |
| `readonly`     | `boolean`                                                   | ❌       | Read-only mode                |
| `multiple`     | `boolean`                                                   | ❌       | Allow multiple date selection |
| `error`        | `string`                                                    | ❌       | Error message                 |
| `onChange`     | `(value: Date \| Date[] \| DateRange \| undefined) => void` | ❌       | Callback on date change       |

### Usage Example

```tsx
import { Calendar } from "@neus-ui/components";
import { useState } from "react";

export function EventScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <div>
      <Calendar
        label="Select a date"
        value={selectedDate}
        onChange={setSelectedDate}
      />

      <Calendar label="Date range" value={dateRange} onChange={setDateRange} />
    </div>
  );
}
```

---

## DateInput

Input field for selecting dates with a user-friendly interface.

### Props

| Property       | Type                                              | Required | Description                          |
| -------------- | ------------------------------------------------- | -------- | ------------------------------------ |
| `value`        | `Date \| DateRange`                               | ❌       | Current value                        |
| `defaultValue` | `Date \| DateRange`                               | ❌       | Default value                        |
| `name`         | `string`                                          | ❌       | Name attribute                       |
| `label`        | `string`                                          | ❌       | Input label                          |
| `placeholder`  | `string`                                          | ❌       | Placeholder text                     |
| `disabled`     | `boolean`                                         | ❌       | Disables the input                   |
| `readonly`     | `boolean`                                         | ❌       | Read-only mode                       |
| `required`     | `boolean`                                         | ❌       | Marks as required                    |
| `error`        | `string`                                          | ❌       | Error message                        |
| `mode`         | `'single' \| 'range'`                             | ❌       | Selection mode (default: `'single'`) |
| `onChange`     | `(value: Date \| DateRange \| undefined) => void` | ❌       | Callback on change                   |

### Usage Example

```tsx
import { DateInput } from "@neus-ui/components";
import { useState } from "react";

export function ReservationForm() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [stayPeriod, setStayPeriod] = useState<{ from?: Date; to?: Date }>({});

  return (
    <form>
      <DateInput
        label="Check-in date"
        mode="single"
        value={checkInDate}
        onChange={setCheckInDate}
        required
      />

      <DateInput
        label="Stay period"
        mode="range"
        value={stayPeriod}
        onChange={setStayPeriod}
      />
    </form>
  );
}
```

---

## Clock

Circular clock component for selecting hours and minutes.

### Props

| Property   | Type                         | Required | Description                    |
| ---------- | ---------------------------- | -------- | ------------------------------ |
| `value`    | `TimeValue`                  | ❌       | Currently selected time        |
| `disabled` | `boolean`                    | ❌       | Disables the clock             |
| `readonly` | `boolean`                    | ❌       | Read-only mode                 |
| `format`   | `'12h' \| '24h'`             | ❌       | Time format (default: `'24h'`) |
| `onChange` | `(value: TimeValue) => void` | ❌       | Callback on time change        |

**TimeValue:**

```tsx
type TimeValue = {
  hours: number;
  minutes: number;
};
```

### Usage Example

```tsx
import { Clock } from "@neus-ui/components";
import { useState } from "react";

export function TimePicker() {
  const [time, setTime] = useState<{ hours: number; minutes: number }>({
    hours: 14,
    minutes: 30,
  });

  return <Clock value={time} onChange={setTime} format="24h" />;
}
```

---

## TimeInput

Input field for selecting time with integrated clock interface.

### Props

| Property       | Type                                      | Required | Description                    |
| -------------- | ----------------------------------------- | -------- | ------------------------------ |
| `value`        | `TimeValue`                               | ❌       | Current time                   |
| `defaultValue` | `TimeValue`                               | ❌       | Default time                   |
| `name`         | `string`                                  | ❌       | Name attribute                 |
| `label`        | `string`                                  | ❌       | Input label                    |
| `placeholder`  | `string`                                  | ❌       | Placeholder text               |
| `required`     | `boolean`                                 | ❌       | Marks as required              |
| `error`        | `string`                                  | ❌       | Error message                  |
| `disabled`     | `boolean`                                 | ❌       | Disables the input             |
| `readonly`     | `boolean`                                 | ❌       | Read-only mode                 |
| `format`       | `'12h' \| '24h'`                          | ❌       | Time format (default: `'24h'`) |
| `onChange`     | `(value: TimeValue \| undefined) => void` | ❌       | Callback on change             |

### Usage Example

```tsx
import { TimeInput } from "@neus-ui/components";
import { useState } from "react";

export function AppointmentForm() {
  const [startTime, setStartTime] = useState<
    { hours: number; minutes: number } | undefined
  >();
  const [endTime, setEndTime] = useState<
    { hours: number; minutes: number } | undefined
  >();

  return (
    <form>
      <TimeInput
        label="Start time"
        format="24h"
        value={startTime}
        onChange={setStartTime}
        required
      />

      <TimeInput
        label="End time"
        format="24h"
        value={endTime}
        onChange={setEndTime}
      />
    </form>
  );
}
```

---

## ClockNumbers

Internal component that displays clock numbers (hours or minutes). Typically used within `Clock`.

### Props

| Property       | Type                   | Required | Description        |
| -------------- | ---------------------- | -------- | ------------------ |
| `mode`         | `'hours' \| 'minutes'` | ✅       | Display mode       |
| `format`       | `'12h' \| '24h'`       | ✅       | Time format        |
| `currentValue` | `TimeValue`            | ✅       | Current time value |

### Note

This is a low-level component and is generally not used directly in applications.

---

## Modal

Modal dialog component for displaying content in the foreground with confirmation/cancellation actions.

### Props

| Property             | Type              | Required | Description                                 |
| -------------------- | ----------------- | -------- | ------------------------------------------- |
| `isOpen`             | `boolean`         | ❌       | Controls modal visibility                   |
| `title`              | `string`          | ❌       | Modal title                                 |
| `children`           | `React.ReactNode` | ❌       | Modal content                               |
| `confirmText`        | `string`          | ❌       | Confirm button text (default: `'Confirm'`)  |
| `cancelText`         | `string`          | ❌       | Cancel button text (default: `'Cancel'`)    |
| `confirmButtonColor` | `ButtonColor`     | ❌       | Confirm button color (default: `'primary'`) |
| `onConfirm`          | `() => void`      | ❌       | Callback on confirm                         |
| `onCancel`           | `() => void`      | ❌       | Callback on cancel                          |

### Usage Example

```tsx
import { Modal } from "@neus-ui/components";
import { useState } from "react";

export function ConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Item deleted");
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete Item</button>

      <Modal
        isOpen={isOpen}
        title="Confirm deletion"
        confirmText="Yes, delete"
        cancelText="Cancel"
        confirmButtonColor="error"
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
      >
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}
```

---

## Sidebar

Sidebar component with navigation items.

### Props

| Property | Type            | Required | Description            |
| -------- | --------------- | -------- | ---------------------- |
| `items`  | `SidebarItem[]` | ✅       | Array of sidebar items |
| `title`  | `string`        | ❌       | Sidebar title          |

**SidebarItem:**

```tsx
type SidebarItem = {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

### Usage Example

```tsx
import { Sidebar } from "@neus-ui/components";
import { FiHome, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";
import { useState } from "react";

export function AppLayout() {
  const [activePage, setActivePage] = useState("home");

  const menuItems = [
    {
      label: "Home",
      icon: FiHome,
      onClick: () => setActivePage("home"),
      active: activePage === "home",
    },
    {
      label: "Users",
      icon: FiUsers,
      onClick: () => setActivePage("users"),
      active: activePage === "users",
    },
    {
      label: "Settings",
      icon: FiSettings,
      onClick: () => setActivePage("settings"),
      active: activePage === "settings",
    },
    {
      label: "Logout",
      icon: FiLogOut,
      onClick: () => console.log("Logout"),
      visible: true,
    },
  ];

  return <Sidebar title="My Application" items={menuItems} />;
}
```

---

## Dropdown

Dropdown menu component triggered by an icon avatar with a caret indicator.

### Props

| Property | Type             | Required | Description                 |
| -------- | ---------------- | -------- | --------------------------- |
| `icon`   | `IconType`       | ❌       | Icon displayed as avatar    |
| `name`   | `string`         | ❌       | Name displayed in the panel |
| `items`  | `DropdownItem[]` | ✅       | Array of dropdown items     |

**DropdownItem:**

```tsx
type DropdownItem = {
  label: string;
  onClick: () => void;
};
```

### Usage Example

```tsx
import { Dropdown } from "@neus-ui/components";
import { FiUser } from "react-icons/fi";

export function UserDropdown() {
  const items = [
    {
      label: "Profile",
      onClick: () => console.log("Go to profile"),
    },
    {
      label: "Settings",
      onClick: () => console.log("Go to settings"),
    },
    {
      label: "Logout",
      onClick: () => console.log("Logging out..."),
    },
  ];

  return <Dropdown icon={FiUser} name="John Doe" items={items} />;
}
```

---

## Menu

Contextual or dropdown menu component with actions.

### Props

| Property | Type         | Required | Description                 |
| -------- | ------------ | -------- | --------------------------- |
| `icon`   | `IconType`   | ❌       | Icon that triggers the menu |
| `name`   | `string`     | ❌       | Menu name                   |
| `items`  | `MenuItem[]` | ✅       | Array of menu items         |

**MenuItem:**

```tsx
type MenuItem = {
  label: string;
  onClick: () => void;
};
```

### Usage Example

```tsx
import { Menu } from "@neus-ui/components";
import { FiMoreVertical } from "react-icons/fi";

export function FileActions() {
  const menuItems = [
    {
      label: "Download",
      onClick: () => console.log("Downloading file..."),
    },
    {
      label: "Share",
      onClick: () => console.log("Opening share dialog..."),
    },
    {
      label: "Report",
      onClick: () => console.log("Reporting file..."),
    },
  ];

  return <Menu icon={FiMoreVertical} name="Actions" items={menuItems} />;
}
```

---

## DataTable

Data table component with pagination, row actions, and card layout support.

### Props

| Property             | Type                                       | Required | Description                   |
| -------------------- | ------------------------------------------ | -------- | ----------------------------- |
| `data`               | `T[]`                                      | ✅       | Array of data to display      |
| `pagination`         | `PaginationInfo`                           | ✅       | Pagination information        |
| `onEdit`             | `(rowData: T) => void`                     | ❌       | Callback on row edit          |
| `onDelete`           | `(rowData: T) => void`                     | ❌       | Callback on row delete        |
| `onInfo`             | `(rowData: T) => void`                     | ❌       | Callback on more info         |
| `onPaginationChange` | `(params: PaginationChangeParams) => void` | ❌       | Callback on pagination change |
| `columnLabels`       | `Record<string, string>`                   | ❌       | Column name mappings          |
| `useCardLayout`      | `boolean`                                  | ❌       | Use card layout on mobile     |
| `noDataTitle`        | `string`                                   | ❌       | Title when no data            |
| `noDataDescription`  | `string`                                   | ❌       | Description when no data      |
| `hiddenColumns`      | `string[]`                                 | ❌       | Column names to hide          |

**PaginationInfo:**

```tsx
interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface PaginationChangeParams {
  currentPage: number;
  pageSize: number;
}
```

### Usage Example

```tsx
import { DataTable } from "@neus-ui/components";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      createdAt: "2024-01-10",
    },
  ]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 50,
  });

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  return (
    <DataTable
      data={users}
      pagination={pagination}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columnLabels={{
        id: "ID",
        name: "Name",
        email: "Email",
        role: "Role",
        createdAt: "Created At",
      }}
      hiddenColumns={["id"]}
      useCardLayout={true}
      noDataTitle="No users"
      noDataDescription="No users found in the system"
      onPaginationChange={(params) => {
        console.log("Go to page:", params.currentPage);
      }}
    />
  );
}
```

---

## FileUploader

Component for uploading files with type and size validation.

### Props

| Property          | Type                                                              | Required | Description                  |
| ----------------- | ----------------------------------------------------------------- | -------- | ---------------------------- |
| `allowedTypes`    | `FileType[]`                                                      | ✅       | Allowed file types           |
| `maxWeight`       | `number`                                                          | ❌       | Maximum file size in MB      |
| `multiple`        | `boolean`                                                         | ❌       | Allow multiple files         |
| `error`           | `string`                                                          | ❌       | Error message                |
| `placeholder`     | `string`                                                          | ❌       | Placeholder text             |
| `deleteFilesText` | `string`                                                          | ❌       | Delete button text           |
| `disabled`        | `boolean`                                                         | ❌       | Disables the uploader        |
| `onChange`        | `(data: FileUploadData \| null, error?: FileUploadError) => void` | ✅       | Callback with files or error |

**FileType Enum:**

```tsx
enum FileType {
  IMAGE = "image/*",
  PDF = ".pdf",
  DOC = ".doc,.docx",
  XLS = ".xls,.xlsx",
  TXT = ".txt",
  ZIP = ".zip",
  RAR = ".rar",
  VIDEO = "video/*",
  AUDIO = "audio/*",
  CSV = ".csv",
  JSON = ".json",
}
```

**FileUploadData:**

```tsx
type FileUploadData = {
  files: File[];
  totalSize: number;
};

type FileUploadError = {
  type: "size" | "type" | "count";
  message: string;
};
```

### Usage Example

```tsx
import { FileUploader, FileType } from "@neus-ui/components";
import { useState } from "react";

export function DocumentUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileChange = (data, error) => {
    if (error) {
      setUploadError(error.message);
      setUploadedFiles([]);
    } else if (data) {
      setUploadError("");
      setUploadedFiles(data.files);
      console.log("Files uploaded:", data.files);
    }
  };

  return (
    <div>
      <FileUploader
        allowedTypes={[FileType.PDF, FileType.DOC, FileType.XLS]}
        maxWeight={10}
        multiple={true}
        placeholder="Drag your files here"
        deleteFilesText="Delete files"
        onChange={handleFileChange}
      />

      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded files:</h3>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Actions

Action group component for edit, delete, or view more information.

### Props

| Property   | Type         | Required | Description              |
| ---------- | ------------ | -------- | ------------------------ |
| `onInfo`   | `() => void` | ❌       | Callback for information |
| `onEdit`   | `() => void` | ❌       | Callback for edit        |
| `onDelete` | `() => void` | ❌       | Callback for delete      |

### Usage Example

```tsx
import { Actions } from "@neus-ui/components";

export function UserRow({ user }) {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>

      <Actions
        onInfo={() => console.log("View info for:", user.name)}
        onEdit={() => console.log("Edit:", user.name)}
        onDelete={() => console.log("Delete:", user.name)}
      />
    </div>
  );
}
```

---

## InteractiveMap

Interactive map component with location search and coordinate selection.

### Props

| Property               | Type                               | Required | Description                             |
| ---------------------- | ---------------------------------- | -------- | --------------------------------------- |
| `googleMapsApiKey`     | `string`                           | ✅       | Google Maps API key                     |
| `initialCoordinates`   | `string`                           | ❌       | Initial coordinates (format: "lat,lng") |
| `initialAddress`       | `string`                           | ❌       | Initial address                         |
| `searchBoxPlaceholder` | `string`                           | ❌       | Search placeholder text                 |
| `instructionsText`     | `string`                           | ❌       | Instructions text                       |
| `readonly`             | `boolean`                          | ❌       | Read-only mode                          |
| `onLocationSelect`     | `(location: LocationData) => void` | ❌       | Callback on location select             |

**LocationData:**

```tsx
type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
  coordinates: string;
};
```

### Usage Example

```tsx
import { InteractiveMap } from "@neus-ui/components";
import { useState } from "react";

export function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    console.log("Location selected:", location);
    setSelectedLocation(location);
  };

  return (
    <div>
      <InteractiveMap
        googleMapsApiKey="your-api-key-here"
        initialAddress="Buenos Aires, Argentina"
        searchBoxPlaceholder="Search a location..."
        instructionsText="Click on the map or search an address"
        onLocationSelect={handleLocationSelect}
      />

      {selectedLocation && (
        <div>
          <h3>Selected Location</h3>
          <p>Address: {selectedLocation.address}</p>
          <p>Country: {selectedLocation.country}</p>
          <p>State: {selectedLocation.state}</p>
          <p>City: {selectedLocation.city}</p>
          <p>Coordinates: {selectedLocation.coordinates}</p>
        </div>
      )}
    </div>
  );
}
```

---

## Card

Flexible card component with optional avatar, header sections, color variants, and fill mode.

### Props

| Property      | Type              | Required | Description                                        |
| ------------- | ----------------- | -------- | -------------------------------------------------- |
| `avatarImage` | `string`          | ❌       | URL for the avatar image                           |
| `avatarAlt`   | `string`          | ❌       | Alt text for avatar; first letter used as fallback |
| `header`      | `CardHeaderProps` | ❌       | Header with leading and trailing content           |
| `content`     | `React.ReactNode` | ❌       | Card body content                                  |
| `fill`        | `boolean`         | ❌       | Enables filled background style                    |
| `color`       | `CardColor`       | ❌       | Color variant for the card                         |

**CardHeaderProps:**

```tsx
type CardHeaderProps = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};
```

**CardColor:**

```tsx
type CardColor = "purple" | "pink" | "red" | "yellow" | "blue" | "green";
```

### Usage Example

```tsx
import { Card } from "@neus-ui/components";

export function UserCard() {
  return (
    <Card
      avatarImage="https://example.com/avatar.jpg"
      avatarAlt="John"
      header={{
        leading: <span>John Doe</span>,
        trailing: <span>Admin</span>,
      }}
      content={<p>User profile card with details.</p>}
      color="blue"
      fill
    />
  );
}
```

---

## WeekCalendar

Weekly calendar component that displays events organized by categories across a 7-day view with navigation.

### Props

| Property       | Type                                     | Required | Description                                         |
| -------------- | ---------------------------------------- | -------- | --------------------------------------------------- |
| `title`        | `string`                                 | ❌       | Calendar title (default: `'Calendar'`)              |
| `events`       | `EventsByCategory[]`                     | ❌       | Array of event groups organized by category         |
| `hoverContent` | `React.ReactNode`                        | ❌       | Custom tooltip shown at cursor on event cell hover  |
| `onEventClick` | `(event: CalendarEvent) => void`         | ❌       | Callback when clicking an event cell                |
| `onWeekChange` | `(weekStart: Date, weekEnd: Date) => void` | ❌     | Callback when navigating to a different week        |

**EventsByCategory:**

```tsx
type EventsByCategory = {
  category: Category;
  events: CalendarEvent[];
};

type Category = {
  color?: string;
  title: string;
  label: string;
};

type CalendarEvent = {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};
```

### Usage Example

```tsx
import { WeekCalendar } from "@neus-ui/components";

export function EventsCalendar() {
  const events = [
    {
      category: { title: "Room A", label: "Suite", color: "purple" },
      events: [
        {
          id: 1,
          title: "John Doe",
          start: new Date(2024, 0, 15),
          end: new Date(2024, 0, 17),
          description: "2 guests",
        },
      ],
    },
    {
      category: { title: "Room B", label: "Standard", color: "blue" },
      events: [
        {
          id: 2,
          title: "Jane Smith",
          start: new Date(2024, 0, 14),
          end: new Date(2024, 0, 14),
          description: "1 guest",
        },
      ],
    },
  ];

  return (
    <WeekCalendar
      title="Reservations"
      events={events}
      hoverContent={<div>Event details tooltip</div>}
      onEventClick={(event) => console.log("Clicked:", event.title)}
      onWeekChange={(start, end) => console.log("Week:", start, end)}
    />
  );
}
```

---

## WeekCalendarRow

Row component used internally by `WeekCalendar` to render a single category row with its events across the week days.

### Props

| Property       | Type                             | Required | Description                                         |
| -------------- | -------------------------------- | -------- | --------------------------------------------------- |
| `entry`        | `EventsByCategory`               | ✅       | Category with its events                            |
| `days`         | `Date[]`                         | ✅       | Array of dates representing the week                |
| `color`        | `string`                         | ✅       | Color for the category indicator                    |
| `hoverContent` | `React.ReactNode`                | ❌       | Custom tooltip shown at cursor on event cell hover  |
| `onEventClick` | `(event: CalendarEvent) => void` | ❌       | Callback when clicking an event cell                |

### Note

This is typically used internally by `WeekCalendar` and does not need to be used directly in most applications.

---

## General Usage

### Importing Components

```tsx
// Import a single component
import { Button } from "@neus-ui/components";

// Import multiple components
import { Button, Input, Checkbox, Modal } from "@neus-ui/components";
```
