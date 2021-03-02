<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ num1 }}</h1>
    <button @click="num1++">++</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["msg", "num"],
  computed: {
    num1() {
      return this.num;
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>
