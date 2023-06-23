<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
  icon: string,
  placeholder: string,
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', arg: string): void,
}>();

const inputValue = ref(props.modelValue);
watch(inputValue, () => emit('update:modelValue', inputValue.value));
watch(props, () => inputValue.value = props.modelValue);
</script>

<template>
  <div class="relative">
    <Icon class="absolute pointer-events-none text-2xl top-3 left-3" :name="props.icon" />
    <input 
      type="text" 
      v-model="inputValue" 
      :placeholder="props.placeholder"
      class="w-full rounded border-border py-3 pr-3 pl-12 border-[1px]"
    />
  </div>
</template>