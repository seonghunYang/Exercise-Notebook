import type { Meta, StoryObj } from "@storybook/react";

import View from "./view";
import { useRef } from "react";

const meta: Meta<typeof View> = {
  component: View,
};

export default meta;
type Story = StoryObj<typeof View>;

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLAnchorElement>(null);
    return (
      <View ref={ref} as="a" href="https:heelo">
        Link
      </View>
    );
  },
};
