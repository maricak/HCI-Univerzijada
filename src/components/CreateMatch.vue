<template>
  <div id="create" class="pt-3">
    <form v-on:submit.prevent class="w-50 mx-auto mt-3">
      <h3>Create new match</h3>
      <div v-if="errorMessage.length !== 0" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage.length !== 0" class="alert alert-success">
        {{ successMessage }}
      </div>
      <label for="venue">Student</label>
      <select v-model="student.value" class="selectpicker form-control" :class="{ 'is-invalid' : !student.valid }" data-live-search="true" title="Select student" @change="selectchange">
        <option v-for="student in allStudents" :key="student.id" :data-subtext="student.username" :value="student.username">{{student.name}} {{student.surname}}</option>
      </select>
      <div class="invalid-feedback">
        Please select a student.
      </div>

      <div v-for="control in controls" :key="control.label">
        <CustomInput :control="control" @inputchange="control = $event"></CustomInput>
      </div>

      <button class="btn btn-primary float-right my-3" :disabled="!validForm" @click="addMatch">
        Create match
      </button>
    </form>
  </div>
</template>

 <script>
import CustomInput from "./CustomInput";

export default {
  name: "CreateMatch",
  components: {
    CustomInput
  },
  data() {
    return {
      student: { value: "", valid: true, dirty: false },
      controls: {
        venue: { value: "", valid: true, dirty: false, label: "Venue", type: "text", min: 1, max: 40 },
        date: { value: "", valid: true, dirty: false, label: "Date", type: "date" },
        time: { value: "", valid: true, dirty: false, label: "Time", type: "time" }
      },
      errorMessage: "",
      successMessage: ""
    }
  },
  computed: {
    allStudents() {
      return this.$parent.users.filter(user => user.type === "student");
    },
    validForm() {
      for (const inputName in this.controls) {
        if (!this.controls[inputName].valid) return false;
        if (!this.controls[inputName].dirty) return false;
      }
      if (!this.student.valid) return false;
      if (!this.student.dirty) return false;

      return true;
    }
  },
  methods: {
    addMatch() {
      this.successMessage = ""
      var match = this.$parent.matches.find(match =>
        match.username == this.student.value &&
        match.date == this.controls.date.value &&
        match.time == this.controls.time.value
      );
      if (match) {
        this.errorMessage = "Student " + this.student.value + " already has a match at the proposed time.";
        this.successMessage = "";
      } else {
        this.errorMessage = "";
        this.successMessage = "You have successfully created new match for the student " + this.student.value + ".";
        this.$emit("addMatch", { "controls": this.controls, "student": this.student });
      }
    },
    selectchange() {
      this.student.valid = this.student.value && this.student.value.length > 0;
      this.student.dirty = true;
    },
  }

};
 </script>
