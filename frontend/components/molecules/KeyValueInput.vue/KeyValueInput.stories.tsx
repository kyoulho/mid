import type { Meta, StoryObj } from '@storybook/vue3';
import KeyValueInput from './KeyValueInput.vue';
import type { TKeyValueInputProps } from './KeyValueInput.vue';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const meta: Meta<typeof KeyValueInput> = {
  title: 'molecules/KeyValueInput',
  component: KeyValueInput,
  args: {
    modelValue: {
      version: '1.0.0',
      author: 'Mobigen',
    },
  },
};

export default meta;

export const empty: StoryObj<typeof KeyValueInput> = {
  render: () => <KeyValueInput modelValue={{}} />,
};

export const hasValue: StoryObj<typeof KeyValueInput> = {
  render: (args: TKeyValueInputProps) => <KeyValueInput {...args} />,
};

export const disabled: StoryObj<typeof KeyValueInput> = {
  render: (args: TKeyValueInputProps) => <KeyValueInput {...args} disabled />,
};

export const readonly: StoryObj<typeof KeyValueInput> = {
  render: (args: TKeyValueInputProps) => <KeyValueInput {...args} readonly />,
};

export const label: StoryObj<typeof KeyValueInput> = {
  render: (args: TKeyValueInputProps) => <KeyValueInput {...args} keyLabel="키" valueLabel="값" />,
};