<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null,
  icon: string,
  placeholder: string,
  options: { key: string, value: string }[],
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', arg: string | null): void,
}>();

const inputClass = 'w-full rounded border-border py-3 px-12 border-[1px]';
const search = ref<string | null>(null);
const input = ref<null | HTMLInputElement>(null);
const container = ref<null | HTMLDivElement>(null);

const selectOption = (option: string | null) => {
  emit('update:modelValue', option);
  search.value = null;
};

const filteredOptions = computed(() => [
  { key: null, value: props.placeholder },
  ...props.options.filter(({ value }) => !search.value || value.toLowerCase().indexOf(search.value.toLowerCase()) !== -1)
]);

const selectedOption = computed(() => props.options.find(({ key }) => key === props.modelValue));

const highlightedOption = ref<string | null>(null);
watch(filteredOptions, () => {
  if (filteredOptions.value.length > 0) {
    const selectedFilteredOption = filteredOptions.value.find(({ key }) => key === props.modelValue);

    if (selectedFilteredOption) {
      highlightedOption.value = selectedFilteredOption.key;
    } else {
      highlightedOption.value = filteredOptions.value[0].key;
    }
  }
});

const highlightNext = (change: number) => {
  if (filteredOptions.value.length === 0) {
    return;
  }

  if (highlightedOption.value) {
    const currentIndex = filteredOptions.value.findIndex(({ key }) => key === highlightedOption.value);

    if (currentIndex + change >= 0 && currentIndex + change < filteredOptions.value.length) {
      highlightedOption.value = filteredOptions.value[currentIndex + change].key;
      return;
    }
  }

  if (change === -1) {
    highlightedOption.value = filteredOptions.value[filteredOptions.value.length - 1].key;
  } else if (change === 1) {
    highlightedOption.value = filteredOptions.value[0].key;
  }
};

const selectHighlightedOption = () => {
  if (highlightedOption.value) {
    selectOption(highlightedOption.value);
  }
};

const checkClickAway = (e: Event) => {
  if (e.target !== container.value && !container.value?.contains(<Node>e.target)) {
    search.value = null;
    window.removeEventListener('click', checkClickAway);
  }
};

const setSearching = () => {
  search.value = '';
  
  setTimeout(() => {
    window.addEventListener('click', checkClickAway);
    input.value?.focus();
  }, 0);
};

onUnmounted(() => window.removeEventListener('click', checkClickAway));
watch(search, () => {
  if (search.value === null) {
    window.removeEventListener('click', checkClickAway);
  }
});
</script>

<template>
  <div class="relative" :class="{ 'z-10': search !== null }" ref="container">
    <Icon class="absolute pointer-events-none text-2xl top-3 left-3" :name="props.icon" />
    <input 
      type="text" 
      v-model="search" 
      :placeholder="props.placeholder"
      :class="inputClass"
      v-if="search !== null"
      ref="input"
      @keyup.enter="selectHighlightedOption"
      @keyup.up="highlightNext(-1)"
      @keyup.down="highlightNext(1)"
    />
    <div :class="inputClass" class="whitespace-nowrap overflow-hidden truncate" @click="setSearching" v-else>{{ selectedOption?.value || placeholder }}</div>
    <Icon class="absolute pointer-events-none text-2xl top-3 right-3" :name="search === null ? 'mdi:chevron-down' : 'mdi:chevron-up'" />

    <div class="absolute top-full w-full bg-background border-[1px] border-border shadow-md max-h-80 overflow-auto" v-if="search !== null">
      <div 
        v-for="option in filteredOptions"
        @click="selectOption(option.key)"
        :class="{ 
          'bg-background-dark': highlightedOption === option.key, 
          'text-primary': props.modelValue === option.key && option.key !== null,
          'opacity-70': option.key === null,
        }"
        class="p-4 cursor-pointer hover:bg-background-dark"
        @mouseover="highlightedOption = option.key"
      >
        {{ option.value }}
      </div>
    </div>
  </div>
</template>