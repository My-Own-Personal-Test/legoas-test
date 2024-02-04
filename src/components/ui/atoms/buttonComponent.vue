<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/twMerge'

interface Props {
  elType: 'link' | 'btn'
  to?: string
  class: string | ''
}
const props = defineProps<Props>()
</script>

<template>
  <button
    v-if="!props.to"
    :class="cn('btn', props.class)"
  >
    <slot />
  </button>
  <RouterLink
    v-else
    :to="props.to"
    :class="cn('btn', props.class)"
  >
    <slot />
  </RouterLink>
</template>
