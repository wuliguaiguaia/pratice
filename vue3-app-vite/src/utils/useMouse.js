import { ref, onMounted, onUnmounted } from "vue"

export default function useMouse() {
  let [x, y] = [ref(0), ref(0)]
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', update)
  })
  return { x, y }
}