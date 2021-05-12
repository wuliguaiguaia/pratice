function fn(head) {
  if (!head || !head.next) return head;
  let temp = head.next;
  head.next = fn(temp.next);
  temp.next = head;
  return temp;
}

console.log(fn({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}));