import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showBackButton: {
      control: 'boolean',
      description: 'Main header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackButton: Story = {
  args: {
    showBackButton: true,
    onBackToHome: () => console.log('Back to home clicked'),
  },
}; 