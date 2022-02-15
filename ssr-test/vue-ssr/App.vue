<template>
  <div>
    <h1>hello {{ username }}</h1>
    <p>您的银行卡余额是 {{ account }}</p>
    <button @click="handleClick">涨薪</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
      account: 0,
    };
  },
  created() {
    const { username, account } = this.getData();
    this.username = username;
    this.account = account;
  },
  methods: {
    handleClick() {
      this.account += 1000;
    },
    getData() {
      return {
        username: "alias",
        account: 10000000000000,
      };
    },
  },
};
</script>