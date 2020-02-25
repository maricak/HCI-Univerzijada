<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <router-link class="navbar-brand" :to="'/' + userType">Univerzijada</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="currentPath == '/login' || currentPath == '/'">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="currentPath == '/register'">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="isStudent">
          <router-link to="/belgrade" class="nav-link">Belgrade</router-link>
        </li>
        <li class="nav-item" v-if="isOrganizer && currentPath != '/createMatch'">
          <router-link to="/createMatch" class="nav-link">Create match</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/profile" class="nav-link">My profile</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated" @click="logout">
          <router-link to="/login" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  computed: {
    currentPath() {
      return this.$route.path;
    },
    isStudent() {
      if (this.currentPath == "/login" || this.currentPath == "/register") {
        return false;
      }
      if (this.currentPath == "/student" || this.currentPath == "/belgrade" || this.currentPath == "/blog") {
        return true;
      }
      var user = localStorage.getItem("user");
      if (user && user.length != 0) {
        user = JSON.parse(user);
        return user.type === "student";
      }
      return false;
    },
    isOrganizer() {
      if (this.currentPath == "/login" || this.currentPath == "/register") {
        return false;
      }
      if (this.currentPath == "/organizer" || this.currentPath == "/createMatch") {
        return true;
      }
      var user = localStorage.getItem("user");
      if (user && user.length != 0) {
        user = JSON.parse(user);
        return user.type === "organizer";
      }
      return false;
    },
    isAuthenticated() {
      return this.isStudent || this.isOrganizer;
    },
    userType() {
      if (this.isStudent) {
        return "student";
      } else if (this.isOrganizer) {
        return "organizer";
      } else {
        return "login";
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
    }
  }
};
</script>

<style lang="scss">
</style>


