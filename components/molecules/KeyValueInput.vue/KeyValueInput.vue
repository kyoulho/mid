<template>
  <div class="key-value-input">
    <div v-for="(item, index) in localValue" :key="index" class="kv-row">
      <Input
        v-model="item.key"
        :placeholder="keyLabel"
        :label="`${keyLabel} ${index + 1}`"
        :size="size"
        :variant="variant"
        :disabled="disabled"
        :readonly="readonly"
        :hide-details="hideDetails"
      />
      <Input
        v-model="item.value"
        :placeholder="valueLabel"
        :label="`${valueLabel} ${index + 1}`"
        :size="size"
        :variant="variant"
        :disabled="disabled"
        :readonly="readonly"
        :hide-details="hideDetails"
      />
      <Button
        v-if="!readonly"
        :size="Size.S"
        :variant="Variant.Text"
        :useOnlyIcon="'mdi-close'"
        :disabled="disabled"
        @click="removeRow(index)"
      />
    </div>
    <Button
      v-if="!readonly"
      :size="Size.S"
      :variant="Variant.Outlined"
      :disabled="disabled"
      @click="addRow"
    >
      추가
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Button from '@/components/atoms/Button/Button.vue';
  import Input, { type TInputProps } from '@/components/atoms/Input/Input.vue';
  import { FormSize, FormVariant, Size, Variant } from '@/constants/enums/style-enum';

  export type TKeyValueInputProps = Omit<
    TInputProps,
    'modelValue' | 'placeholder' | 'label' | 'prefix' | 'suffix'
  > & {
    modelValue: Record<string, string>;
    keyLabel?: string;
    valueLabel?: string;
  };

  type TKeyValue = { key: string; value: string };

  const {
    modelValue,
    size = FormSize.Compact,
    variant = FormVariant.Outlined,
    disabled = false,
    readonly = false,
    hideDetails = true,
    keyLabel = 'Key',
    valueLabel = 'Value',
  } = defineProps<TKeyValueInputProps>();

  const emit = defineEmits<{
    'update:modelValue': [Record<string, string>];
  }>();

  const localValue = ref<TKeyValue[]>(
    Object.entries(modelValue).map(([key, value]) => ({ key, value })),
  );

  // localValue가 변경될 때마다 부모 컴포넌트에 업데이트된 값을 전달합니다.
  // 빈 키는 무시되고, 키가 있는 항목만 결과 객체에 포함됩니다.
  watch(
    () => localValue.value,
    (val) => {
      const record: Record<string, string> = {};
      val.forEach(({ key, value }) => {
        // 빈 키는 무시하고, 키가 있는 항목만 결과 객체에 포함시킵니다.
        if (key) record[key] = value;
      });
      emit('update:modelValue', record);
    },
    { deep: true }, // 깊은 감시를 통해 중첩된 객체의 변경도 감지합니다.
  );

  const addRow = () => {
    localValue.value.push({ key: '', value: '' });
  };

  const removeRow = (index: number) => {
    localValue.value.splice(index, 1);
  };
</script>

<style scoped lang="scss">
  .key-value-input {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .kv-row {
      display: flex;
      gap: 12px;
    }
  }
</style>
