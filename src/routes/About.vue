<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        v-else
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <a
      :href="blog"
      target="_blank">{{ blog }}</a>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../components/Loader.vue'

export default {
  data() {
    return {
      imageLoading: true
    }
  },
  components: {
    Loader
  },
  computed: {
    ...mapState("about", [
      "name",
      "email",
      "blog",
      "phone",
      "image",
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 220px;
    height: 220px;
    margin: 40px auto 20px;
    padding: 20px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  };
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>