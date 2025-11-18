import { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button.js"
import { fn } from "storybook/test"

const meta = {
  title: "components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click me",
    onClick: fn(),
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
  }
}

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  }
}

export const SecondaryDisabled = {
  args: {
    variant: "secondary",
    disabled: true,
  },
}
