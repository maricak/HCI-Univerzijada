<template>
  <div id="register">
    <form class="w-50 mx-auto mt-3" v-on:submit.prevent>
      <h3>Register</h3>

      <div v-if="passwordErrorMessage.length !== 0" class="alert alert-danger">
        {{ passwordErrorMessage }}
      </div>
      <div v-if="usernameErrorMessage.length !== 0" class="alert alert-danger">
        {{ usernameErrorMessage }}
      </div>

      <CustomInput v-for="control in controls" :key="control.label" :control="control" @inputchange="control = $event; checkPasswords($event);checkUsername($event);"></CustomInput>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="student" value="student" v-model="userType" />
        <label for="student">Student</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="organizer" value="organizer" v-model="userType" />
        <label for="organizer">Organizer</label>
      </div>

      <button class="btn btn-primary float-right my-3" :disabled="!validForm" @click="register">
        Register
      </button>
    </form>
  </div>
</template>

<script>

import CustomInput from "./CustomInput";
import router from "../router/index";

export default {
  name: "Register",
  components: {
    CustomInput
  },
  data() {
    return {
      passwordErrorMessage: "",
      usernameErrorMessage: "",
      userType: "student",
      controls: {
        name: { value: "", valid: true, dirty: false, label: "Name", type: "text", min: 1, max: 35 },
        surname: { value: "", valid: true, dirty: false, label: "Surname", type: "text", min: 1, max: 45 },
        address: { value: "", valid: true, dirty: false, label: "Address", type: "text", min: 1, max: 150 },
        phone: { value: "", valid: true, dirty: false, label: "Phone", type: "text", min: 1, max: 15 },
        username: { value: "", valid: true, dirty: false, label: "Username", type: "text", min: 1, max: 40 },
        password: { value: "", valid: true, dirty: false, label: "Password", type: "password", min: 1, max: 40 },
        confPassword: { value: "", valid: true, dirty: false, label: "Confirmed password", type: "password", min: 1, max: 40 }
      }
    };
  },
  computed: {
    validForm() {
      for (const inputName in this.controls) {
        if (!this.controls[inputName].valid) return false;
        if (!this.controls[inputName].dirty) return false;
      }

      if (this.passwordErrorMessage.length > 0) return false;
      if (this.usernameErrorMessage.length > 0) return false;
      return true;
    }
  },
  methods: {
    checkUsername() {
      var username = this.controls.username.value;
      var user = this.$parent.users.find(user => user.username == username);
      if (user) {
        this.usernameErrorMessage = "Username " + username + " is alredy occupied";
      } else {
        this.usernameErrorMessage = "";
      }
    },
    checkPasswords() {
      if (!this.controls.password.dirty || !this.controls.confPassword.dirty ||
        !this.controls.password.valid || !this.controls.confPassword.valid) {
        return;
      }
      var password = this.controls.password.value;
      var confPassword = this.controls.confPassword.value;

      if (password !== confPassword) {
        this.passwordErrorMessage = "Password and Confirmed password do not match.";
      } else {
        this.passwordErrorMessage = "";
      }
    },
    register() {
      this.$emit("registerUser", { "controls": this.controls, "userType": this.userType });
      router.push({ name: 'login', params: { reg: 'success' } })
    }
  }
};
</script>

<style lang="scss">
</style>


