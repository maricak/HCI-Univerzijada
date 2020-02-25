<template>
  <div id="blog">
    <table class="table table-bordered mt-3">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th v-if="username" scope="col">Username</th>
          <th scope="col">Venue</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matchesForPage" :key="match.id">
          <th scope="row">{{ (page-1) * matchesPerPage + index + 1 }}</th>
          <td v-if="username">{{ match.username }}</td>
          <td>{{ match.venue }}</td>
          <td>{{ match.date }}</td>
          <td>{{ match.time }}</td>
        </tr>
      </tbody>
    </table>

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
  name: "Blog",
  data() {
    return {
      page: 1,
      matchesPerPage: 30,
    }
  },
  props: ["matches", "username"],
  computed: {
    matchesForPage() {
      if (!this.page || this.page < 1 || this.page > this.lastPage) {
        return [];
      }
      let start = (this.page - 1) * this.matchesPerPage;
      let end = start + this.matchesPerPage;
      return this.matches.slice(start, end)
    },
    lastPage() {
      let length = this.matches.length;
      if (length === 0) {
        return 1;
      } else {
        length = Math.ceil(length / this.matchesPerPage);
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
};
 </script>


<style lang="scss">
.pagination input {
  width: 60px;
}
</style>

