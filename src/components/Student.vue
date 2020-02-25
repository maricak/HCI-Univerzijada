<template>
  <div id="user" class="pt-3">
    <div v-if="updated" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      You have sucessfully updated your profile.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <h3>Hello {{ user.name }}</h3>
    <form v-on:submit.prevent>
      <div class="form-row align-items-center">
        <div class="col-sm-4">
          <label for="venue">Venue</label>
          <input v-model.trim="venue" type="text" id="venue" class="form-control">
        </div>
        <div class="col-sm-4">
          <label for="date">Date</label>
          <input v-model="date" type="date" id="date" class="form-control">
        </div>
        <div class="col-sm-4">
          <label for="time">Time</label>
          <input v-model="time" type="time" id="time" class="form-control">
        </div>
      </div>
    </form>

    <MatchTable :matches="filteredMatches" username="false"></MatchTable>

  </div>
</template>

<script>
import MatchTable from "./MatchTable";

export default {
  name: 'Student',
  components: {
    MatchTable
  },
  data() {
    return {
      user: { name: "", surname: "", address: "", phone: "", username: "", password: "" },
      venue: "",
      date: "",
      time: "",
    }
  },
  computed: {
    filteredMatches() {
      var matches = this.$parent.matches.filter(
        match =>
          match.username == this.user.username);
      if (this.venue && this.venue.length > 0) {
        matches = matches.filter(match => match.venue.includes(this.venue));
      }
      if (this.date && this.date.length > 0) {
        matches = matches.filter(match => match.date === this.date);
      }
      if (this.time && this.time.length > 0) {
        matches = matches.filter(match => match.time === this.time);
      }
      return matches;
    },
  },
  created() {
    this.updated = this.$route.params.upd ? true : false;
    var user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
}
</script>



