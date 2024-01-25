import App from "./App";
import type { Meta, StoryObj } from "@storybook/react";
import AppProvider from "./context/appContext";

const meta: Meta<typeof App> = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  args: {},
};
export default meta;

type Story = StoryObj<typeof App>;

export const Playground: Story = {
  args: {},
};
