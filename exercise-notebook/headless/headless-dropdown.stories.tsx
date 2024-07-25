import type { Meta, StoryObj } from "@storybook/react";

import { HeadlessDropdown } from "./headless-dropdown";

const meta: Meta<typeof HeadlessDropdown> = {
  component: HeadlessDropdown,
};

export default meta;
type Story = StoryObj<typeof HeadlessDropdown>;

const items = [
  {
    text: "text",
  },
  {
    text: "text",
  },
  {
    text: "text",
  },
  {
    text: "text",
  },
];

export const Default: Story = {
  render: () => {
    return (
      <HeadlessDropdown items={items}>
        <HeadlessDropdown.Trigger>Trigger</HeadlessDropdown.Trigger>
        <HeadlessDropdown.List>
          {items.map((item, index) => (
            <HeadlessDropdown.Option item={item} index={index} />
          ))}
        </HeadlessDropdown.List>
      </HeadlessDropdown>
    );
  },
};
