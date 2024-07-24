import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./counter";
import { useState } from "react";
import { useCounter } from "./use-counter";

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
    const { count, setCount, ...Callback } = useCounter({
      defaultValue: 20,
    });

    const handleIncrement = () => {
      setCount((prev) => (prev ? prev + 2 : 1));
    };

    return (
      <Counter value={count} {...Callback} onIncrement={handleIncrement} />
    );
  },
};

export const Blank: Story = {};
