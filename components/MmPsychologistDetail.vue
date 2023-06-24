<script setup lang="ts">
import { Psychologist } from '~/stores/psychologist';

const props = defineProps<{
  psychologist: Psychologist,
  expanded?: boolean,
}>();

const emit = defineEmits<{
  (event: 'select'): void,
  (event: 'selectTime', arg: Date): void,
}>();

const psychologistStore = usePsychologistStore();
const date = useDate();

const firstAvailableDate = (psychologist: Psychologist) => {
  return psychologist.availability.length === 0 ? new Date() : psychologist.availability[0].date;
};

const availabilityForDate = (psychologist: Psychologist, dateToCheck: Date) => {
  return psychologist.availability.filter((availableDate) => date.isSameDay(dateToCheck, availableDate.date));
};
</script>

<template>
  <MmPanel 
    class="break-inside-avoid"
    :bordered="!expanded"
  >
    <div class="text-center">
      <div 
        class="relative mb-6 rounded-full bg-gray-500 w-36 h-36 mx-auto psychologist-icon bg-cover bg-center" 
        :style="{ backgroundImage: `url('${props.psychologist.image}')` }"
      >
        <Icon class="absolute -right-2 -bottom-2 text-5xl" name="ic:baseline-play-circle" />
      </div>

      <h1 class="text-2xl mb-2">{{ props.psychologist.name }}</h1>
      <h4 class="text-lg text-primary mb-4">{{ psychologistStore.typeMap[props.psychologist.type] }}</h4>
      <div class="h-20 text-ellipsis relative">
        <p 
          class="
            h-full overflow-hidden transition-[height]
            relative hover:z-10 
            bg-background
          "
          :class="{
            'h-full': !props.expanded,
            'h-auto': props.expanded,
            'hover:h-44': !props.expanded,
            'hover:shadow-md': !props.expanded,
          }"
        >
          {{ props.psychologist.description }}
        </p>
        <div 
          class="
            absolute bottom-0 left-0
            w-full h-2 
            bg-gradient-to-t from-background 
            pointer-events-none
          "
        ></div>
      </div>
    </div>

    <template #footer>
      <MmPsychologistAvailableTimes
        :date="firstAvailableDate(props.psychologist)"
        :times="availabilityForDate(props.psychologist, firstAvailableDate(props.psychologist))"
        @select="emit('select')"
        @select-time="(time) => emit('selectTime', time)"
        :show-all-times="props.expanded"
      />
    </template>
  </MmPanel>
</template>