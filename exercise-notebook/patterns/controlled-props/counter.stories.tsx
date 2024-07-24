import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./counter";
import { useState } from "react";

const meta: Meta<typeof Counter> = {
  component: Counter,
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const UnControll: Story = {
  args: {
    defaultValue: 10,
  },
};

export const Controll: Story = {
  render: () => {
    const [count, setCount] = useState(5);

    return (
      <Counter value={count} onChange={(newValue) => setCount(newValue)} />
    );
  },
};

export const Blank: Story = {};
