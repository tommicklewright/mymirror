<script setup lang="ts">
import { Gender, PsychologistType, Specialty } from '~/composables/psychologistStore';

const today = new Date();
const date = useDate();

const name = ref('');
const gender = ref<Gender | null>(null);
const type = ref<PsychologistType | null>(null);
const specialty = ref<Specialty | null>(null);
const language = ref<string | null>(null);

const resetFilters = () => {
  name.value = '';
  gender.value = null;
  type.value = null;
  specialty.value = null;
  language.value = null;
};

const filtersChanged = computed(() => name.value !== '' || gender.value || type.value || specialty.value || language.value);

const psychologistStore = usePsychologistStore();
onMounted(psychologistStore.fetchPsychologists);

const types = computed(() => psychologistStore.types.map((type) => ({
  key: type,
  value: psychologistStore.typeMap[type]
})));

const filteredPsychologists = computed(() => psychologistStore.filteredPsychologists({
  name: name.value,
  gender: gender.value,
  specialty: specialty.value,
  type: type.value,
  language: language.value,
}));

const psychologistsAvailableToday = computed(() => filteredPsychologists.value.filter(({ availability }) => 
  availability.find((dateAvailable) => date.isSameDay(dateAvailable, today))
));

const psychologistsAvailableAnotherDay = computed(() => filteredPsychologists.value.filter(({ availability }) => 
  !availability.find((dateAvailable) => date.isSameDay(dateAvailable, today)) &&
    availability.find((dateAvailable) => date.isAfter(dateAvailable, today))
));
</script>

<template>
  <div>
    <MmContainer>
      <p class="text-3xl mb-6">Psychologists available ({{ filteredPsychologists.length }})</p>
      <div class="grid gap-4 grid-cols-3 xl:grid-cols-6 mb-12">
        <MmSelect v-model="type" icon="mdi:account-multiple-outline" placeholder="Type" :options="types" />
        <MmSelect v-model="specialty" icon="mdi:account-check-outline" placeholder="Specialty" :options="psychologistStore.specialties.map((spec) => ({ key: spec, value: spec }))" />
        <MmSelect v-model="gender" icon="mdi:human-male-female" placeholder="Gender" :options="psychologistStore.genders.map((spec) => ({ key: spec, value: spec }))" />
        <MmSelect v-model="language" icon="iconoir:graduation-cap" placeholder="Language" :options="psychologistStore.languages.map((spec) => ({ key: spec, value: spec }))" />
        <MmInput v-model="name" icon="mdi:magnify" placeholder="Name" />
        <MmButton @click="resetFilters" icon="ic:baseline-clear" flat v-if="filtersChanged">
          Clear
        </MmButton>
      </div>
      <template v-if="psychologistStore.psychologists">
        <MmPsychologistList v-if="psychologistsAvailableToday.length > 0" :date="today" :psychologists="psychologistsAvailableToday" />
        <p v-else class="text-secondary-light">No psychologists matching your search are available{{ psychologistsAvailableAnotherDay.length === 0 ? '' : ' today' }}.</p>

        <template v-if="psychologistsAvailableAnotherDay.length > 0">
          <h3 class="mt-16 mb-8 text-2xl">More psychologists available at a different date/time</h3>
          <MmPsychologistList :date="today" :psychologists="psychologistsAvailableAnotherDay" />
        </template>
      </template>
      <template v-else>
        Loading...
      </template>
    </MmContainer>
  </div>
</template>