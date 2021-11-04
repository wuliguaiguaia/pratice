import { computed, ref } from 'vue';

export default function useTodos() {
  let text = ref('')
  let list = ref([{name: '22', done: false}])
  function addTodo() {
      list.value.push({name: text.value, done: false})
      text.value = ''
  }

  let active = computed(() => list.value.filter(item => !item.done).length)
  let all = computed(() => list.value.length)

  let allDone = computed({
      get() {
          return active.value === 0
      },
      set(val) {
          list.value.forEach(todo => todo.done = val)
      }
  })
  return {text, list, active, all, allDone, addTodo}
}