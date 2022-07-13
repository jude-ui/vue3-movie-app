<template>
  <div class="container">
    <input
      type="text"
      v-model.trim="title"
      class="form-control"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    
    <div class="selects">
      <select
        class="form-select"
        v-for="{ name, items} in filters"
        v-model="$data[name]"
        :key="name"
        :title="name">
        <option
          value=""
          v-if="name === 'year'">
          All Year
        </option>
        <option
          v-for="item in items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <!-- // select -->
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      title: '',
      
      type: 'movie',
      number: 10,
      year: '',

      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i--) {
              years.push(i)
            }
            return years;
          })()
        },
      ]
    }
  },
  methods: {
    ...mapActions('movie', [
      'searchMovies'
    ]),
    async apply() {
      if (!this.title) return
      this.searchMovies({
        title: this.title,
        year: this.year,
        number: this.number,
        type: this.type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }

  @include media-breakpoint-down(lg) {
    display: block;
    overflow:hidden;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>