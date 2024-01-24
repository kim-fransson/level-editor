import { tiles } from "@/data/tiles";
import { Tiles } from "./Tiles";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tiles> = {
  component: Tiles,
  parameters: {},
  decorators: [],
  args: {},
};
export default meta;

type Story = StoryObj<typeof Tiles>;

export const Playground: Story = {
  args: {
    tiles,
  },
};
