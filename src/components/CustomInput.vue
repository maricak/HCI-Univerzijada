<template>
  <div id="custominput">
    <div :for="control.label" class="mt-2">{{ control.label }}</div>
    <input :control="control" v-model="control.value" @input="inputchange" @focusout="inputchange" :type="control.type" class="form-control" :class="{ 'is-invalid': !control.valid }" :name="control.label" :placeholder="'Enter your ' + control.label" />
    <div class="invalid-feedback">
      Please provide your {{ control.label }}.
      <span v-if="control.max && control.min">
        Input lenght must be between {{ control.min }} and {{ control.max }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: ["control"],
  methods: {
    inputchange() {
      var value = this.control.value;
      this.control.valid = value && true;
      if (this.control.min && this.control.max) {
        this.control.valid = this.control.valid && value.length >= this.control.min && value.length <= this.control.max;
      }
      this.control.dirty = true;
      this.$emit("inputchange", this.control);
    }
  }
};
</script>