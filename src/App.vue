<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div
    v-if="route.name === 'dpu-page'"
    class="pl-4 pt-4 text-sm breadcrumbs"
  >
    <ul>
      <li>
        <RouterLink to="/">
          Home
        </RouterLink>
      </li>
      <li>Daftar Piutang Unit</li>
    </ul>
  </div>
  <RouterView />
</template>
