import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'סגנון הכפתור',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'גודל הכפתור',
    },
    disabled: {
      control: 'boolean',
      description: 'האם הכפתור מושבת',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'כפתור ראשי',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'כפתור משני',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'כפתור עם מסגרת',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'כפתור הרס',
    variant: 'destructive',
  },
};

export const Small: Story = {
  args: {
    children: 'כפתור קטן',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'כפתור גדול',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'כפתור מושבת',
    disabled: true,
  },
}; 