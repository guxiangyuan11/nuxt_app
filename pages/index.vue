<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">nuxt-wap</h1>
      <h2 class="subtitle">My badass Nuxt.js project</h2>
      <Button type="primary">click me</Button>
    </div>
    <br />
  </div>
</template>
<script>
import { Button } from 'vant'
import Logo from '~/components/Logo.vue'

export default {
  components: { Logo, Button },
  mounted() {
    console.log(this.$store.state.user.name)
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 84px;
  color: red;
  word-spacing: 5px;
  padding-bottom: 15px;
  transform: scale(0.5);
}

.links {
  padding-top: 15px;
}

.test {
  font-size: 32px;
  margin-bottom: 32px;
}
</style>
