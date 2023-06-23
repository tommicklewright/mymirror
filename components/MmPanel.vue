<script setup lang="ts">
</script>

<template>
  <div class="border-[1px] border-border pt-10 px-4 pb-4">
    <div>
      <slot></slot>
    </div>
    <div class="mt-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>