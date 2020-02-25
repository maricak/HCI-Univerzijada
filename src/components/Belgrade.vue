<template>
  <div id="user" class="py-3">
    <h3 class="my-3">Belgrade's tourist attractions</h3>
    <div class="card-columns">
      <div class="card" v-for="blog in blogForPage" :key="blog.id">
        <img class="card-img-top" :src="require('../assets/' + blog.image + '.jpg')" :alt="blog.title" />
        <div class="card-body">
          <h5 class="card-title">{{blog.title}}</h5>
          <p class="card-text">{{blog.short}}</p>
          <router-link :to='/blog/+blog.id' class="btn btn-primary ml-auto">
            Details
          </router-link>
        </div>
      </div>
    </div>

    <div class="my-4">
      <ul class="pagination pagination-md justify-content-center text-center">
        <li class="page-item" :class="page === 1 ? 'disabled' : ''">
          <a class="page-link" @click="prevPage" href="#">
            Previous
          </a>
        </li>
        <li class="page-item disabled">
          <input v-model="page" type="number" class="form-control" min="1" :max="lastPage">
        </li>
        <li class="page-item disabled">
          <a class="page-link ">
            of {{ lastPage }}
          </a>
        </li>
        <li class="page-item" :class="page == lastPage ? 'disabled' : ''">
          <a class="page-link" @click="nextPage" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Belgrade',
  data() {
    return {
      page: 1,
      blogsPerPage: 30,
    }
  },
  computed: {
    blogs() {
      return this.$parent.blogs;
    },
    blogForPage() {
      if (!this.page || this.page < 1 || this.page > this.lastPage) {
        return [];
      }
      let start = (this.page - 1) * this.blogsPerPage;
      let end = start + this.blogsPerPage;
      return this.blogs.slice(start, end);
    },
    lastPage() {
      let length = this.blogs.length;
      if (length === 0) {
        return 1;
      } else {
        length = Math.ceil(length / this.blogsPerPage);
        return length;
      }
    }
  },
  methods: {
    prevPage() {
      this.page--;
    },
    nextPage() {
      this.page++;
    },
  }
}
</script>

<style lang="scss">
.pagination input {
  width: 60px;
}
</style>


