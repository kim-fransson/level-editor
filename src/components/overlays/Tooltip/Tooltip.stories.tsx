import { Button, TooltipTrigger } from "react-aria-components";
import { Tooltip } from "./Tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  args: {},
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {},
  render: () => (
    <TooltipTrigger>
      <Button>💾</Button>
      <Tooltip>Save</Tooltip>
    </TooltipTrigger>
  ),
};
