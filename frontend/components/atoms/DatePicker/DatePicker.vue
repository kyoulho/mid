<template>
  <div class="date-picker">
    <DatePicker
      v-model="date"
      :range="range"
      :locale="locale"
      :multi-calendars="range"
      :disabled="disabled"
      :readonly="readonly"
      :enable-time-picker="useTimePicker"
      :time-picker-inline="useTimePickerInline"
      :action-row="{ showNow: useToday }"
      :cancelText="customLocale.cancel"
      :selectText="customLocale.select"
      :now-button-label="customLocale.today"
      :format="format"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import DatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  // eslint-disable-next-line vue/no-dupe-keys
  const date = ref();

  const props = defineProps({
    date: {
      type: String,
    },
    locale: {
      type: String,
      default: 'ko',
    }, // 텍스트 한글
    customLocale: {
      type: Object,
      default: () => {
        return {
          cancel: '취소',
          select: '선택',
          today: '오늘',
        };
      },
    }, // Action Button text 변경
    useToday: {
      type: Boolean,
      default: false,
    }, //오늘을 버튼으로 나오게 하려면 true
    id: {
      type: String,
      default: 'datePicker',
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    type: {
      type: String,
      default: 'date',
    },
    range: {
      type: Boolean,
      default: false,
    },
    confirm: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    useTimePicker: {
      type: Boolean,
      default: false,
    }, //시간 버튼
    useTimePickerInline: {
      type: Boolean,
      default: false,
    }, //시간 텍스트
  });
</script>
<style lang="scss" scoped>
  // 주석 포함 내용이 없을 경우 스타일을 로드하지 못함(vite 에러로 추정됨.)
</style>
