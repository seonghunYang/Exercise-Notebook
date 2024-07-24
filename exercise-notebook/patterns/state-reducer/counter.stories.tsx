import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./counter";

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
  args: {
    defaultValue: 10,
    reducer: (state, action, next) => {
      switch (action.type) {
        case "INCREMENT":
          return state + 2;
        default:
          return next(state, action);
      }
    },
  },
};

export const Blank: Story = {};
