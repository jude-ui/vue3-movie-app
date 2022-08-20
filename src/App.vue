<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  created() {
    console.log('test', process.env.NODE_ENV)
  },
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<style lang="scss">
body {
  line-height: 1.4;
  font-family: 'Roboto', sans-serif;
}
</style>