<template>
  <div>
    <div>메인 화면</div>
    <Button @click="handleClick">버튼</Button>
  </div>
</template>

<script setup lang="ts">
  const handleClick = async () => {
    const data = await useSpringApi({
      url: '/api/menu/tree',
      method: 'GET',
      query: {
        service: 'PUBLIC',
      },
    });

    console.log(data);
  };
</script>

<style lang="scss" scoped></style>
