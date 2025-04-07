<template>
  <div>
    <Table :columns="columns" :data="data" :pageSize="pageSize" />
  </div>
</template>

<script setup lang="ts">
  import { columns } from '@/columns/iframe-info';

  const data = ref([
    {
      key: 'test1',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test2',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test3',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test4',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test5',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test6',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test7',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
    {
      key: 'test8',
      url: 'https://test.com',
      description: 'desc',
      createdAt: '2021',
      updatedAt: '2021',
    },
  ]);

  const pageSize = 5;
</script>
