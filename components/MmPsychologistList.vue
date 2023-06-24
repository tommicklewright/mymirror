<script setup lang="ts">
import { Psychologist } from '~/stores/psychologist';

const props = defineProps<{
  psychologists: Psychologist[],
}>();

const emit = defineEmits<{
  (event: 'select', arg: Psychologist): void,
  (event: 'selectTime', arg: {
    psychologist: Psychologist,
    time: Date,
  }): void
}>();
</script>

<template>
  <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <MmPsychologistDetail
      v-for="psychologist in props.psychologists"
      :psychologist="psychologist"
      @select="emit('select', psychologist)"
      @select-time="(time) => emit('selectTime', { psychologist, time })"
    />
  </div>
</template>
