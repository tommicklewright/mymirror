<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void,
}>();

const props = defineProps<{
  disabled?: boolean,
  icon?: string,
  flat?: boolean,
  highlight?: boolean,
  dark?: boolean,
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};

const cssClass = computed(() => ({
  ...(props.disabled ? {} : {
    'bg-primary': !props.flat && !props.dark,
    'hover:bg-primary-dark': !props.flat && !props.dark,
    'hover:bg-secondary-dark': props.dark,
    'hover:text-primary': props.flat,
    'text-secondary': props.flat && !props.highlight,
    'text-primary': props.flat && props.highlight,
  }),
  'bg-secondary': props.disabled || props.dark,
  'cursor-default': props.disabled,
  'pl-[48px]': props.icon,
  'text-center': !props.flat,
}));
</script>

<template>
  <button 
    @click="handleClick"
    :class="cssClass"
    class="
      text-background text-base leading-4
      relative
      h-12
      rounded-[10px]
    "
  >
    <Icon class="absolute pointer-events-none text-2xl top-3 left-3" v-if="props.icon" :name="props.icon" />
    <slot></slot>
  </button>
</template>