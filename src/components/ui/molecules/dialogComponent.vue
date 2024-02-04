<script setup lang="ts">
import { cn } from '@/lib/twMerge'

interface Props {
  id: string | 'modal-1'
  size: string
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <Teleport to="body">
    <dialog
      :id="`${props.id}-dialog`"
      class="modal"
    >
      <div :class="cn('modal-box', props.size, props.class)">
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>
