import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Pagination as PaginationComponent } from "./Pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PaginationStoryArgs } from "./Pagination.types";

const meta: Meta<PaginationStoryArgs> = {
  title: "Navigation/Pagination",
  component: PaginationComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the pagination",
    },
    page: {
      control: { type: "number", min: 1 },
      description: "The current page, from 1",
    },
    totalPages: {
      control: { type: "number", min: 0 },
      description: "How many pages there are",
    },
    siblingCount: {
      control: { type: "number", min: 0 },
      description: "Pages on each side of the current one",
    },
    variant: {
      control: "select",
      options: ["pages", "compact"],
      description: "Page buttons, or previous and next only",
    },
    pageSize: {
      control: "number",
      description: "Items per page, shown in the select",
    },
    pageSizeOptions: {
      control: "object",
      description: "Choices of the page-size select",
    },
    labels: {
      control: "object",
      description: "Accessible names and the select's label",
    },
    onChange: { action: "changed", description: "Called with the page chosen" },
    onPageSizeChange: {
      action: "page size changed",
      description: "Called with the page size chosen",
    },
    className: {
      control: "text",
      description: "Additional classes on the navigation",
    },
    style: {
      control: "object",
      description: "CSS properties on the navigation",
    },
    listClassName: {
      control: "text",
      description: "Additional classes on the list of pages",
    },
    listStyle: {
      control: "object",
      description: "CSS properties on the list of pages",
    },
    pageClassName: {
      control: "text",
      description: "Additional classes on each page button",
    },
    pageStyle: {
      control: "object",
      description: "CSS properties on each page button",
    },
    ellipsisClassName: {
      control: "text",
      description: "Additional classes on each ellipsis",
    },
    ellipsisStyle: {
      control: "object",
      description: "CSS properties on each ellipsis",
    },
    infoClassName: {
      control: "text",
      description: "Additional classes on the compact position text",
    },
    infoStyle: {
      control: "object",
      description: "CSS properties on the compact position text",
    },
    pageSizeClassName: {
      control: "text",
      description: "Additional classes on the page-size select",
    },
    pageSizeStyle: {
      control: "object",
      description: "CSS properties on the page-size select",
    },
  },
};

export const Pagination: StoryObj<PaginationStoryArgs> = {
  args: {
    designSystem: "neus",
    page: 4,
    totalPages: 12,
    siblingCount: 1,
    variant: "pages",
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    labels: {},
    className: undefined,
    style: {},
    listClassName: undefined,
    listStyle: {},
    pageClassName: undefined,
    pageStyle: {},
    ellipsisClassName: undefined,
    ellipsisStyle: {},
    infoClassName: undefined,
    infoStyle: {},
    pageSizeClassName: undefined,
    pageSizeStyle: {},
  },
  render: function Render({
    designSystem,
    onChange,
    onPageSizeChange,
    ...args
  }) {
    const [, updateArgs] = useArgs<PaginationStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <PaginationComponent
          {...args}
          onChange={(page) => {
            updateArgs({ page });
            onChange?.(page);
          }}
          onPageSizeChange={(pageSize) => {
            updateArgs({ pageSize, page: 1 });
            onPageSizeChange?.(pageSize);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
