<script setup lang="ts">
import { Psychologist } from '~/composables/psychologistStore';

const date = useDate();

const props = defineProps<{
  psychologists: Psychologist[],
  date: Date,
}>();

const psychologistStore = usePsychologistStore();
</script>

<template>
  <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <MmPanel 
      class="break-inside-avoid"
      v-for="psychologist in props.psychologists"
    >
      <div class="text-center">
        <div class="relative mb-6 rounded-full bg-gray-500 w-36 h-36 mx-auto psychologist-icon bg-cover bg-center" :style="{ backgroundImage: `url('${psychologist.image}')` }">
          <Icon class="absolute -right-2 -bottom-2 text-5xl" name="ic:baseline-play-circle" />
        </div>

        <h1 class="text-2xl mb-2">{{ psychologist.name }}</h1>
        <h4 class="text-lg text-primary mb-4">{{ psychologistStore.typeMap[psychologist.type] }}</h4>
        <p>{{ psychologist.description }}</p>
      </div>

      <template #footer>
        <div class="text-center">
          <div class="mb-4 text-lg">
            Next sessions on {{ date.longDate(props.date) }}
          </div>
          <div class="columns-3 gap-2">
            <MmButton class="w-full mb-2">Click</MmButton>
            <MmButton class="w-full mb-2" :disabled="true">Click</MmButton>
          </div>
        </div>
      </template>
    </MmPanel>
  </div>
</template>
