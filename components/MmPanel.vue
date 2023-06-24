<script setup lang="ts">
const props = defineProps<{
  bordered?: boolean,
}>();
</script>

<template>
  <div
    class="pt-10 px-4 pb-4" 
    :class="{ 
      'border-[1px]': props.bordered !== false, 
      'border-border': props.bordered !== false,
    }"
  >
    <div>
      <slot></slot>
    </div>
    <div class="mt-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>