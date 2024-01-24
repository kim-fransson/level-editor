import { Canvas } from "./Canvas";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Canvas> = {
  component: Canvas,
  parameters: {},
  decorators: [],
  args: {},
};
export default meta;

type Story = StoryObj<typeof Canvas>;

export const Playground: Story = {
  args: {
    activeTile: {
      id: 10,
      src: "/tiles/tile-10.svg",
    },
  },
};
