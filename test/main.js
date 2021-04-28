function Merge(pHead1, pHead2) {
  let result = {val: null, next: null};
  let cur = result;

  while (pHead1 && pHead2) {
    if (pHead1.val < pHead2.val) {
      cur.next = pHead1;
      pHead1 = pHead1.next;
    } else {
      cur.next = pHead2;
      pHead2 = pHead2.next;
    }
    cur = cur.next;
  }

  cur.next = pHead1 ? pHead1 : pHead2;
  return result.next;
}
