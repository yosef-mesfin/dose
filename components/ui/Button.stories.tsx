import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { FaPlus } from 'react-icons/fa';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      description: 'Button variant',
      options: ['solid', 'outline', 'ghost', 'icon'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    iconPosition: {
      control: 'select',
      options: ['before', 'after'],
    },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    className: { control: 'text', description: 'Additional classes' },
    children: {
      control: 'text',
      description: 'Content to be displayed inside the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    label: 'Solid',
    variant: 'solid',
    size: 'default',
    onClick: action('default clicked'),
    className: 'px-4 py-2',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: 'outline',
    size: 'default',
    onClick: action('Outline clicked'),
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    variant: 'ghost',
    size: 'default',
    onClick: action('Ghost clicked'),
  },
};

export const WithIconBefore: Story = {
  args: {
    label: 'Button',
    variant: 'solid',
    icon: <FaPlus />,
    iconPosition: 'before',
    size: 'default',
  },
};

export const WithIconAfter: Story = {
  args: {
    label: 'Button',
    variant: 'solid',
    icon: <FaPlus />,
    iconPosition: 'after',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'solid',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'solid',
    size: 'lg',
  },
};

export const IconButton: Story = {
  args: {
    icon: <FaPlus />,
    variant: 'icon',
    size: 'icon',
  },
};
