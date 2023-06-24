<script setup lang="ts">
import { Availability } from '~/composables/psychologistStore';

const date = useDate();

const props = defineProps<{
  date: Date,
  times: Availability[],
  showAllTimes?: boolean,
}>();

const emit = defineEmits<{
  (event: 'select'): void,
  (event: 'selectTime', arg: Date): void,
}>();

const areMoreToShow = computed(() => !props.showAllTimes && props.times.length > 6);
const visibleTimes = computed(() => areMoreToShow.value ? props.times.slice(0, 5) : props.times);
</script>

<template>
  <div class="text-center">
    <div class="mb-4 text-lg">
      Next sessions on {{ date.longDate(props.date) }}
    </div>
    <div class="grid gap-2 grid-cols-3">
      <MmButton 
        v-for="availability in visibleTimes" 
        :dark="!!availability.surcharge"
        @click="emit('selectTime', availability.date)"
      >
        <p>{{ useDate().timeOfDay(availability.date) }}</p>
        <p v-if="availability.surcharge">(+${{ availability.surcharge }})</p>
      </MmButton>
      <MmButton 
        v-if="areMoreToShow" 
        flat highlight 
        @click="emit('select')"
      >
        See more
      </MmButton>
    </div>
  </div>
</template>