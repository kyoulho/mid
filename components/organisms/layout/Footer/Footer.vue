<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__logo">
        <span class="hidden">여수시 로고</span>
      </div>
      <div class="footer__info">
        <ul class="footer__link-list">
          <li v-for="(item, index) in footerLinks" :key="index" class="footer__link-item">
            <a :href="item.link">{{ item.text }}</a>
          </li>
        </ul>
        <address class="footer__address">
          <p>
            <span>(59675) 전라남도 여수시 시청로 (학동)</span>
            <span>여수시청 대표전화 061-659-3023 (팩스: 061-659-5803)</span>
          </p>
        </address>
        <p class="footer__copyright">COPYRIGHT BY YEOSU-CITY. ALL RIGHT RESERVED</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const footerLinks = [
    { text: '저작권 정책', link: '/' },
    { text: '찾아오시는 길', link: '/' },
    { text: '청사안내', link: '/' },
  ];
</script>

<style lang="scss" scoped>
  @use './Footer.scss';
</style>
