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

// const reducer =

export const Control: Story = {
  render: () => {
    return (
      <Counter
        reducer={(state, action, next) => {
          switch (action.type) {
            case "INCREMENT":
              return state + 2;
            default:
              return next(state, action);
          }
        }}
      >
        <Counter.Button countType={"increment"} />
        <Counter.Input />
        <Counter.Button countType={"decrement"} />
      </Counter>
    );
  },
};
