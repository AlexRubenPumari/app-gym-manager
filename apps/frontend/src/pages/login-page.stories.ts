import { Meta, StoryObj } from "@storybook/react-vite"
import { LoginPage } from "./login-page.js"

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof LoginPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}