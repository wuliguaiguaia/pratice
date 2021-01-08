class xd {
  private c: string
  constructor(c) {
    this.c = c;
  }
}
class fd extends xd {
  name: string;
  constructor(name, c) {
    super(c);
    this.name = name;
  }

  say() {
    console.log(this.c);
    
  }
}
