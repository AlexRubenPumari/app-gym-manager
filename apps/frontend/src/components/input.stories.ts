import { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input.js"

const meta = {
  title: "components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#333" },
        light: { name: "Light", value: "#CCC" },
      },
    },
  },
  args: {
    placeholder: "Enter your name",
  }
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    placeholder: "Enter your name"
  }
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password"
  }
}

export const WithError: Story = {
  args: {
    label: "Name:",
    error: "This field is required."
  }
}

export const WithFocus: Story = {
  args: {
    value: "Jan Doe",
    autoFocus: true
  }
}

export const WithLabel: Story = {
  args: {
    label: "Name:"
  }
}