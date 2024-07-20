import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSizes, ButtonVariants, IconPosition } from '@/types/button';
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
      options: [
        ButtonVariants.SOLID,
        ButtonVariants.OUTLINE,
        ButtonVariants.GHOST,
        ButtonVariants.ICON,
      ],
    },
    size: {
      control: 'select',
      options: [
        ButtonSizes.DEFAULT,
        ButtonSizes.SMALL,
        ButtonSizes.LARGE,
        ButtonSizes.ICON,
      ],
    },
    iconPosition: {
      control: 'select',
      options: [IconPosition.BEFORE, IconPosition.AFTER],
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
    variant: ButtonVariants.SOLID,
    size: ButtonSizes.DEFAULT,
    onClick: action('default clicked'),
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: ButtonVariants.OUTLINE,
    size: ButtonSizes.DEFAULT,
    onClick: action('Outline clicked'),
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    variant: ButtonVariants.GHOST,
    size: ButtonSizes.DEFAULT,
    onClick: action('Ghost clicked'),
  },
};

export const WithIconBefore: Story = {
  args: {
    label: 'Button',
    variant: ButtonVariants.SOLID,
    icon: <FaPlus />,
    iconPosition: IconPosition.BEFORE,
    size: ButtonSizes.DEFAULT,
  },
};

export const WithIconAfter: Story = {
  args: {
    label: 'Button',
    variant: ButtonVariants.SOLID,
    icon: <FaPlus />,
    iconPosition: IconPosition.AFTER,
    size: ButtonSizes.DEFAULT,
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    variant: ButtonVariants.SOLID,
    size: ButtonSizes.SMALL,
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: ButtonVariants.SOLID,
    size: ButtonSizes.LARGE,
  },
};

export const IconButton: Story = {
  args: {
    icon: <FaPlus />,
    variant: ButtonVariants.ICON,
    size: ButtonSizes.ICON,
  },
};
