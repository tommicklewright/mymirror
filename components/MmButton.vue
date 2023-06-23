<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void,
}>();

const props = defineProps<{
  disabled?: boolean,
  icon?: string,
  flat?: boolean,
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};

const cssClass = computed(() => ({
  ...(props.disabled ? {} : {
    'bg-primary': !props.flat,
    'hover:bg-primary-dark': !props.flat,
    'hover:text-primary': props.flat,
    'text-secondary': props.flat,
  }),
  'bg-secondary': props.disabled,
  'cursor-default': props.disabled,
  'pl-[48px]': props.icon,
}));
</script>

<template>
  <button 
    @click="handleClick"
    :class="cssClass"
    class="
      text-background text-base leading-4
      relative
      py-[17px] px-[24px]
      rounded-[10px]
    "
  >
    <Icon class="absolute pointer-events-none text-2xl top-3 left-3" v-if="props.icon" :name="props.icon" />
    <slot></slot>
  </button>
</template>