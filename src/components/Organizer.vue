<template>
  <div id="admin" class="pt-3">
    <h3>Hello {{ user.name }}</h3>

    <MatchTable :matches="allMatches" username="true"></MatchTable>

  </div>
</template>

<script>
import MatchTable from "./MatchTable";

export default {
  name: 'Organizer',
  components: {
    MatchTable
  },
  data() {
    return {
      user: { name: "", surname: "", address: "", phone: "", username: "", password: "" },
    }
  },
  computed: {
    allMatches() {
      return this.$parent.matches;
    },
  },
  created() {
    this.updated = this.$route.params.upd ? true : false;
    var user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
}
</script>
