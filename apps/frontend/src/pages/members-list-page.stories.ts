import { Meta, StoryObj } from "@storybook/react-vite"
import { MembersListPage } from "./members-list-page.js"

const meta = {
  title: "Pages/Members List",
  component: MembersListPage,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof MembersListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}