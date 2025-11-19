import { Meta, StoryObj } from "@storybook/react-vite"
import { Table } from "./table.js"

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    columns: [
      { key: "id", label: "Id" },
      { key: "name", label: "Name" },
      { key: "age", label: "Age" },
      { key: "city", label: "City" },
    ],
  }
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithData: Story = {
  args: {
    data: [
      { id: 1, name: "Juan", age: 28, city: "Madrid" },
      { id: 2, name: "Ana", age: 24, city: "Barcelona" },
      { id: 3, name: "Luis", age: 32, city: "Sevilla" },
    ]
  }
}