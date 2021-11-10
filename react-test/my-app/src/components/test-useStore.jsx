import { useStore } from "react-redux";

export default function TestUseStore() {
  const store = useStore()
  const { count } = store.getState().count
  console.log('usestore', count);
  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>
    useStore count: {count}
  </div>
}