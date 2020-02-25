<template>
  <div id="profile">
    <form class="w-50 mx-auto mt-3" v-on:submit.prevent>
      <h3>Update your profile data</h3>

      <div v-if="passwordErrorMessage.length !== 0" class="alert alert-danger">
        {{ passwordErrorMessage }}
      </div>
      <CustomInput v-for="control in controls" :key="control.label" :control="control" @inputchange="control = $event;checkPasswords($event);"></CustomInput>
      <button class="btn btn-primary float-right my-3" :disabled="!validForm" @click="update">
        Update profile
      </button>
    </form>
  </div>
</template>

<script>

import CustomInput from "./CustomInput";
import router from "../router/index";

export default {
  name: "Profile",
  components: {
    CustomInput
  },
  data() {
    return {
      passwordErrorMessage: "",
      usernameErrorMessage: "",
      userType: "student",
      user: { name: "", surname: "", address: "", phone: "", username: "", password: "" },
      controls: {
        name: { value: "", valid: true, dirty: false, label: "Name", type: "text", min: 1, max: 35 },
        surname: { value: "", valid: true, dirty: false, label: "Surname", type: "text", min: 1, max: 45 },
        address: { value: "", valid: true, dirty: false, label: "Address", type: "text", min: 1, max: 150 },
        phone: { value: "", valid: true, dirty: false, label: "Phone", type: "text", min: 1, max: 15 },
        password: { value: "", valid: true, dirty: false, label: "New password", type: "password", min: 1, max: 40 },
        confPassword: { value: "", valid: true, dirty: false, label: "Confirmed password", type: "password", min: 1, max: 40 }
      }
    };
  },
  created() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
    this.controls.name.value = user.name;
    this.controls.surname.value = user.surname;
    this.controls.address.value = user.address;
    this.controls.phone.value = user.phone;
  },
  computed: {
    validForm() {
      for (const inputName in this.controls) {
        if (!this.controls[inputName].valid) return false;
      }

      if (this.passwordErrorMessage.length > 0) return false;
      return true;
    }
  },
  methods: {
    checkPasswords() {
      var password = this.controls.password.value;
      var confPassword = this.controls.confPassword.value;
      if (password.length > 0 || confPassword.length > 0) {
        if (password !== confPassword) {
          this.passwordErrorMessage = "Password and Confirmed password do not match.";
        } else {
          this.passwordErrorMessage = "";
        }
      } else {
        this.passwordErrorMessage = "";
      }
    },
    update() {
      this.user.name = this.controls.name.value;
      this.user.surname = this.controls.surname.value;
      this.user.address = this.controls.address.value;
      this.user.phone = this.controls.phone.value;
      if (this.controls.password.value.length > 0) {
        this.user.password = this.controls.password.value;
      }
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$emit("updateuser", this.user);
      router.push({ name: this.user.type, params: { upd: 'success' } })
    }
  }
};
</script>

<style lang="scss">
</style>


