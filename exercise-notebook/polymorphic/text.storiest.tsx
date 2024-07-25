import type { Meta, StoryObj } from "@storybook/react";

import { useRef } from "react";
import Text from "./text";

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLAnchorElement>(null);
    return (
      <Text ref={ref} as='a'>
        ??
      </Text>
    );
  },
};
