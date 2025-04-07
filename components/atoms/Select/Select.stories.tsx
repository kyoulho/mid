import type { Meta, StoryObj } from '@storybook/vue3';
import Select, { type TSelectProps } from './Select.vue';
import { FormSize, FormVariant } from '@/constants/enums/style-enum';

const meta: Meta<TSelectProps> = {
  title: 'Components/Select',
  component: Select,
  args: {
    modelValue: null,
    items: [
      {
        title: 'first',
        value: 'first',
      },
      {
        title: 'second',
        value: 'second',
      },
      {
        title: 'disabled',
        value: 'disabled',
        disabled: true,
      },
      {
        title: 'title',
        value: 'sub-title',
        subtitle: 'sub title',
      },
    ],
  },
};

export default meta;

export const Default: StoryObj<TSelectProps> = {
  render: (args: TSelectProps) => (
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
        <Select {...args} placeholder="Default" style={{ width: '350px' }} />
        <Select {...args} modelValue="first" style={{ width: '350px' }} />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Select {...args} placeholder="Disabled" style={{ width: '350px' }} disabled />
        <Select {...args} placeholder="Read Only" style={{ width: '350px' }} readonly />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Select {...args} placeholder="Menu Open" style={{ width: '350px' }} menu />
        <Select {...args} placeholder="Multiple" style={{ width: '350px' }} multiple menu />
        <Select
          {...args}
          modelValue={['first', 'second']}
          style={{ width: '350px' }}
          multiple
          menu
        />
      </div>
    </div>
  ),
};

export const Size: StoryObj<TSelectProps> = {
  render: (args: TSelectProps) => (
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
        <Select
          {...args}
          placeholder="Compact"
          size={FormSize.Compact}
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
        <Select
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
        <Select
          {...args}
          placeholder="Default (Default)"
          size={FormSize.Default}
          style={{ width: '350px' }}
        />
      </div>
    </div>
  ),
};

export const Variant: StoryObj<TSelectProps> = {
  render: (args: TSelectProps) => (
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
        <Select
          {...args}
          placeholder="Regular"
          variant={FormVariant.Regular}
          style={{ width: '350px' }}
        />
        <Select
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
        <Select
          {...args}
          placeholder="Underlined"
          variant={FormVariant.Underlined}
          style={{ width: '350px' }}
        />
        <Select
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
        <Select
          {...args}
          placeholder="Filled"
          variant={FormVariant.Filled}
          style={{ width: '350px' }}
        />
        <Select
          {...args}
          placeholder="Solo"
          variant={FormVariant.Solo}
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
        <Select
          {...args}
          placeholder="Solo Invert"
          variant={FormVariant.SoloInvert}
          style={{ width: '350px' }}
        />
        <Select
          {...args}
          placeholder="Solo Filled"
          variant={FormVariant.SoloFilled}
          style={{ width: '350px' }}
        />
      </div>
    </div>
  ),
};
