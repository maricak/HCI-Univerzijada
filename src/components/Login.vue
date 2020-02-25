<template>
  <div id="login">
    <form class="w-50 mx-auto mt-3" v-on:submit.prevent>
      <h3>Login</h3>
      <div v-if="registered" class="alert alert-success alert-dismissible fade show" role="alert">
        You have sucessfully registered. Please login with your credentials.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-if="errorMessage.length !== 0" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <CustomInput v-for="control in controls" :key="control.label" :control="control" @inputchange="control = $event"></CustomInput>
      <button class="btn btn-primary float-right my-3" :disabled="!validForm" @click="login">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import CustomInput from "./CustomInput";

export default {
  name: "Login",
  components: {
    CustomInput
  },
  data() {
    return {
      registered: false,
      errorMessage: "",
      controls: {
        username: { value: "", valid: true, dirty: false, label: "Username", type: "text", min: 1, max: 40 },
        password: { value: "", valid: true, dirty: false, label: "Password", type: "password", min: 1, max: 40 }
      }
    };
  },
  created() {
    this.registered = this.$route.params.reg ? true : false;
  },
  computed: {
    validForm() {
      for (const inputName in this.controls) {
        if (!this.controls[inputName].valid) return false;
        if (!this.controls[inputName].dirty) return false;
      }
      return true;
    }
  },
  methods: {
    login() {
      var user = this.$parent.users.find(
        user =>
          user.username == this.controls.username.value &&
          user.password == this.controls.password.value
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.errorMessage = "";
        router.push("/" + user.type);
      } else {
        this.errorMessage = "Credentials are not correct!";
      }
    }
  }
};
</script>

<style lang="scss">
</style>


