import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./counter";

const meta: Meta<typeof Counter> = {
  component: Counter,
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  render: () => {
    return (
      <Counter>
        <Counter.Button countType={"increment"} />
        <Counter.Input />
        <Counter.Button countType={"decrement"} />
      </Counter>
    );
  },
};

export const Only: Story = {
  render: () => {
    return <Counter.Button countType={"increment"} />;
  },
};
