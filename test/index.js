let l = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 3,
      next: {
        val: 3,
        next: {
          val: 9
        }
      }
    }
  }
}
function fn(phead) {
  let p = { next: phead }
  let p1 = p, p2 = p.next
  while (p2 && p2.next) {
    if (p2.val === p2.next.val) {
      while (p2.next && p2.next.val === p2.val) {
        p2.next = p2.next.next;
      }
      p1.next = p2.next
      p2 = p2.next
    } else {
      p1 = p1.next;
      p2 = p2.next
    }
  }
  return p.next;
}

console.log(JSON.stringify(fn(l)));