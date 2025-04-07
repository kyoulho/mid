<template>
  <nav v-show="totalCount > 0" class="pagination">
    <ul class="pagination__list">
      <li class="pagination__first">
        <Button
          :variant="Variant.Text"
          useOnlyIcon="mdi-chevron-double-left"
          @click="handleClickFirst"
        />
      </li>
      <li class="pagination__prev">
        <Button :variant="Variant.Text" useOnlyIcon="mdi-chevron-left" @click="handleClickPrev" />
      </li>
      <li v-for="page in visiblePages" :key="page" class="pagination__item">
        <Button
          :variant="currentPage === page ? Variant.Flat : Variant.Text"
          @click="changePage(page)"
        >
          {{ page }}
        </Button>
      </li>
      <li class="pagination__next">
        <Button :variant="Variant.Text" useOnlyIcon="mdi-chevron-right" @click="handleClickNext" />
      </li>
      <li class="pagination__last">
        <Button
          :variant="Variant.Text"
          useOnlyIcon="mdi-chevron-double-right"
          @click="handleClickLast"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { Variant } from '@/constants/enums/style-enum';
  import { computed } from 'vue';

  export type TPaginationProps = {
    currentPage: number;
    totalCount: number;
    pageSize: number;
  };

  const { currentPage, totalCount, pageSize } = defineProps<TPaginationProps>();

  const emit = defineEmits<{
    'update:currentPage': [number];
  }>();

  const lastPage = computed(() => Math.ceil(totalCount / pageSize));

  const visiblePages = computed(() => {
    if (totalCount <= 0 || pageSize <= 0) return [];

    const groupSize = 10; // 그룹당 페이지 수
    const last = lastPage.value;

    const start = Math.floor((currentPage - 1) / groupSize) * groupSize;
    const end = Math.min(start + groupSize, last);

    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  });

  const handleClickPrev = () => {
    if (currentPage === 1) return;

    changePage(currentPage - 1);
  };

  const handleClickNext = () => {
    if (currentPage === lastPage.value) return;

    changePage(currentPage + 1);
  };

  const handleClickFirst = () => {
    if (currentPage === 1) return;

    changePage(1);
  };

  const handleClickLast = () => {
    if (currentPage === lastPage.value) return;

    changePage(lastPage.value);
  };

  const changePage = (page: number) => {
    emit('update:currentPage', page);
  };
</script>

<style lang="scss" scoped>
  @use './Pagination.scss' as *;
</style>
