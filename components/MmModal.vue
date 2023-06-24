<script setup lang="ts">
const emit = defineEmits<{
  (event: 'close'): void,
}>();

const show = ref(false);
onMounted(() => nextTick(() => show.value = true));

const close = () => {
  show.value = false;
  setTimeout(() => emit('close'), 200);
};

useKeyListener('Escape', close);
</script>

<template>
  <transition name="modal">
    <div 
      class="
        fixed top-0 bottom-0 right-0 left-0 z-50 
        bg-opacity-70 bg-black 
        flex justify-center items-center
        p-0 sm:p-4
      " 
      @click="close"
      v-if="show"
    >
      <div 
        class="
          md:h-auto
          md:max-h-[80vh] md:w-2/3 md:max-w-4xl
          sm:w-full sm:h-full
          bg-background
          flex flex-col
        " 
        @click.stop
      >
        <div class="w-full relative h-16">
          <div class="absolute right-0 w-32 text-center">
            <MmButton flat @click="close" icon="ic:baseline-clear">
              Close
            </MmButton>
          </div>
        </div>
        <div class="overflow-auto p-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>