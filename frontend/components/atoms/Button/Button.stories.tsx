import type { Meta, StoryObj } from '@storybook/vue3';
import Button, { type TButtonProps } from './Button.vue';
import { Color as EColor, Size as ESize, Variant as EVariant } from '@/constants/enums/style-enum';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    size: ESize.M,
    color: EColor.Primary,
    variant: EVariant.Elevated,
  },
};

export default meta;

export const Size: StoryObj = {
  render: (args: TButtonProps) => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Button {...args} size={ESize.XS}>
        XSmall
      </Button>
      <Button {...args} size={ESize.S}>
        Small
      </Button>
      <Button {...args} size={ESize.M}>
        Medium (Default)
      </Button>
      <Button {...args} size={ESize.L}>
        Large
      </Button>
      <Button {...args} size={ESize.XL}>
        XLarge
      </Button>
    </div>
  ),
};

export const Color: StoryObj = {
  render: (args: TButtonProps) => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Button {...args} color={EColor.Primary}>
        Primary (Default)
      </Button>
      <Button {...args} color={EColor.Secondary}>
        Secondary
      </Button>
      <Button {...args} color={EColor.Success}>
        Success
      </Button>
      <Button {...args} color={EColor.Info}>
        Info
      </Button>
      <Button {...args} color={EColor.Warning}>
        Warning
      </Button>
      <Button {...args} color={EColor.Error}>
        Error
      </Button>
    </div>
  ),
};

export const Variant: StoryObj = {
  render: (args: TButtonProps) => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Button {...args} variant={EVariant.Elevated}>
        Elevated (Default)
      </Button>
      <Button {...args} variant={EVariant.Flat}>
        Flat
      </Button>
      <Button {...args} variant={EVariant.Text}>
        Text
      </Button>
      <Button {...args} variant={EVariant.Tonal}>
        Tonal
      </Button>
      <Button {...args} variant={EVariant.Outlined}>
        Outlined
      </Button>
      <Button {...args} variant={EVariant.Plain}>
        Plain
      </Button>
    </div>
  ),
};
