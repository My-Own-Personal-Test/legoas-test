<script lang="ts" setup>
import buttonComponent from '@/components/ui/molecules/buttonComponent.vue'

// import { render } from '@/components/ui/molecules/buttonComponent'
</script>

<template>
  <div class="grid place-items-center min-h-svh">
    <!-- <render /> -->
    <buttonComponent
      el-type="btn"
      to="/about"
      class="btn-primary"
    >
      test
    </buttonComponent>
  </div>
</template>
