import type { Meta, StoryObj } from '@storybook/vue3';
import Input, { type TInputProps } from './Input.vue';
import { FormSize, FormVariant } from '@/constants/enums/style-enum';

const meta: Meta<TInputProps> = {
  title: 'Components/Input',
  component: Input,
  args: {
    modelValue: '',
  },
};

export default meta;

export const Size: StoryObj<TInputProps> = {
  render: (args: TInputProps) => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        fontWeight: 700,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input {...args} placeholder="Compact" size={FormSize.Compact} style={{ width: '350px' }} />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Comfortable"
          size={FormSize.Comfortable}
          style={{ width: '350px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Default (Default)"
          size={FormSize.Default}
          style={{ width: '350px' }}
        />
      </div>
    </div>
  ),
};

export const Variant: StoryObj<TInputProps> = {
  render: (args: TInputProps) => (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Regular"
          variant={FormVariant.Regular}
          style={{ width: '350px' }}
        />
        <Input
          {...args}
          placeholder="Plain"
          variant={FormVariant.Plain}
          style={{ width: '350px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Underlined"
          variant={FormVariant.Underlined}
          style={{ width: '350px' }}
        />
        <Input
          {...args}
          placeholder="Outlined (Default)"
          variant={FormVariant.Outlined}
          style={{ width: '350px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Filled"
          variant={FormVariant.Filled}
          style={{ width: '350px' }}
        />
        <Input {...args} placeholder="Solo" variant={FormVariant.Solo} style={{ width: '350px' }} />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Input
          {...args}
          placeholder="Solo Invert"
          variant={FormVariant.SoloInvert}
          style={{ width: '350px' }}
        />
        <Input
          {...args}
          placeholder="Solo Filled"
          variant={FormVariant.SoloFilled}
          style={{ width: '350px' }}
        />
      </div>
    </div>
  ),
};
