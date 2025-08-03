import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'כותרת הראשית',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Globe Assist',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Globe Assist',
    subtitle: 'AI Assistant for Global-e',
  },
}; 