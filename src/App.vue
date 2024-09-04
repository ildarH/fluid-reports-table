<script setup lang="ts">
import DefaultLayout from '@/layout/DefaultLayout.vue'
</script>

<template>
  <header class="container mx-auto">
    <h1 class="text-2xl mx-auto py-5">Reports</h1>
  </header>

  <main>
    <DefaultLayout />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
