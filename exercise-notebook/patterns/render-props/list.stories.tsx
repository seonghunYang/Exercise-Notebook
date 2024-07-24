import type { Meta, StoryObj } from "@storybook/react";

import List from "./list";

const meta: Meta<typeof List> = {
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

const mockData = [
  {
    id: 1,
    content: "hello",
  },
  {
    id: 2,
    content: "hello",
  },
  {
    id: 3,
    content: "hello",
  },
];

export const Default: Story = {
  render: () => {
    return (
      <List
        data={mockData}
        render={(data) => (
          <div>
            {data.id}: {data.content}
          </div>
        )}
      ></List>
    );
  },
};
