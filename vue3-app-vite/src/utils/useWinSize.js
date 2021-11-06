import { ref, onMounted, onUnmounted } from 'vue'

export default function useWinSize() {
  let [width, height] = [ref(window.innerWidth), ref(window.innerHeight)]

  function update() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { width, height }
}