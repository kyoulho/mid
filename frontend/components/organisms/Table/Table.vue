<template>
  <div class="table-wrap">
    <AgGridVue
      :locale-text="AG_GRID_LOCALE_KR"
      :row-data="data"
      :column-defs="columnDefs"
      :default-col-def="defaultColDef"
      :grid-options="gridOptions"
      :row-selection="rowSelection"
      :pagination="usePagination"
      :pagination-page-size="currentPageSize"
      :paginationPageSizeSelector="pageSizeList"
      :dom-layout="'autoHeight'"
      @grid-ready="onGridReady"
      @pagination-changed="onPaginationChanged"
    />
  </div>
</template>

<script setup lang="ts" generic="T">
  import { AgGridVue } from 'ag-grid-vue3';
  import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';

  import type {
    ColDef,
    ColGroupDef,
    GridOptions,
    GridApi,
    GridReadyEvent,
    PaginationChangedEvent,
  } from 'ag-grid-community';
  import _ from 'lodash';
  import { useRoute } from 'vue-router';

  export type TTableProps<T> = {
    data: T[] | null;
    columns: (ColDef<T> | ColGroupDef<T>)[];
    rowSelection?: 'single' | 'multiple' | undefined;
    gridOptions?: GridOptions<T>;
    sortable?: boolean;
    resizable?: boolean;
    filter?: boolean;
    usePagination?: boolean;
    pageSize?: number;
  };

  const {
    data,
    columns,
    rowSelection = undefined,
    gridOptions,
    sortable = true,
    resizable = true,
    filter = true,
    usePagination = true,
    pageSize = 10,
  } = defineProps<TTableProps<T>>();

  const route = useRoute();
  const gridApi = shallowRef<GridApi<T> | null>(null);

  const currentPage = ref(Number(route.query?.page) || 1);
  const currentPageSize = ref(Number(route.query?.pageSize) || pageSize);

  const defaultColDef = {
    sortable,
    filter,
    resizable,
    flex: 1,
  };
  const pageSizeList = [5, 10, 20, 50, 100];

  const columnDefs = computed(() => {
    if (!resizable) return columns;

    const newColumns = _.cloneDeep(columns);
    const last = newColumns.length - 1;
    (newColumns[last] as ColDef<T>).resizable = false;

    return newColumns;
  });

  const onGridReady = (event: GridReadyEvent) => {
    gridApi.value = event.api;

    gridApi.value.paginationGoToPage(currentPage.value - 1);
  };

  // Ag-Grid 페이지 변경 시 쿼리 파라미터 변경
  const onPaginationChanged = (event: PaginationChangedEvent<T>) => {
    const api = event.api;

    if (!api) return;

    const newPage = api.paginationGetCurrentPage() + 1;
    const newPageSize = api.paginationGetPageSize();

    navigateTo(
      {
        query: {
          ...route.query,
          page: newPage.toString(),
          pageSize: newPageSize.toString(),
        },
      },
      { replace: true },
    );
  };
</script>

<style scoped lang="scss">
  @use './Table.scss';
</style>
