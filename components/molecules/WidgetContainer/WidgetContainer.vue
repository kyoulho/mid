<template>
  <article class="widget-container">
    <div v-if="title" class="widget__header">
      <span class="widget__header__title">{{ title }}</span>
      <span v-if="!useFooter" class="widget__header__standard">{{ currentDate }} 기준</span>
    </div>
    <div class="widget__body">
      <a href="#" class="widget-wrap" @click="handleClick">
        <slot></slot>
      </a>
    </div>
    <div v-if="useFooter" class="widget__footer">
      <span>
        {{ currentDate }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';

  export type TWidgetContainerProps = {
    title: string;
    useFooter?: boolean;
  };

  const { useFooter = false } = defineProps<TWidgetContainerProps>();

  const currentDate = dayjs().format('YYYY년 MM월 DD일');

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  };
</script>

<style lang="scss" scoped>
  @use './WidgetContainer.scss';
</style>
