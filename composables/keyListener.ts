export const useKeyListener = (key: string, listener: () => void) => {
  const checkKeyPress = (e: KeyboardEvent) => {
    if (e.key === key) {
      listener();
    }
  };
  
  onMounted(() => window.addEventListener('keyup', checkKeyPress));
  onUnmounted(() => window.removeEventListener('keyup', checkKeyPress));
};