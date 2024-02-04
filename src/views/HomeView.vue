<script lang="ts" setup>
import buttonComponent from '@/components/ui/atoms/buttonComponent.vue'
</script>

<template>
  <div class="flex flex-col text-center justify-center gap-y-8 min-h-svh">
    <h1 class="text-lg">
      Welcome to dashboard!
    </h1>

    <buttonComponent
      el-type="btn"
      class="btn-primary w-fit mx-auto"
      to="/daftar-piutang-unit"
    >
      <span>click here to see all data</span>
    </buttonComponent>
  </div>
</template>
